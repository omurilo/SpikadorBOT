const ComandosModel = require("./ComandosModel.js");

class AudiosMP3 extends ComandosModel {
  constructor(client) {
    super(client);
  }

  play(audio, channel, user, message, io) {
    if (
      this.podeExecutar(user, [
        ComandosModel.titles.moderator,
        ComandosModel.titles.subscriber,
        ComandosModel.titles.vip,
        ComandosModel.titles.broadcaster,
      ])
    ) {
      io.to(channel.substr(1)).emit("falador", `/mp3/${audio}.mp3`);
      this.client.say(
        channel,
        `/me @${user.username} mandou tocar o audio ${audio}`
      );
    } else {
      this.client.say(
        channel,
        `/me @${user.username} Os comandos de audios são exclusivos p/ Subs, Mods ou Vips`
      );
    }
  }
}

module.exports = AudiosMP3;
