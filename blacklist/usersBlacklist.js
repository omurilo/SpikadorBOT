const fs = require("fs/promises");
const path = require("path");

const filePath = path.resolve(__dirname, "users_blacklist.txt");

async function checkIfFileExistsAndCreate() {
	try {
		await fs.access(filePath);
	} catch (error) {
		if (error.code === 'ENOENT') {
			await writeUsersBlacklistFile();
		}
	}
}

async function readUsersBlacklistFile() {
	await checkIfFileExistsAndCreate();
	const file = await fs.readFile(filePath);

	if (!file) return;

	const users = await file.toString();
	return users.split(/\n/);
}

async function writeUsersBlacklistFile(users = []) {
	const usersToFile = users.join("\n");
	await fs.writeFile(filePath, usersToFile);
}

async function addUserToBlacklistFile(userToAdd) {
	if (!userToAdd) return;

	const { user } = await checkIfUserIsInBlacklist(userToAdd);
	if (user) return;

	await fs.appendFile(filePath, `\n${userToAdd}`);
}

async function removeUserFromBlacklistFile(userToRemove) {
	if (!userToRemove) return;

	const { users, user } = await checkIfUserIsInBlacklist(userToRemove);
	if (!user) return;

	const blacklistWithoutUser = users.filter((blacklistedUser) => !!blacklistedUser && blacklistedUser !== user);
	await fs.writeFile(filePath, blacklistWithoutUser.join("\n"));
}

async function checkIfUserIsInBlacklist(user) {
	if (!user) return;

	const users = await readUsersBlacklistFile();
	return { users, user: users.find(blacklistedUser => new RegExp(user, 'gi').test(blacklistedUser)) }
}

module.exports = {
  readUsersBlacklistFile,
  writeUsersBlacklistFile,
  addUserToBlacklistFile,
  removeUserFromBlacklistFile,
	checkIfUserIsInBlacklist,
	checkIfFileExistsAndCreate
}