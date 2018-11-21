const config = require('./config.json');
const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
const SQLite = require("better-sqlite3");
const sql = new SQLite('./users.sqlite');
var randomstring = require("randomstring");
const talkedRecently = new Set();

const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'users';").get();
if (!table['count(*)']) {
  // If the table isn't there, create and setup.
  sql.prepare("CREATE TABLE users (discord_id TEXT PRIMARY KEY, gamekit_id TEXT, code TEXT, verified TEXT);").run();
  // Ensure that the "discord_id" row is always unique and indexed.
  sql.prepare("CREATE UNIQUE INDEX idx_users_id ON users (discord_id);").run();
  sql.pragma("synchronous = 1");
  sql.pragma("journal_mode = wal");
}

// Prepared Statements
client.getUser = sql.prepare("SELECT * FROM users WHERE discord_id = ?");
client.setUser = sql.prepare("INSERT OR REPLACE INTO users (discord_id, gamekit_id, code, verified) VALUES (@discord_id, @gamekit_id, @code, @verified);");

// Load events, this lets us add and remove events on runtime due to filestream
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

// Manual message event, this lets us add and remove commands on runtime
client.on("message", (message) => {
  // Check user and prefix
	if(message.author.bot || message.content.indexOf(config.prefix) !== 0) return;
  // 5s cooldown on commands
  if(talkedRecently.has(message.author.id)){
    message.channel.send('Woah there! Not so fast!')
    .then(msg => {
      msg.delete(3000)
    });
    return;
  }
  talkedRecently.add(message.author.id);
  setTimeout(()=>{
    talkedRecently.delete(message.author.id);
  }, 5000)
  // Trim args and command from message
  var guilds = client.guilds.get('424539676389408779');
  var member = guilds.members.get(message.author.id);
  if(!member.roles.has('424545380932517888')) return;
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
  // Load file from command
	try {
		let commandFile = require(`./commands/${command}.js`);
		commandFile.run(client, message, args, config, table, randomstring);
	} catch (err) {
		//console.error(err);
	}
});

console.log("Logging in...");
client.login(config.token);