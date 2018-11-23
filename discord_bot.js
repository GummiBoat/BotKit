const config = require('./config.json'); // Get config
const Discord = require("discord.js"); // Needs discord.js ... duh
const client = new Discord.Client(); // New Discord Client, needs to be set here
const SQLite = require("better-sqlite3"); // Needs sqlite for database
const sql = new SQLite('./users.sqlite'); // Retrieve database
const fs = require("fs"); // Needs filestream for events
const talkedRecently = new Set(); // Cooldown for commands

// Prepare table
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
client.remUser = sql.prepare("DELETE FROM users WHERE discord_id = ?");

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

  // Check if user is on Gamekit
  var guilds = client.guilds.get('424539676389408779');
  var member = guilds.members.get(message.author.id);
  if(member === null) return;

  // 5s cooldown on commands
  if(talkedRecently.has(message.author.id)){
    message.channel.send('Woah there! Not so fast!')
    .then(msg => {
      msg.delete(3000)
    });
    if(message.guild !== null) message.delete();
    return;
  }
  talkedRecently.add(message.author.id);
  setTimeout(()=>{
    talkedRecently.delete(message.author.id);
  }, 5000)

  // Trim args and command from message
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
  // Load file from command
	try {
		let commandFile = require(`./commands/${command}.js`);
		commandFile.run(client, message, args, member, config);
    if(message.guild !== null) message.delete();
	} catch (err) {
    if(err.code === 'MODULE_NOT_FOUND')
      console.error('Caught invalid command: ' + command);
    else
		  console.error(err);
	}
});

console.log("Logging in...");
client.login(config.token);
