exports.run = (client, message, args, member) => {
	// Needs to be owner, specified in config
	if(message.author.id !== client.config.owner) return message.channel.send(`❌ **| I'm sorry ${message.author.username}, I'm afraid I can't let you do that.**`);

	// Implement clean
	const clean = text => {
	  if (typeof(text) === "string")
	    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
	  else
	  	return text;
	}

	// Eval
	try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }

	if(message.guild !== null) message.delete();
};
