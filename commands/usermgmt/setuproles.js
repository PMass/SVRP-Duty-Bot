const dbAdd = require('../../dbAdd')
const fncDiscord = require('../../functions-discord')

module.exports = {
  commands: ['setuproles', 'startroles'],
  minArgs: 0,
  maxArgs: 0,
  permissionError: 'You must be HR or higher to use this command.',
  permissions: 'MANAGE_ROLES',
  callback: async (message, arguments) => {
    message.delete({ timeout: 5000 })
    const guild = message.guild
    const [ roleChief, roleAstChief, roleSheriff, roleUdrSheriff, roleCaptin, roleLt, roleSgt, roleSrOfc, roleSrDpty, roleOfc, roleDpty, rolePrbOfc, rolePrbDpty, roleCdtPh2, roleCdtPh1, roleWarden, roleDptyWarden, roleCrtnOfc, roleRctPh2, roleCdtPh2 ] = await fncDiscord.getGuildRoles(guild)
  },
}