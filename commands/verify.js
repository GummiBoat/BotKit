exports.run = (client, message, args, table, randomstring) => {
  var guilds = client.guilds.get('473087906051915786');
  var member = guilds.members.get(message.author.id);
  if(member === null) return;
  if(member.roles.has('511932460330909717')) {
    message.reply('you\'re already verified.')
    .then(msg => {
      msg.delete(5000);
    });
  } else {
    if(args.length <= 0) {
      message.author.send('Thank you for starting the verification process. Please provide the link to your gamekit profile by using \`.profile <url>\` here.');
      return;
    } else {
      if(message.guild !== null) return;
      let user = client.getUser.get(message.author.id);
      if(!user){
        message.author.send('You have not provided a link to your profile yet. Please do so with \`.profile <url>\`.');
        return;
      } else {
        if(args[0] !== user.code)
          message.author.send('That was the wrong code. If you want to replace your gamekit id due to making a mistake, use \`.profile <url> replace\`.');
        else {
          user.verified = 'true';
          member.addRole('511932460330909717');
          message.author.send('You should now be verified! Thank you and have fun!');
        }
      }
      client.setUser.run(user);
    }
  }
};
