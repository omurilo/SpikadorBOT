const { profanity } = require("@2toad/profanity");

class ConfigClient {
  constructor() {
    this._canalDoBot = process.env.TMI_USERNAME;
    this._tokenTwitch = process.env.TMI_OAUTH;
    this._canalBotFica = String(process.env.TWITCH_CHANNELS ?? '').split(",");
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
