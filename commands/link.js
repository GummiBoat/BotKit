exports.run = (client, message, args) => {
  // Needs to start with the link
  if(args.length == 0 || !args[0].startsWith('https://gamekit.com/profil/')){
    message.channel.send('Please provide a proper Gamekit profile URL. (URL needs to start with `https://gamekit.com/profil/`)')
    .then(msg => {
        msg.delete(5000);
    });
    if(message.guild !== null) message.delete();
    return;
  }

  // Remove link to get only user id
  var profile = args[0].replace('https://gamekit.com/profil/', '').replace('/','');

  // Needs to be shorter than 21 chars, this basically prevents anything funky
  if(profile.length >= 21) {
    message.channel.send('Please provide a proper Gamekit profile URL. (The profile is too long, are you sure you\'re copying the right URL?)')
    .then(msg => {
        msg.delete(5000);
    });
    if(message.guild !== null) message.delete();
    return;
  }


  let gkuser = client.getGkUser.get(profile);
  if(gkuser){
    if(gkuser.verified == "true"){
      message.channel.send('That URL is already registered. Contact an Admin if you think this is an error.')
      .then(msg => {
          msg.delete(5000);
      });
      if(message.guild !== null) message.delete();
      return;
    } else {
      client.remUser.run(gkuser.discord_id);
    }
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
    var child_process = require('child_process');
    var cmd = `curl --silent "https://gamekit.com/messages/message/s/send/" -H "cookie: ${client.config.cookie_name}=${client.config.cookie_value};" --data "m_content=Please+type+the+following+on+Discord%3A+%3Everify+${code}&u_id=${profile}"`;
    child_process.execSync(cmd);
    message.channel.send('You received a private message on Gamekit (https://gamekit.com/messages/124109748/), please read it and enter the verification code here with `>verify [code]` (without []).')
    .then(msg => {
        msg.delete(10000);
    });
  } else {
    message.channel.send('You already set your profile link. If you want to change it, use `>link [url] replace` (without []).')
    .then(msg => {
        msg.delete(10000);
    });
  }
  if(message.guild !== null) message.delete();
}
