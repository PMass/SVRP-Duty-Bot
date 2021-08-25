const dbPlayers = require('./dbPlayers');

module.exports = (client) => {
  client.on('message', async (message) => {
    let name = message.channel.name;
    if (name == "join-leave-log-main") {
		console.log('join')
      joinleave(message.content);
    }
    else if (name == "hunting-log") {
		console.log('Hunting')
      hunting(message.embeds);
    }
    else if (name == "duty-log") {
		console.log('duty')
      duty(message.embeds);
    }
  })
}

async function joinleave(discordmessage) {
	var res2 = discordmessage.split("Player Name: ");
	var res5 = res2[1].split(" Steam Name: ");
	var name = res5[0]
	console.log(name)
	var res3 = res5[1].split(" Steam ID: steam:");
	var steamName = res3[0]
	console.log(steamName)
	var res4 = res3[1].split(" Reason:");
	var hex = res4[0]
	await dbPlayers.addPlayer(steamName, hex, name);
}

async function hunting(discordmessage) {
	let name = discordmessage[0].fields[1].value
	let cashraw = discordmessage[0].fields[5].value
	let hexraw = discordmessage[0].fields[3].value.split("steam:")
	let hex = hexraw[1]
  	let cash = parseFloat(cashraw.replace(',', ''));
	await dbPlayers.addCash(hex, name, cash);
}

async function duty(discordmessage) {
	let status = false
	if(discordmessage[0].color == 65407){
		status = true
	}
	var today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var fullClock = date+' '+time;
	let name = discordmessage[0].fields[1].value
	let hexraw = discordmessage[0].fields[3].value.split("steam:")
	let hex = hexraw[1]
	console.log(hex, name, status)
	// await dbPlayers.addCash(hex, name, cash);
}