const management = require('../../management')
const fncDiscord = require('../../functions-discord')
const dbGet = require('../../dbGet')

module.exports = {
  commands: ['start'],
  minArgs: 0,
  maxArgs: 0,
  permissionError: 'You must be an admin to run this',
  permissions: 'ADMINISTRATOR',
  callback: async (message, arguments) => {
    const guild = message.guild
    message.delete({ timeout: 5000 })
    const [ clockID, errorID, logID, spamID ] = await dbGet.getGuildInfo(guild.id)    
    const channel = guild.channels.cache.get(clockID)
    const [ embOn, embQueue, embDOC ] = await fncDiscord.sendStartMessage(channel)
    await management.start(guild.id, embOn, embQueue, embDOC)    
    console.log("Started up")
  },
}
