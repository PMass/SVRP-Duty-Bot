module.exports = {
  commands: ['test'],
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
  },
}