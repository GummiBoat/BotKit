exports.run = (client, message, args) => {
  message.channel.send('<:mlem:442652664778588160>');
  if(message.guild !== null) message.delete();
}
