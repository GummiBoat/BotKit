exports.run = (client, message, args) => {
	message.channel.send('**BotKit Help:**\n`>verify` - Verifies your account\n\n**For Moderators:**\n`>profile` - Shows the profile of a user.\n`>remove @user` - Removes user from being verified.');
	if(message.guild !== null) message.delete();
};
