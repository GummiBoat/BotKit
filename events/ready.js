exports.run = (client) => {
	// Playing gamekit.com, log ready message in console
	client.user.setActivity(`gamekit.com`);
	console.log(`Ready in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);
}
