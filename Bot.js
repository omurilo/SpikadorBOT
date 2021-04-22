const ComandosModel = require("./ComandosModel.js");
const googleTTS = require("google-tts-api");

class Bot extends ComandosModel {
  constructor(client) {
    super(client);
  }

  run(channel, user, message, io) {
    if (
      this.podeExecutar(user, [
        ComandosModel.titles.moderator,
        ComandosModel.titles.subscriber,
        ComandosModel.titles.vip,
        ComandosModel.titles.broadcaster,
      ])
    ) {
      const arr = message.substr(8).split(" ");
      let idioma = arr[0];
      message = arr.slice(1).join(" ");

      if (!idioma) {
        idioma = "pt";
      }
      googleTTS
        .getAudioBase64(`${user.username} Disse: ${message}`, {
          lang: idioma,
        })
        .then((res) => {
          io.to(channel.substr(1)).emit(
            "spikador",
            `data:audio/ogg;base64,${res}`
          );
        });
    } else {
      this.client.say(
        channel,
        `/me @${user.username} O comando !spikador é exclusivo p/ Subs, Mods ou Vips`
      );
    }
  }
}

module.exports = Bot;
