const dsMsg = require('../../dsMsg')
const dbGet = require('../../dbGet')
const dsGet = require('../../dsGet')

module.exports = {
  commands: ['profile', 'info'],
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: "<The target's @>",
  permissionError: 'You must be HR or higher to use this command.',
  permissions: 'VIEW_CHANNEL',
  callback: async (message, arguments) => {
    message.delete({ timeout: 5000 })
    const mention = message.mentions.members.first()
    if (!mention) {
      message.reply('Please tag the user who you are putting into the database.')
      return
    }
    const [ userInfo, noMatch ] = await dbGet.userFull(message.guild.id, mention.id)
    if (noMatch) {
    dsMsg.sendGuildMessage(message.guild, "Didn't find a user, please add them to the database", message.channel.id, 30)
    } else {
    userInfo.certsFull = await dsGet.checkCerts(message, userInfo.certs);
    userInfo.promo = "01/01/2020"
    console.log(userInfo)
    await dsMsg.sendProfileMessage(message.channel, userInfo)
    }
  },
}