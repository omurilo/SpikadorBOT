const { profanity } = require("@2toad/profanity");

class ConfigClient {
  constructor() {
    this._canalDoBot = process.env.TMI_USERNAME;
    this._tokenTwitch = process.env.TMI_OAUTH;
    this._canalBotFica = String(process.env.TWITCH_CHANNELS ?? '').split(",");
    this._userBlacklist = String(process.env.USER_BLACKLIST ?? '').split(',');
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

  get usersBlacklist() {
    return this._userBlacklist;
  }
}

module.exports = ConfigClient;
