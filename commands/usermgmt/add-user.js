const management = require('../../management')
const fncDiscord = require('../../functions-discord')

module.exports = {
  commands: ['adduser'],
  minArgs: 6,
  maxArgs: 6,
  expectedArgs: "<The target's @> <Which Department (police/sheriff)> <Their Steam Hex ID> <Their Hire Date (MM-DD-YYYY)> <Their IC First Name> <Their IC Last Name>",
  permissionError: 'You must be HR or higher to use this command.',
  permissions: 'MANAGE_ROLES',
  callback: async (message, arguments) => {
    message.delete({ timeout: 5000 })
    const mention = message.mentions.users.first()
    if (!mention) {
      message.reply('Please tag the user who you are putting into the database.')
      return
    }
    const guildId = message.guild.id
    const userId = mention.id
    const department = arguments[1]
    const hexid = arguments[2]
    const hireDate = arguments[3]
    const firstName = arguments[4]
    const lastName = arguments[5]
    const totalTime = "0000:00:00"
    const space = " ";
    var fullName = firstName.concat(space.concat(lastName));
    if (department != "police" && department != "sheriff") {
      message.reply('Please provide a valid department (police/sheriff).')
      return
    }
    const newUser = await management.addUser(guildId, userId, department, hexid, hireDate, fullName, totalTime)
    const text = `<@${message.author.id}> have added <@${userId}> to the database. Thank you!`
    fncDiscord.sendMessage(message.channel, text, 10)
  },
}