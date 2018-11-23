exports.run = (client, message, args, member) => {
  // If Member has the verified role
  if(member.roles.has('514465659250278429')) {
    message.reply('you\'re already verified.')
    .then(msg => {
      msg.delete(5000);
    });
  } else {
    if(args.length <= 0) {
      message.author.send('Thank you for starting the verification process. Please provide the link to your gamekit profile by using \`>link <url>\` here.');
      if(message.guild !== null) message.delete();
      return;
    } else {
      // Get User
      let user = client.getUser.get(message.author.id);
      if(!user){
        message.channel.send('You have not provided a link to your profile yet. Please do so with \`>link <url>\`.')
        .then(msg => {
            msg.delete(5000);
        });
        if(message.guild !== null) message.delete();
        return;
      } else {
        if(args[0] !== user.code)
          message.channel.send('That was the wrong code. If you want to replace your gamekit id due to making a mistake, use \`>link <url> replace\`.')
          .then(msg => {
              msg.delete(10000);
          });
        else {
          // Give role and set User later on
          user.verified = 'true';
          member.addRole('514465659250278429');
          message.channel.send('You should now be verified! Thank you and have fun!')
          .then(msg => {
              msg.delete(5000);
          });
        }
      }
      client.setUser.run(user);
    }
  }
  if(message.guild !== null) message.delete();
};
