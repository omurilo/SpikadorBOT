const { profanity } = require("@2toad/profanity");

class ConfigClient {
  constructor() {
    this._canalDoBot = process.env.TMI_USERNAME; // nome do bot
    this._tokenTwitch = process.env.TMI_OAUTH; //token do bot -> https://twitchapps.com/tmi/
    this._canalBotFica = String(process.env.TWITCH_CHANNELS).split(","); // lista de canais que o bot ficará
  }

  get canalBot() {
    return this._canalBotFica;
  }

  get token() {
    return this._tokenTwitch;
  }

  get botFica() {
    return this._canalBotFica;
  }
}

module.exports = ConfigClient;
