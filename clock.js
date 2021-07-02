const management = require('./management')
const fncClock = require('./functions-clock')
const fncDiscord = require('./functions-discord')
const dbGet = require('./dbGet')
const dbUpdate = require('./dbUpdate')
const dbClock = require('./dbClock')
const dsMsg = require('./dsMsg')

module.exports.adjustDuty = async (message, department, hexID, fullClock, fullName, status) => {
	try {
	const guild = message.guild
	console.log(department, hexID, fullClock, fullName, status)
	const newUser = await dbClock.logClock(department, hexID, fullClock, fullName, status)
	const [ userID, pastTime, cadet, doc, noMatch ] = await dbGet.user(hexID)
	const currentStatus = await dbGet.status(userID, department, status)
	const group = await fncOther.findGroup(department, cadet, doc)
	if (noMatch) {
		console.log("Didn't find a user, exiting clock in")
	} else if (currentStatus === status) {
		console.log("Error in Logging the duty clock")
		if (currentStatus) { dsMsg.sendGuildMessage(guild, `Error, user never clocked off`,"error") } else { dsMsg.sendGuildMessage(guild, `Error, user never clocked on`,"error") }
	} else if (status) {
		const [rolesGroups, rolesCerts, rolesRanks] = await dbGet.guildRoles(guild.id)
		fncDiscord.giveRole(guild, userID, rolesGroups.on)
		await dbUpdate.status(userID, department, fullClock, status)
		await dbClock.clockOn(guildID, userID, group)
		dsMsg.sendGuildMessage(guild, `User Has Clocked On`, "spam", 10)
	} else {
		const workedTime = await dbGet.time(userID, department, fullClock)
		const summingArray = [];
		summingArray.push(pastTime);
		summingArray.push(workedTime);
		const totalMinutes = summingArray.map(fncClock.toHours).reduce(fncClock.sum);
		const formatedTime = fncClock.timeConvert(totalMinutes)
		if (isNaN(totalMinutes)) { // SEND AN ERROR IN THE ERROR CHANNEL
			dsMsg.sendGuildMessage(guild, `ERROR, result not a number`,"error")
		} else {
			await dbUpdate.time(userID, department, formatedTime)
		}
		const [rolesGroups, rolesCerts, rolesRanks] = await dbGet.guildRoles(guild.id)
		fncDiscord.takeRole(guild, userID, rolesGroups.on)
		await dbUpdate.status(userID, department, fullClock, status)
		await dbClock.clockOff(guildID, userID, group)
		dsMsg.sendGuildMessage(guild, `User Has Clocked Off`, "spam", 10)
	}
    } catch {
    	dsMsg.sendGuildMessage(guild, 'Error in Logging the duty clock',"error")
    }
}
