import googleTTS from "google-tts-api";
import { ProfanityOptions, Profanity } from "@2toad/profanity";
import fetch from "node-fetch";
import { createRequire } from "module";

import CommandsModel from "./CommandsModel.js";

const require = createRequire(import.meta.url);
const badwords = require("./badwords.json");

class Bot extends CommandsModel {
	constructor(client) {
		super(client);

		const options = new ProfanityOptions();
		options.grawlix = "*****";

		this.profanity = new Profanity(options);

		this.profanity.addWords(badwords);
	}

	pollyStreamlabs(voice = "Ricardo", text) {
		return fetch("https://streamlabs.com/polly/speak", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				voice,
				text,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					return data.speak_url;
				}

				return false;
			})
			.catch((error) => {
				console.error({ error });
				return false;
			});
	}

	run(channel, user, message, io, roles = undefined, cooldown = undefined, voice = "google") {
		let language;
		let finalMessage;
		const haveLanguage = String(message).match(/^\[[\w\-]+\]/);

		if (roles && !this.canExecute(user, roles)) {
			return this.client.say(
				channel,
				`/me @${
					user.username ?? user
				} Você não pode resgatar esse audio, peça o reembolso dos seus pontos pra algum dos mod inútil que tem ai. (lista de mods: /mods)`
			);
		}

		if (!haveLanguage) {
			language = "pt";
			finalMessage = message;
		} else {
			const languageOption = haveLanguage[0];
			language = languageOption.replace(/[\[\]]/g, "");
			finalMessage = haveLanguage.input.slice(languageOption.length).trim();
		}

		if (this.profanity.exists(finalMessage)) {
			finalMessage = this.profanity.censor(finalMessage);
		}

		if (cooldown && !this.checkCooldown("fala", cooldown)) {
			return this.client.say(
				channel,
				`/me @${user.username ?? user} tu foi taxado pelo cooldown, não foi dessa vez!`
			);
		}

		if (voice !== "google" && !haveLanguage) {
			return this.pollyStreamlabs(voice, finalMessage).then((url) => {
				if (!url) {
					this.client.say(channel, `Não foi possível reproduzir sua mensagem! Desculpa nóis!`);
				}

				io.to(channel.substr(1)).emit("falador", url);
				this.client.say(channel, `@${user.username ?? user} disse: ${finalMessage}`);
			});
		}

		return googleTTS
			.getAudioBase64(`${user} Disse: ${finalMessage}`, {
				lang: language,
			})
			.then((res) => {
				io.to(channel.substr(1)).emit("falador", `data:audio/ogg;base64,${res}`);
				this.client.say(channel, `@${user.username ?? user} disse: ${finalMessage}`);
			})
			.catch((error) => {
				if ((error.message || error.data?.message).includes(`lang "${language}" might not exist`)) {
					this.client.say(channel, `A língua ${language} não existe ou não está disponível`);
				}
			});
	}
}

export default Bot;
