exports.run = (client, message, args) => {
  if (args.length == 0){
    let user = client.getUser.get(message.author.id);
    if(!user)
      message.reply('you are not verified yet.');
    else
      message.channel.send(`\`\`\`\nDiscord ID: ${user.discord_id}\nGamekit ID: ${user.gamekit_id}\nVerified: ${user.verified}\`\`\``);
  } else {
    let member = message.mentions.members.first();
    if(member){
      let user = client.getUser.get(member.id);
      if(!user)
        message.reply('that user is not verified yet.');
      else
        message.channel.send(`\`\`\`\nDiscord ID: ${user.discord_id}\nGamekit ID: ${user.gamekit_id}\nVerified: ${user.verified}\`\`\``);
    } else {
      message.reply('that is not a valid mention.');
    }
  }
}
