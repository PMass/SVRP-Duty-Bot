const management = require('./management')
const fncClock = require('./functions-clock')
const fncDiscord = require('./functions-discord')
const dbGet = require('./dbGet')
const dbUpdate = require('./dbUpdate')


module.exports.adjustDuty = async (message,department, hexID, fullClock, fullName, status) => {
	try {
	const guild = message.guild
	console.log(department, hexID, fullClock, fullName, status)
	const newUser = await management.logClock(department, hexID, fullClock, fullName, status)
	const [ userID, pastTime, noMatch ] = await dbGet.user(hexID, department)
	const currentStatus = await dbGet.status(userID, department, status)
	if (noMatch) {
		console.log("Didn't find a user, exiting clock in")
	} else if (currentStatus === status) {
		console.log("Error in Logging the duty clock")
		if (currentStatus) { fncDiscord.sendGuildMessage(guild, `Error, user never clocked off`,"error") } else { fncDiscord.sendGuildMessage(guild, `Error, user never clocked on`,"error") }
	} else if (status) {
		const [ dutyID, queueID ] = await dbGet.guildRoles(guild.id)
		const userClockOn = fncDiscord.giveRole(guild, userID, dutyID)
		const userClocked = await dbUpdate.onDuty(userID, department, fullClock, status)
		fncDiscord.sendGuildMessage(guild, `User Has Clocked On`, "spam", 10)
	} else {
		const workedTime = await dbGet.time(userID, department, fullClock)
		const summingArray = [];
		summingArray.push(pastTime);
		summingArray.push(workedTime);
		const totalMinutes = summingArray.map(fncClock.toHours).reduce(fncClock.sum);
		const formatedTime = fncClock.timeConvert(totalMinutes)
		if (isNaN(totalMinutes)) { // SEND AN ERROR IN THE ERROR CHANNEL
			fncDiscord.sendGuildMessage(guild, `ERROR, result not a number`,"error")
		} else {
			const userIDfinal = await dbUpdate.time(userID, department, formatedTime)
		}
		const [ dutyID, queueID ] = await dbGet.guildRoles(guild.id)
		const userClockOn = fncDiscord.takeRole(guild, userID, dutyID)
		const userClocked = await dbUpdate.onDuty(userID, department, fullClock, status)
		fncDiscord.sendGuildMessage(guild, `User Has Clocked Off`, "spam", 10)
	}
		return ;
    } catch {
    	fncDiscord.sendGuildMessage(guild, 'Error in Logging the duty clock',"error")
    }
}
