const dbEcon = require('../../dbEcon')
const dsMsg = require('../../dsMsg')

module.exports = {
  commands: ['store'],
  callback: async (message, arguments) => {
    const guild = message.guild
    message.delete({ timeout: 100 })
    const items = await dbEcon.getAllStore(guild.id)
    await dsMsg.store(message.channel, items, guild)
  },
}