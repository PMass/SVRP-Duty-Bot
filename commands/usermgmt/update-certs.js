const dbAdd = require('../../dbAdd')
const fncDiscord = require('../../functions-discord')

module.exports = {
  commands: ['updatecerts', 'givecerts'],
  minArgs: 2,
  maxArgs: 2,
  expectedArgs: "<The target's @> <Which Department (police/sheriff/doc)>",
  permissionError: 'You must be HR or higher to use this command.',
  permissions: 'MANAGE_ROLES',
  callback: async (message, arguments) => {
    message.delete({ timeout: 5000 })
    const guildID = message.guild.id
    const mention = message.mentions.users.first()
    if (!mention) {
      message.reply('Please tag the user who you are putting into the database.')
      return
    }
    const userID = mention.id
    const department = arguments[1]
    if (department != "police" && department != "sheriff") {
      message.reply('Please provide a valid department (police/sheriff).')
      return
    }
    // const newUser = await dbAdd.addUser(guildID, mention, department, hexid, hireDate, fullName, totalTime)
    // fncDiscord.sendGuildMessage(message.guild, `<@${message.author.id}> have added <@${userId}> to the database. Thank you!`, "spam", 10)
  },
}