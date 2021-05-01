const dotenv = require("dotenv").config();
const options = { cors: { origin: "*" } };
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, options);

const tmi = require("tmi.js");
const { username, channel } = require("tmi.js/lib/utils");
const ConfigClient = require("./ConfigClient.js");
const config = new ConfigClient();

const optss = {
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

const client = new tmi.client(optss);

const Bot = require("./Bot.js");
const fala = new Bot(client);

const AudiosMP3 = require("./AudiosMP3.js");
const audio = new AudiosMP3(client);

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
  };

  const options = commands[rewardtype];

  if (options) {
    options.instance[options.method](...options.args);
  }
}

function messageToBot(channel, user, command, self) {
  if (self || !command.startsWith("!")) return;

  const commands = {
    "!falador": {
      instance: client,
      method: "say",
      args: [
        channel,
        `@${user.username} Falador é um bot de reprodução de mensagens na live, para utilizá-lo basta resgatar a mensagem com os pontos do canal e escrever o que deseja falar. Se quiser que ela seja falada em outra língua comece sua mensagem com [língua], ex: "[en]Hi, my name is bot falador!"`,
      ],
    },
  };

  const execute = commands[command];

  if (!execute) return;

  execute.instance[execute.method](...execute.args);
}
