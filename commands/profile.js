exports.run = (client, message, args) => {
  // Get Member
  var guilds = client.guilds.get('424539676389408779');
  var member = guilds.members.get(message.author.id);

  // Needs to be Moderator
  if(!member.roles.has('424545380932517888')){
	  message.reply('you are not a moderator! >:(');
    return;
  }

  // If no arguments
  if (args.length == 0){

    // Get user
    let user = client.getUser.get(message.author.id);

    // Handle Message
    if(!user)
      message.reply('you are not verified yet.');
    else
    	message.channel.send({embed: {
    		color: 4273849,
    		author: {
    			name: message.author.username,
    			icon_url: message.author.avatarURL
    		},
    		fields: [{
    			name: "Gamekit URL",
    			value: "https://gamekit.com/profil/"+user.gamekit_id+"/"
    		},
    		{
    			name: "Discord User",
    			value: "<@"+user.discord_id+">"
    		}],
    		timestamp: new Date(),
    		footer: {
    			icon_url: client.user.avatarURL,
    			text: "(c) BotKit"
    		}
    	}});

  // If arguments
  } else {
    // Get mentions
    let member = message.mentions.members.first();
    // Handle message like above
    if(member){
      let user = client.getUser.get(member.id);
      if(!user)
        message.reply('that user is not verified yet.');
      else
      	message.channel.send({embed: {
      		color: 4273849,
      		author: {
      			name: member.user.username,
      			icon_url: member.user.avatarURL
      		},
      		fields: [{
      			name: "Gamekit URL",
      			value: "https://gamekit.com/profil/"+user.gamekit_id+"/"
      		},
      		{
      			name: "Discord User",
      			value: "<@"+user.discord_id+">"
      		}],
      		timestamp: new Date(),
      		footer: {
      			icon_url: client.user.avatarURL,
      			text: "(c) BotKit"
      		}
      	}});
    } else {
      message.reply('that is not a valid mention.');
    }
  }
}
