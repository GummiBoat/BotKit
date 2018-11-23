exports.run = (client, message, args, member, config) => {
	// Needs to be owner, specified in config
	if(message.author.id !== config.owner) return message.channel.send(`❌ **| I'm sorry ${message.author.username}, I'm afraid I can't let you do that.**`);

	// Needs to have arguments
	if(!args || args.size < 1) return message.reply("Must provide a command name to reload.");

	// Remove commandfile from cache
	delete require.cache[require.resolve(`./${args[0]}.js`)];
	message.reply(`The command ${args[0]} has been reloaded`)
	.then(msg => {
			msg.delete(5000);
	});
	if(message.guild !== null) message.delete();
};
