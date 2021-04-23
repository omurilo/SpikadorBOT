const ComandosModel = require("./ComandosModel.js");

class AudiosMP3 extends ComandosModel {
  constructor(client) {
    super(client);
  }

  play(audio, channel, user, message, io) {
    io.to(channel.substr(1)).emit("falador", `/mp3/${audio}.mp3`);
    this.client.say(channel, `/me @${user} mandou tocar o audio ${audio}`);
  }
}

module.exports = AudiosMP3;
