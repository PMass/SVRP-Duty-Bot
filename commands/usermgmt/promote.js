const dbGet = require('../../dbGet')
const dbUpdate = require('../../dbUpdate')
const dsMsg = require('../../dsMsg')
const dsGet = require('../../dsGet')
const gSheets = require('../../gSheets')

module.exports = {
  commands: ['promote', 'promo'],
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: "<The target's @>>",
  permissionError: 'You must be HR or higher to use this command.',
  permissions: 'MANAGE_ROLES',
  callback: async (message, arguments) => {
    message.delete({ timeout: 2000 })
    guild = message.guild
    guildID = guild.id
    const mention = message.mentions.members.first()
    if (!mention) {
      message.reply('Please tag the user who you are putting into the database.')
      return
    }
    userID = mention.id
    var [certs, noMatch ] = await dbGet.userCerts(guildID, userID)
    var [userInfo, noMatch ] = await dbGet.userFull(guildID, userID)
    userInfo.ID = new Date()
    await dbUpdate.userInfo(guildID, userInfo, certs)
    const [userInfoNew, noMatch2] = await dbGet.userFull(guildID, userID)
    userInfoNew.certsFull = await dsGet.checkCerts(guild, certs);
    await gSheets.userUpdate(userInfoNew)
    dsMsg.guildMsg(guild, `You have sucessfully set ${mention.displayName}'s promotion day to today!`, message.channel.id, 10);

  },
}