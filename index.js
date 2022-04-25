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
			args: [channel, user, message, io],
		},
		"886a1252-e968-4340-94de-bb8605ac72ba": {
			instance: audio,
			method: "play",
			args: ["costaaaa", channel, user, message, io],
		},
		"1f2e5cb3-f338-412e-9898-f5df5007bb8b": {
			instance: audio,
			method: "play",
			args: ["banido", channel, user, message, io],
		},
		"a4b8683f-27e4-407b-b8eb-f9ff1667157f": {
			instance: audio,
			method: "play",
			args: ["peido", channel, user, message, io],
		},
		"5c63d121-e389-4713-a2a0-17f5b2840321": {
			instance: audio,
			method: "play",
			args: ["renk-2", channel, user, message, io],
		},
		"b2c068ff-ab17-45b0-8d54-993f3ca8b439": {
			instance: audio,
			method: "play",
			args: ["matir-2", channel, user, message, io],
		},
		"8227be41-424a-4e53-996a-ae5d8afdc74c": {
			instance: audio,
			method: "play",
			args: ["fofoca", channel, user, message, io],
		},
		"504aefba-2081-45a7-a725-55f301e96426": {
			instance: audio,
			method: "play",
			args: ["cheguei", channel, user, message, io],
		},
		"": {
			instance: audio,
			method: "play",
			args: ["brabo", channel, user, message, io],
		},
		"": {
			instance: audio,
			method: "play",
			args: ["chiesa", channel, user, message, io],
		},
		"": {
			instance: audio,
			method: "play",
			args: ["noia", channel, user, message, io],
		},
		"": {
			instance: audio,
			method: "play",
			args: ["palmas", channel, user, message, io],
		},
		"": {
			instance: audio,
			method: "play",
			args: ["putaria", channel, user, message, io],
		},
		"": {
			instance: audio,
			method: "play",
			args: ["satanas", channel, user, message, io],
		},
		"": {
			instance: audio,
			method: "play",
			args: ["tomar-uma", channel, user, message, io],
		},
		"": {
			instance: audio,
			method: "play",
			args: ["vai-a-merda", channel, user, message, io],
		},
		"": {
			instance: audio,
			method: "play",
			args: ["viaje-e-essa", channel, user, message, io],
		},
	};

	const execute = commands[rewardtype];

	if (execute) {
		execute.instance[execute.method](...execute.args);
	}
}

function messageToBot(channel, user, received, self) {
	const [command, message] = received.trim().split(/\s/gm);
	const reply = replyTaxedBot(user, command);

	if (self || (!command.startsWith("!") && !reply)) return;
	if (command.startsWith("!") && checkUsersBlacklist(user)) {
		return client.say(channel, `/me @${user.username} tu foi taxado e não pode usar esse comando!`);
	}

	const commands = {
		"!falador": {
			instance: client,
			method: "say",
			args: [
				channel,
				`@${user.username} Falador é um bot de reprodução de mensagens na live, para utilizá-lo basta resgatar a mensagem com os pontos do canal e escrever o que deseja falar. Se quiser que ela seja falada em outra língua comece sua mensagem com [língua], ex: "[en]Hi, my name is bot falador!". Para saber as línguas acesse: https://cloud.google.com/translate/docs/languages`,
			],
		},
		"!noia": {
			instance: audio,
			method: "play",
			args: ["noia", channel, user, message, io, ["mod", "streamer", "sub", "vip"]],
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

	return config.usersBlacklist.includes(user.username);
}

function replyTaxedBot(user, command) {
	if (command.includes("na cara do(a) botfalador")) {
		if (["streamelements", "nightbot"].includes(user.username)) {
			user.username = command.split(/\s/gm)[0];
		}

		return `Tá de tiração comigo é? ${user.username}, esse bot aqui não é educado igual o @streamelements não viu? Toma de volta na sua cara ${user.username}`;
	} else if (new RegExp(/A Granada de Rola foi lançada.*botfalador/gm).test(command)) {
		if (["streamelements", "nightbot"].includes(user.username)) {
			user.username = command.split(/\s/gm)[0];
		}

		return `Tá de tiração comigo é ${user.username}?, Vai mandar granada na casa do seu amigo, aqui não! (DESVIAR)`;
	}

	return false;
}
