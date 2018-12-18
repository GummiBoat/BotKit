exports.run = (client, message, args, member) => {
  const Discord = require('discord.js');
  const embed = new Discord.RichEmbed();
  if(args.length === 0){
    embed.setTitle(`${message.author.username}'s Avatar`);
    embed.setImage(`${message.author.avatarURL}`);
  } else {
    var user;
    if(message.mentions.users.first())
      user = message.mentions.users.first();
    else {
      try {
        user = member.guild.members.find(member => member.displayName.toLowerCase() == args.join(" ").toLowerCase());
      } catch (err) {
        return;
      }
    }
    embed.setTitle(`${user.username}'s Avatar`);
    embed.setImage(`${user.avatarURL}`);
  }
  message.channel.send({embed});
	if(message.guild !== null) message.delete();
};
