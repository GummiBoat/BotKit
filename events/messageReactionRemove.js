exports.run = (client, messageReaction, user) => {
  if(messageReaction.me) return;
  if(messageReaction.emoji.id === '568764058606632980') {
    var guilds = client.guilds.get('424539676389408779');
    var member = guilds.members.get(user.id);
    if(member === null || !(member.roles.has('568515244507267093'))) return;
    member.removeRole('568515244507267093');
  }
}
