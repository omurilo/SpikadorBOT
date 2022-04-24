class CommandsModel {
	client = null;
	constructor(_client) {
		this.client = _client;
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
}
module.exports = CommandsModel;
