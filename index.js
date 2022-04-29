import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from "http";
import { Server } from "socket.io";
import tmi from "tmi.js";
// import { username, channel } from "tmi.js/lib/utils.js";
import ConfigClient from "./ConfigClient.js";
import Bot from "./Bot.js";
import AudioPlayer from "./AudioPlayer.js";
import CommandsModel from "./CommandsModel.js";
import blackListUtils from "./blacklist/usersBlacklist.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const bots = ["streamelements", "nightbot"];

const config = new ConfigClient();

const options = {
	options: {
		debug: true,
	},
	connection: {
		cluster: "aws",
		reconnect: true,
	},
	identity: {
		username: config.canalBot,
		password: config.token,
	},
	channels: config._canalBotFica,
};

const client = new tmi.client(options);

const fala = new Bot(client);

const audio = new AudioPlayer(client);

const commandsUtils = new CommandsModel(client);

client.connect();

client.on("redeem", redeemAudio);
client.on("message", messageToBot);
client.on("ban", addUserToBlacklist);
client.on("timeout", taxUserOnTimeout);
client.on("connected", enterOnTwitchChat);

app.use(express.static("public"));
server.listen(process.env.PORT);
io.on("connection", (socket) => {
	socket.on("joinRoom", (channel) => {
		socket.join(channel);
	});
});

function enterOnTwitchChat(endereco, porta) {
	console.log(`* Bot entrou no endereço ${endereco}:${porta}`);
}

async function redeemAudio(channel, user, rewardtype, tags, message) {
	console.info({ rewardtype, message });
	const commands = {
		"71c3a0a9-d3cf-40b8-867d-b85ac0faef58": {
			instance: fala,
			method: "run",
			args: [channel, user, message, io, null, 2, 'Ricardo'],
		},
		"886a1252-e968-4340-94de-bb8605ac72ba": {
			instance: audio,
			method: "play",
			args: ["costaaaa", channel, user, message, io, null, 10],
		},
		"1f2e5cb3-f338-412e-9898-f5df5007bb8b": {
			instance: audio,
			method: "play",
			args: ["banido", channel, user, message, io, null, 2],
		},
		"a4b8683f-27e4-407b-b8eb-f9ff1667157f": {
			instance: audio,
			method: "play",
			args: ["peido", channel, user, message, io, null, 2],
		},
		"5c63d121-e389-4713-a2a0-17f5b2840321": {
			instance: audio,
			method: "play",
			args: ["renk-2", channel, user, message, io, null, 5],
		},
		"b2c068ff-ab17-45b0-8d54-993f3ca8b439": {
			instance: audio,
			method: "play",
			args: ["matir-2", channel, user, message, io, null, 2],
		},
		"8227be41-424a-4e53-996a-ae5d8afdc74c": {
			instance: audio,
			method: "play",
			args: ["fofoca", channel, user, message, io, null, 2],
		},
		"504aefba-2081-45a7-a725-55f301e96426": {
			instance: audio,
			method: "play",
			args: ["cheguei", channel, user, message, io, null, 2],
		},
		"db2ecf40-932d-4dfe-b992-e75af338776b": {
			instance: audio,
			method: "play",
			args: ["brabo", channel, user, message, io, null, 2],
		},
		"2bb5c38c-e0dd-45c0-892c-25271e4e8056": {
			instance: audio,
			method: "play",
			args: ["chiesa", channel, user, message, io, null, 2],
		},
		"bef808ef-f99c-4901-8ee7-956e167b9c63": {
			instance: audio,
			method: "play",
			args: ["noia", channel, user, message, io, null, 2],
		},
		"17943516-fd03-4cc3-b884-fa31e9fad976": {
			instance: audio,
			method: "play",
			args: ["palmas", channel, user, message, io, null, 2],
		},
		"3ee6d90d-c162-42c3-96a6-04a350f9aea6": {
			instance: audio,
			method: "play",
			args: ["putaria", channel, user, message, io, ["mod", "streamer", "vip"], 5],
		},
		"4fb99ba7-6dc0-4060-a3be-ebdc223351c6": {
			instance: audio,
			method: "play",
			args: ["satanas", channel, user, message, io, null, 2],
		},
		"41aa7aec-3831-497b-a26e-6cdf179b9eff": {
			instance: audio,
			method: "play",
			args: ["tomar-uma", channel, user, message, io, null, 2],
		},
		"17355271-76ac-4146-86ef-a6f03cb36a42": {
			instance: audio,
			method: "play",
			args: ["vai-a-merda", channel, user, message, io, null, 2],
		},
		"901553c5-356c-4a4e-95ad-8ee252f595c8": {
			instance: audio,
			method: "play",
			args: ["viaje-e-essa", channel, user, message, io, null, 2],
		},
		"359cd70c-8799-4d4c-afd7-94471bfc5b56": {
			instance: audio,
			method: "play",
			args: ["careca", channel, user, message, io, null, 2],
		},
	};

	if (await checkUsersBlacklist(user)) {
		return client.say(
			channel,
			`/me @${
				user.username ?? user
			} tu foi taxado e não pode usar esse comando! (Cê tá na blacklist gangsta)`
		);
	}

	const execute = commands[rewardtype];

	if (execute) {
		execute.instance[execute.method](...execute.args);
	}
}

async function messageToBot(channel, user, received, self) {
	const [_, command, message] = received.match(new RegExp(/^!([a-zA-Z0-9]+)(?:\W+)?(.*)?/)) ?? [];
	const reply = replyTaxedBot(user, received);

	if (self || (!command && !reply)) return;

	const commands = {
		falador: {
			instance: client,
			method: "say",
			args: [
				channel,
				`@${
					user.username ?? user
				} Falador é um bot de reprodução de mensagens na live, para utilizá-lo basta resgatar a mensagem com os pontos do canal e escrever o que deseja falar. Se quiser que ela seja falada em outra língua comece sua mensagem com [língua], ex: "[en]Hi, my name is bot falador!". Para saber as línguas acesse: https://cloud.google.com/translate/docs/languages`,
			],
		},
		noia: {
			instance: audio,
			method: "play",
			args: ["noia", channel, user, message, io, ["mod", "streamer", "vip"], 5],
		},
		taxar: {
			middleware: async () => addUserToBlacklistFile(message?.split(/\s/)[0].split(/@/), user),
			instance: client,
			method: "say",
			args: [
				channel,
				`Ei ${
					message?.split(/\s/)[0]
				} tu foi taxado irmão! Agora está na blacklist e não pode interagir comigo, valeu hein gangsta! Duas palavras pra você: Para Béns!`,
			],
		},
		destaxar: {
			middleware: async () => removeUserFromBlacklistFile(message?.split(/\s/)[0].split(/@/), user),
			instance: client,
			method: "say",
			args: [
				channel,
				`Ei ${
					message?.split(/\s/)[0]
				} tu foi destaxado! Agora você não está mais na blacklist e pode interagir comigo, valeu hein gangsta! Duas palavras pra você: Para Béns!`,
			],
		},
		tataxado: {
			instance: {
				verify: async (username, user) => {
					const { userExist } = await checkIfUserIsInBlacklist(username, user);

					return client.say(
						channel,
						`É @${user.username ?? user} o usuário ${username} ${
							userExist ? "está" : "não está"
						} na blacklist.`
					);
				},
			},
			method: "verify",
			args: [message?.split(/\s/)[0].split(/@/), user],
		},
		ostaxados: {
			instance: {
				verify: async () => {
					const { users } = await readUsersBlacklistFile(user);
					const qtyMessages = Math.max(Math.ceil(users.length / 10), 1);
					for (let step = 0; step < qtyMessages * 10; step += 10) {
						client.say(channel, `Os usuários na blacklist são: ${users.slice(step, step + 10)}`);
					}
				},
			},
			method: "verify",
			args: [],
		},
		comandosfalador: {
			instance: client,
			method: "say",
			args: [
				channel,
				`Oi ${
					user.username ?? user
				}, eu sou o falador! os comandos disponíveis (nem todos você pode usar tá?) são: fala, falador, noia, taxar, destaxar, tataxado, ostaxados`,
			],
		},
		default: {
			instance: client,
			method: "say",
			args: [channel, reply],
		},
	};

	if (command && (await checkUsersBlacklist(user))) {
		if (!commands[command]) return;
		return client.say(
			channel,
			`/me @${
				user.username ?? user
			} tu foi taxado e não pode usar esse comando! (Cê tá na blacklist gangsta)`
		);
	}

	let execute = commands[command];

	if (reply && !execute) {
		execute = commands.default;
	}

	if (!execute) return;
	if (execute.middleware) {
		const { next } = await execute.middleware();
		if (!next) {
			return client.say(
				channel,
				`@${user.username ?? user} você não pode executar esse comando meu querido!`
			);
		}
	}

	execute.instance[execute.method](...execute.args);
}

async function addUserToBlacklist(channel, user, reason) {
	await blackListUtils.addUserToBlacklistFile(user.username ?? user);
	return client.say(
		channel,
		`Ihhhhh @${
			user.username ?? user
		} tu foi banido hein, você entrou na minha blacklist, quando tu for desbanido ainda estará aqui tá, tem que pedir pra tirarem :D`
	);
}

function taxUserOnTimeout(channel, username, reason, duration) {
	const durationExact = duration > 60 ? Math.ceil(duration / 60) : duration;
	const stringDuration =
		duration > 60
			? durationExact > 1
				? `${durationExact} minutos`
				: `${durationExact} minuto`
			: `${durationExact} segundos`;

	return client.say(
		channel,
		`@${username} Ihhh rapaz, tu foi taxado hein! Daqui uns ${stringDuration} a gente se fala! Valeu, Falou!`
	);
}

async function addUserToBlacklistFile(username, user) {
	if (!commandsUtils.canExecute(user, ["streamer", "mod"])) {
		return { next: false };
	}

	await blackListUtils.addUserToBlacklistFile(username);
	return { next: true };
}

async function removeUserFromBlacklistFile(username, user) {
	if (!commandsUtils.canExecute(user, ["streamer", "mod"])) {
		return { next: false };
	}

	await blackListUtils.removeUserFromBlacklistFile(username);
	return { next: true };
}

async function checkIfUserIsInBlacklist(username, user) {
	if (!commandsUtils.canExecute(user, ["streamer", "mod"])) {
		return { next: false };
	}

	const { user: userExist } = await blackListUtils.checkIfUserIsInBlacklist(username);
	return { next: true, userExist };
}

async function readUsersBlacklistFile(user) {
	if (!commandsUtils.canExecute(user, ["streamer", "mod"])) {
		return { next: false };
	}

	const users = await blackListUtils.readUsersBlacklistFile();
	return { next: true, users };
}

async function checkUsersBlacklist(user) {
	if (typeof user === "string") {
		user = { username: user };
	}

	const { user: userExist } = await blackListUtils.checkIfUserIsInBlacklist(user.username);

	return userExist;
}

function replyTaxedBot(user, message) {
	if (typeof user === "string") {
		user = { username: user };
	}

	if (new RegExp(/na cara do\(a\) botfalador/gim).test(message)) {
		if (bots.includes(user.username)) {
			user.username = message?.split(/\s/gm)[0];
		}

		return `Tá de tiração comigo é? ${user.username}, esse bot aqui não é educado igual o @streamelements não viu? Toma de volta na sua cara ${user.username}`;
	} else if (new RegExp(/A Granada de Rola foi lançada.*botfalador/gim).test(message)) {
		if (bots.includes(user.username)) {
			user.username = message?.split(/\s/gm)[0];
		}

		return `Tá de tiração comigo é ${user.username}?, Vai mandar granada na casa do seu amigo, aqui não! (DESVIAR)`;
	}

	return false;
}
