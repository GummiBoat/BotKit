exports.run = (client, message, args, member) => {
  // Needs to be Moderator
  if(!member.roles.has('424545380932517888')) {
	  message.reply('you are not a moderator! >:(')
    .then(msg => {
        msg.delete(5000);
    });
    if(message.guild !== null) message.delete();
    return;
  }

  // Try to fetch user by author, mention, id or name
  let user = client.getUser.get(message.author.id);
  if (args.length > 0) {
    if(message.mentions.users.first())
      user = client.getUser.get(message.mentions.users.first().id);
    else if(/^[0-9]+$/.test(args[0]))
      user = client.getUser.get(args[0]);
    else
      try {
        user = client.getUser.get(member.guild.members.find(member => member.displayName.toLowerCase() == args.join(" ").toLowerCase()).id);
      } catch (err) {
        user = false;
      }
  }

  // Handle user and send embed
  if(!user) {
    message.channel.send('You or the specified user are not verified or could not be found.')
    .then(msg => {
        msg.delete(5000);
    });
  } else {
    message.channel.send({embed: {
      color: 4273849,
      fields: [{
        name: "Discord User",
        value: "<@"+user.discord_id+">"
      },
      {
        name: "Gamekit URL",
        value: "https://gamekit.com/profil/"+user.gamekit_id+"/"
      }]
    }});
  }

  if(message.guild !== null) message.delete();
}
