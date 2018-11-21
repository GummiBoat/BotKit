exports.run = (client, message, args, table, randomstring) => {
  var guilds = client.guilds.get('424539676389408779');
  var member = guilds.members.get(message.author.id);
  if(member === null) return;
  if(member.roles.has('514465659250278429')) {
    message.reply('you\'re already verified.')
    .then(msg => {
      msg.delete(5000);
    });
  } else {
    if(args.length <= 0) {
      message.author.send('Thank you for starting the verification process. Please provide the link to your gamekit profile by using \`.link <url>\` here.')
	  .then(msg => {
		  message.delete();
	  });
      return;
    } else {
      if(message.guild !== null) return;
      let user = client.getUser.get(message.author.id);
      if(!user){
        message.author.send('You have not provided a link to your profile yet. Please do so with \`.link <url>\`.');
        return;
      } else {
        if(args[0] !== user.code)
          message.author.send('That was the wrong code. If you want to replace your gamekit id due to making a mistake, use \`.link <url> replace\`.');
        else {
          user.verified = 'true';
          member.addRole('514465659250278429');
          message.author.send('You should now be verified! Thank you and have fun!');
        }
      }
      client.setUser.run(user);
    }
  }
};
