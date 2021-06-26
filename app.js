// require the discord.js and GoogleSheets module and configuration and 
	const Discord = require('discord.js');
	const mongo = require('./mongo')
	const { GoogleSpreadsheet } = require('google-spreadsheet');
	const fs = require('fs')
	const path = require('path')
	const { promisify } = require('util');

	const config = require('./config.json');
	const creds = require('./client_secret.json');

	const doc = new GoogleSpreadsheet('15gD6aWB1y03LSo7GlyLLimdFekv-sMij6tw1oohaidM');	

	const client = new Discord.Client({ partials: ['MESSAGE', 'REACTION'] });
	const timer = ms => new Promise(res => setTimeout(res, ms))

// Commands

client.once('ready', async () => {

	client.user.setPresence({ activity: { type: 'LISTENING', name: 'The Phone Lines'}, status: 'online' }).catch(console.error);
	console.log('Ready!');
	await mongo().then((mongoose) => {
		try {
			console.log('Connected to mongo!')
		} finally {
			mongoose.connection.close()
		}
	})
		const baseFile = 'command-base.js'
		const commandBase = require(`./commands/${baseFile}`)

		const readCommands = (dir) => {
  		const files = fs.readdirSync(path.join(__dirname, dir))
  		for (const file of files) {
    		const stat = fs.lstatSync(path.join(__dirname, dir, file))
    		if (stat.isDirectory()) {
      			readCommands(path.join(dir, file))
    		} else if (file !== baseFile) {
      			const option = require(path.join(__dirname, dir, file))
      			commandBase(client, option)
    		}
  		}
		}
  readCommands('commands')
});

client.login(config.token);


setInterval(function autoUpdate() {	
			// readCells()
}, 120000);
