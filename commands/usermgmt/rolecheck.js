const fncDiscord = require('../../functions-discord')
const dbGet = require('../../dbGet')

module.exports = {
  commands: ['rolecheck'],
  minArgs: 0,
  maxArgs: 0,
  permissionError: 'You must be HR or higher to use this command.',
  permissions: 'MANAGE_ROLES',
  callback: async (message, arguments) => {
    message.delete({ timeout: 5000 })
    await fncDiscord.takeRole(guild, userID, rolesGroups.on)
  },
}