const clock = require('../../clock')
const dsMsg = require('../../dsMsg')

module.exports = {
	commands: ['simclock'],
	minArgs: 5,
	maxArgs: 5,
	expectedArgs: "<Which Department (police/sheriff)> <Their Steam Hex ID> <Their IC First Name> <Their IC Last Name> <Their IC Last Name> <Their Status>",
	permissionError: 'You must be an admin',
	permissions: 'ADMINISTRATOR',
	callback: async (message, arguments) => {    
		message.delete({ timeout: 5000 })
		const department = arguments[0];
		const hexID = arguments[1];
		const firstName = arguments[2];
		const lastName = arguments[3];
		const statusRaw = arguments[4];		
		const space = " ";
		let status = (statusRaw =="true");
		var today = new Date();
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		var fullClock = date+' '+time;
		var fullName = firstName.concat(space.concat(lastName));
		await clock.adjustDuty(message, department, hexID, fullClock, fullName, status)
		dsMsg.guildMessage(message.guild, `You have added a simulated clock on log to the database. Thank you!`, message.channel.id, 10)
	},
}

