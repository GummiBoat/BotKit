exports.run = (client, message, args, member) => {
  // Needs to be Moderator
  if(!member.roles.has('424545380932517888')){
    if(member.id === '141221627785510912'){
    } else {
  	  message.reply('you are not a mod! >:(');
      if(message.guild !== null) message.delete();
      return;
    }
  }

  var role = member.guild.roles.get('568515244507267093');
  role.edit({ mentionable: true });
  setTimeout(function(){
    message.channel.send(args.join(' ') + '\n<@&568515244507267093>');
    if(message.guild !== null) message.delete();
  }, 2000);
  setTimeout(function(){
    role.edit({ mentionable: false });
  }, 4000);
};
