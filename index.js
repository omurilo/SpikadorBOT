const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

const tmi = require("tmi.js");
const { username, channel } = require("tmi.js/lib/utils");
const ConfigClient = require("./ConfigClient.js");
const Bot = require("./Bot.js");
const AudioPlayer = require("./AudioPlayer.js");

const bots = ["streamelements", "nightbot"]

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

client.connect();

client.on("connected", enterOnTwitchChat);
client.on("message", messageToBot);
client.on("redeem", redeemAudio);

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

function redeemAudio(channel, user, rewardtype, tags, message) {
	console.info({ rewardtype, message });
	const commands = {
		"71c3a0a9-d3cf-40b8-867d-b85ac0faef58": {
			instance: fala,
			method: "run",
			args: [channel, user, message, io, null, 2],
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

	if (checkUsersBlacklist(user)) {
		return client.say(channel, `/me @${user.username} tu foi taxado e não pode usar esse comando! (Cê tá na blacklist gangsta)`);
	}

	const execute = commands[rewardtype];

	if (execute) {
		execute.instance[execute.method](...execute.args);
	}
}

function messageToBot(channel, user, received, self) {
	const [_, command, message] = received.match(new RegExp(/^!([a-zA-Z0-9]+)(?:\W+)?(.*)?/)) ?? [];
	const reply = replyTaxedBot(user, received);

	if (self || (!command && !reply)) return;
	if (command && checkUsersBlacklist(user)) {
		return client.say(channel, `/me @${user.username} tu foi taxado e não pode usar esse comando! (Cê tá na blacklist gangsta)`);
	}

	const commands = {
		"falador": {
			instance: client,
			method: "say",
			args: [
				channel,
				`@${user.username ?? user} Falador é um bot de reprodução de mensagens na live, para utilizá-lo basta resgatar a mensagem com os pontos do canal e escrever o que deseja falar. Se quiser que ela seja falada em outra língua comece sua mensagem com [língua], ex: "[en]Hi, my name is bot falador!". Para saber as línguas acesse: https://cloud.google.com/translate/docs/languages`,
			],
		},
		"fala": {
			instance: client,
			method: "say",
			args: [
				channel,
				`/me ${user.username ?? user} Falador é um bot de reprodução de mensagens na live, para utilizá-lo basta resgatar a mensagem com os pontos do canal e escrever o que deseja falar. Se quiser que ela seja falada em outra língua comece sua mensagem com [língua], ex: "[en]Hi, my name is bot falador!". Para saber as línguas acesse: https://cloud.google.com/translate/docs/languages`,
			],
		},
		"noia": {
			instance: audio,
			method: "play",
			args: ["noia", channel, user, message, io, ["mod", "streamer", "vip"], 5],
		},
		default: {
			instance: client,
			method: "say",
			args: [channel, reply],
		},
	};

	let execute = commands[command];

	if (reply && !execute) {
		execute = commands.default;
	}

	if (!execute) return;
	execute.instance[execute.method](...execute.args);
}

function checkUsersBlacklist(user) {
	if (typeof user === "string") {
		user = { username: user };
	}

	const userQuery = new RegExp(user.username, 'gmi')

	return config.usersBlacklist.some(username => userQuery.test(username));
}

function replyTaxedBot(user, message) {
	if (typeof user === "string") {
		user = { username: user };
	}

	if (new RegExp(/na cara do\(a\) botfalador/gmi).test(message)) {
		if (bots.includes(user.username)) {
			user.username = message.split(/\s/gm)[0];
		}

		return `Tá de tiração comigo é? ${user.username}, esse bot aqui não é educado igual o @streamelements não viu? Toma de volta na sua cara ${user.username}`;
	} else if (new RegExp(/A Granada de Rola foi lançada.*botfalador/gmi).test(message)) {
		if (bots.includes(user.username)) {
			user.username = message.split(/\s/gm)[0];
		}

		return `Tá de tiração comigo é ${user.username}?, Vai mandar granada na casa do seu amigo, aqui não! (DESVIAR)`;
	}

	return false;
}
