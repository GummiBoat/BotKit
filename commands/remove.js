exports.run = (client, message, args, config) => {
  // Get Member
  var guilds = client.guilds.get('424539676389408779');
  var member = guilds.members.get(message.author.id);

  // Needs to be Moderator
  if(!member.roles.has('424545380932517888')){
	  message.reply('you are not a moderator! >:(');
    return;
  }

  // Grabs and checks mention
  let user = message.mentions.members.first();
  if(!user){
    message.channel.send('Please use `.remove @user`')
    .then(msg => {
      msg.delete(5000);
    });
    return;
  }

  // Check for and remove role
  if(user.roles.has('514465659250278429'))
    user.removeRole('514465659250278429');
  else
    message.channel.send('That user does not have the verify role, trying to remove from database anyways.')
    .then(msg => {
      msg.delete(5000);
    });

  // Remove user from database
  client.remUser.run(user.id);
  message.channel.send('User **' + user.displayName + '** is no longer verified.');
};
