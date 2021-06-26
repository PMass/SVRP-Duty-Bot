const management = require('../../management')
const fncDiscord = require('../../functions-discord')

module.exports = {
  commands: ['update', 'updt'],
  minArgs: 0,
  maxArgs: 0,
  permissionError: 'You must be HR or higher to use this command.',
  permissions: 'MANAGE_ROLES',
  callback: async (message, arguments) => {
    const status = true
    const onDutyUsers = await management.getUsersOnDuty(status)
    const text = `The embeds have been updated!`
    fncDiscord.sendMessage(message.channel, text, 10)
  },
}