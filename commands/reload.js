exports.run = (client, message, args, config) => {
	if(message.author.id !== config.owner) return message.channel.send(`❌ **| I'm sorry ${message.author.username}, I'm afraid I can't let you do that.**`);
	if(!args || args.size < 1) return message.reply("Must provide a command name to reload.");
	delete require.cache[require.resolve(`./${args[0]}.js`)];
	message.reply(`The command ${args[0]} has been reloaded`);
};
