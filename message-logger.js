const dbPlayers = require('./dbPlayers');
const dbClock = require('./dbClock')

module.exports = (client) => {
  client.on('message', async (message) => {
    let name = message.channel.name;
    if (name == "join-leave-log-main") {
		console.log('join')
      joinleave(message.content);
    }
    else if (name == "hunting-log") {
		console.log('Hunting')
      // hunting(message.content);
    }
    else if (name == "duty-log") {
		console.log('duty')
      duty(message.content);
    }
  })
}

async function joinleave(discordmessage) {
	var split = discordmessage.split("\n");
	var name = split[3].split(": ")[1];
	var steamName = split[4].split(": ")[1];
	var hex = split[5].split(":")[2];
	await dbPlayers.addPlayer(steamName, hex, name);
}

async function hunting(discordmessage) {
	let name = discordmessage[0].fields[1].value
	let cashraw = discordmessage[0].fields[5].value
	let hexraw = discordmessage[0].fields[3].value.split("steam:")
	let hex = hexraw[1]
  	let cash = parseFloat(cashraw.replace(',', ''));
	// await dbPlayers.addCash(hex, name, cash);
}

async function duty(discordmessage) {	
	let split = discordmessage.split("\n");
	let dutyStatus = split[0].split(":")[1];
	let status = false
	if(dutyStatus == `green_circle`){
	  status = true
	}
	var name = split[3].split(": ")[1];
	var hex = split[5].split(":")[2];

	var today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var fullClock = date+' '+time;
	console.log(hex, fullClock, name, status)
	await dbClock.logClock(hex, fullClock, name, status)
	// await clock.adjustDuty(hex, fullClock, name, status)


}