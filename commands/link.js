exports.run = (client, message, args, config, table, randomstring) => {
  if(message.guild !== null) return;
  var guilds = client.guilds.get('424539676389408779');
  var member = guilds.members.get(message.author.id);
  if(member === null) return;
  if(!args[0].startsWith('https://gamekit.com/profil/')){
    message.author.send('Please provide a proper Gamekit profile URL.');
    return;
  }
  var profile = args[0].replace('https://gamekit.com/profil/', '').replace('/','');
  if(profile.length >= 13){
    message.author.send('Please provide a proper Gamekit profile URL.');
    return;
  }
  let user = client.getUser.get(message.author.id);
  if(!user || args.length >=1 && args[1] === 'replace'){
    console.log('Got profile ' + profile + ", sending pm...");
    let code = randomstring.generate(10);
    user = {
      discord_id: message.author.id,
      gamekit_id: profile,
      code: code,
      verified: 'false'
    }
    client.setUser.run(user);
    let commandFile = require('../puppet.js');
    commandFile.run(user.gamekit_id, user.code, config);
    console.log('The user should\'ve gotten a pm on gamekit now');
    message.author.send('You received a private message on Gamekit, please read it and enter the verification code here with \`.verify <code>\`.');
  } else {
    message.author.send('You already set your profile link. If you want to change it, use \`.link <url> replace\`.');
  }
}
