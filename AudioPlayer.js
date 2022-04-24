const CommandsModel = require("./CommandsModel.js");

class AudioPlayer extends CommandsModel {
	constructor(client) {
		super(client);
	}

	play(audio, channel, user, message, io, roles = undefined) {
		if (roles && !this.canExecute(user, roles)) {
			return false;
		}

		io.to(channel.substr(1)).emit("falador", `/mp3/${audio}.mp3`);
		this.client.say(channel, `/me @${user.username ?? user} mandou tocar o audio ${audio} ${message ? `e disse: ${message}` : ''}`);
	}
}

module.exports = AudioPlayer;
