const dsMsg = require('../../dsMsg')
const dbGet = require('../../dbGet')
const dsGet = require('../../dsGet')

module.exports = {
  commands: ['hrprofile'],
  minArgs: 0,
  maxArgs: 1,
  expectedArgs: "<The target's @>",
  permissionError: 'You must be HR or higher to use this command.',
  permissions: 'MANAGE_ROLES',
  callback: async (message, arguments) => {
    message.delete({ timeout: 5000 })
    var mention = message.mentions.members.first()
    if (!mention) {
      mention = message.member
    }
    const [ userInfo, noMatch ] = await dbGet.userFull(message.guild.id, mention.id)
    if (noMatch) {
    dsMsg.sendGuildMessage(message.guild, "Didn't find a user, please add them to the database", message.channel.id, 30)
    } else {
    userInfo.certsFull = await dsGet.checkCerts(message.guild, userInfo.certs);
    console.log(userInfo)
    await dsMsg.sendProfileHR(message.channel, userInfo)
    }
  },
}