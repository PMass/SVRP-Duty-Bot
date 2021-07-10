const dbAdd = require('../../dbAdd')
const dsMsg = require('../../dsMsg')
const dbGet = require('../../dbGet')

module.exports = {
  commands: ['start'],
  minArgs: 0,
  maxArgs: 0,
  permissionError: 'You must be an admin to run this',
  permissions: 'ADMINISTRATOR',
  callback: async (message, arguments) => {
    const guild = message.guild
    message.delete({ timeout: 10000 })
    const channels = await dbGet.guildChannels(guild.id)
    const channel = guild.channels.cache.get(channels.clock)
    const embeds = await dsMsg.startMessage(channel)
    await dbAdd.start(guild.id, embeds)
    console.log("Started up")
  },
}
