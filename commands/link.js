exports.run = (client, message, args, config) => {
  // Needs to be a DM
  if(message.guild !== null) return;

  // Needs to be a user on gamekit
  var guilds = client.guilds.get('424539676389408779');
  var member = guilds.members.get(message.author.id);
  if(member === null) return;

  // Needs to start with the link
  if(!args[0].startsWith('https://gamekit.com/profil/')){
    message.author.send('Please provide a proper Gamekit profile URL.');
    return;
  }

  // Remove link to get only user id
  var profile = args[0].replace('https://gamekit.com/profil/', '').replace('/','');

  // Needs to be shorter than 13 chars, this basically prevents anything funky
  if(profile.length >= 13){
    message.author.send('Please provide a proper Gamekit profile URL.');
    return;
  }

  // Get user
  let user = client.getUser.get(message.author.id);
  // If user doesn't exist or arg[1] is replace
  if(!user || args.length >=1 && args[1] === 'replace'){
    // Generate code and set default values
    let code = require("randomstring").generate(10);
    user = {
      discord_id: message.author.id,
      gamekit_id: profile,
      code: code,
      verified: 'false'
    }
    // Set user
    client.setUser.run(user);
    // Send code on Gamekit
    let commandFile = require('../puppet.js');
    commandFile.run(user.gamekit_id, user.code, config);
    message.author.send('You received a private message on Gamekit, please read it and enter the verification code here with \`.verify <code>\`.');
  } else {
    message.author.send('You already set your profile link. If you want to change it, use \`.link <url> replace\`.');
  }
}
