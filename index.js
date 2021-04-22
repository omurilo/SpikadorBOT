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

client.on("connected", entrouNoChatDaTwitch);
client.on("message", mensagemChegou);
client.on("redeem", (channel, username, rewardtype, tags, msg) => {
  console.log(rewardtype, tags, msg);
});

app.use(express.static("public"));
server.listen(process.env.PORT);
io.on("connection", (socket) => {
  socket.on("joinRoom", (channel) => {
    socket.join(channel);
  });
});

function entrouNoChatDaTwitch(endereco, porta) {
  console.log(`* Bot entrou no endereço ${endereco}:${porta}`);
}

function mensagemChegou(channel, user, message, self) {
  if (self || !message.startsWith("!")) return;

  const command = message.slice(0, 13).split(" ")[0];
  const falador =
    command.toLowerCase().indexOf("!falador") === 0 ? command : undefined;

  const audios = {
    [falador]: {
      instance: fala,
      method: "run",
      args: [channel, user, message, io],
    },
    "!careca": {
      instance: audio,
      method: "play",
      args: ["careca", channel, user, message, io],
    },
    "!botfalador": {
      instance: client,
      method: "say",
      args: [channel, "Falador é um bot de reprodução de falas e audios"],
    },
  };

  const options = audios[command];

  if (options) {
    options.instance[options.method](...options.args);
  }
}
