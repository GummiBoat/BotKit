exports.run = (client) => {
	// Playing gamekit.com, log ready message in console
	client.user.setActivity('over Gamekit.com', {type: 'WATCHING'});
	console.log(`Ready in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);
}
