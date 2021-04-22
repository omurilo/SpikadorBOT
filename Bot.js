const googleTTS = require("google-tts-api");
const { ProfanityOptions, Profanity } = require("@2toad/profanity");

const ComandosModel = require("./ComandosModel.js");
const badwords = require("./badwords.json");

class Bot extends ComandosModel {
  constructor(client) {
    super(client);

    const options = new ProfanityOptions();
    options.grawlix = "*****";

    this.profanity = new Profanity(options);

    this.profanity.addWords(badwords);
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

      let finalMessage = arr.slice(1).join(" ");

      if (!idioma) {
        idioma = "pt";
      }

      if (this.profanity.exists(finalMessage)) {
        finalMessage = this.profanity.censor(finalMessage);
      }

      googleTTS
        .getAudioBase64(`${user.username} Disse: ${finalMessage}`, {
          lang: idioma,
        })
        .then((res) => {
          io.to(channel.substr(1)).emit(
            "falador",
            `data:audio/ogg;base64,${res}`
          );
        });
    } else {
      this.client.say(
        channel,
        `/me @${user.username} O comando !falador é exclusivo p/ Subs, Mods ou Vips`
      );
    }
  }
}

module.exports = Bot;
