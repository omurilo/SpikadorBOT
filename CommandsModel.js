class CommandsModel {
	client = null;
	constructor(_client) {
		this.client = _client;
		this.commandsCooldown = new Map();
	}

	static roles = {
		moderator: "mod",
		subscriber: "sub",
		vip: "vip",
		broadcaster: "streamer",
	};

	canExecute(user, roles) {
		const userTitles = [];

		if (user.badges) {
			Object.keys(user.badges).forEach((key) => {
				const title = CommandsModel.roles[key];
				if (title) {
					userTitles.push(title);
				}
			});
		}

		return userTitles.some((element) => roles.includes(element));
	}

	checkCooldown(command, cooldown) {
		function parseMinutesToMiliseconds(minutes) {
			return minutes * 60 * 1000;
		}

		if (this.commandsCooldown.has(command)) {
			const lastExecution = this.commandsCooldown.get(command);
			const nextExecution =
				lastExecution.executed.getTime() + parseMinutesToMiliseconds(lastExecution.cooldown);

			if (nextExecution >= new Date().getTime()) {
				return false;
			}
		}

		this.commandsCooldown.set(command, { cooldown, executed: new Date() });
		return true;
	}
}
module.exports = CommandsModel;
