const addUser = require('../../addUser')
const dsMsg = require('../../dsMsg')

module.exports = {
  commands: ['adduser'],
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: "<The target's @>",
  permissionError: 'You must be HR or higher to use this command.',
  permissions: 'MANAGE_ROLES',
  callback: async (message, arguments) => {
    message.delete({ timeout: 5000 })
    const mention = message.mentions.members.first()
    if (!mention) {
      message.reply('Please tag the user who you are putting into the database.')
      return
    }
    const statusCheck = await addUser.add(message, mention)
    dsMsg.guildMsg(message.guild, `Added!`, message.channel.id, 30);
    dsMsg.guildMsg(message.guild, `<@${message.author.id}> have added <@${mention.id}> to the database. Thank you!`, "spam", 10)
  },
}