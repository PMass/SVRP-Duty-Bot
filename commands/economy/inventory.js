const dbEcon = require('../../dbEcon')
const dsMsg = require('../../dsMsg')

module.exports = {
  commands: ['inventory', 'inv'],
  callback: async (message, arguments) => {
    const guild = message.guild
    message.delete({ timeout: 100 })
    const items = await dbEcon.getItems(guild.id, message.author.id)
    await dsMsg.inventory(message.channel, items, guild, message.member)
  },
}