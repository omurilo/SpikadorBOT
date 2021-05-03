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
    let language;
    let finalMessage;
    const haveLanguage = String(message).match(/^\[[\w\-]+\]/);

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

    googleTTS
      .getAudioBase64(`${user} Disse: ${finalMessage}`, {
        lang: language,
      })
      .then((res) => {
        io.to(channel.substr(1)).emit(
          "falador",
          `data:audio/ogg;base64,${res}`
        );
      });
  }
}

module.exports = Bot;
