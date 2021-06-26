const management = require('../../management')
const fncDiscord = require('../../functions-discord')
const dbGet = require('../../dbGet')

module.exports = {
  commands: ['update', 'updt'],
  minArgs: 0,
  maxArgs: 0,
  permissionError: 'You must be HR or higher to use this command.',
  permissions: 'MANAGE_ROLES',
  callback: async (message, arguments) => {
    message.delete({ timeout: 5000 })
    const status = true
    const onDutyUsers = await dbGet.usersOn(status)
    const text = `The embeds have been updated!`
    fncDiscord.sendGuildMessage(message.guild, `updated count for users on duty`, message.channel.id, 10)

  },
}