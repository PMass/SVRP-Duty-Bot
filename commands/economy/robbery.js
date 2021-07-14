const economy = require('../../economy')
const battle = require('../../battle')
const dsMsg = require('../../dsMsg')

module.exports = {
  commands: ['10-90'],
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: "<What call are you responding to  \`LTD\` / \`Fleeca\ / \`Paleto\` / \`Pacific\`>",
  permissionError: 'You must be an administrator to use this command.',
  permissions: 'VIEW_CHANNEL',
  callback: async (message, arguments) => {
    message.delete({ timeout: 100 })
    const guildID = message.guild.id
    const callType = arguments[0]
    const active = await battle.getCurrent(callType)
    if(active){
      dsMsg.guildMessage(guild, `<@${message.author.id}> you readying up to respond to the ${callType} robbery. What equipment do you take?`, message.channel.id, 30);T
      await battle.addDefender(guildID, message.author.id, callType)
    } else {
      dsMsg.guildMessage(guild, `Their are no active ${callType} robberies to responde to. Good job keeping the city safe`, message.channel.id, 30);T
    }
  },
}