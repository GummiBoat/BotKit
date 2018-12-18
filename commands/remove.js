exports.run = (client, message, args, member) => {
  // Needs to be Moderator
  if(!member.roles.has('424540236538970113')){
	  message.reply('you are not an admin! >:(');
    if(message.guild !== null) message.delete();
    return;
  }

  // Grabs and checks mention
  let user = message.mentions.members.first();
  if(!user){
    message.channel.send('Please use `>remove @user`')
    .then(msg => {
      msg.delete(5000);
    });
    if(message.guild !== null) message.delete();
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
  message.channel.send('User **' + user.displayName + '** is no longer verified.')
  .then(msg => {
      msg.delete(5000);
  });
  if(message.guild !== null) message.delete();
};
