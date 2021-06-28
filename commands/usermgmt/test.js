const fncDiscord = require('../../functions-discord')
const dbGet = require('../../dbGet')

module.exports = {
  commands: ['test'],
  minArgs: 0,
  maxArgs: 0,
  permissionError: 'You must be HR or higher to use this command.',
  permissions: 'MANAGE_ROLES',
  callback: async (message, arguments) => {
    message.delete({ timeout: 5000 })
    const [groups, certs, rank] = await fncDiscord.getRoles(message.guild, message.author.id)



    
    const text = `you are a ${rank} appart of the ${groups} with the certs ${certs}`
    fncDiscord.sendGuildMessage(message.guild, text, message.channel.id, 10)
  },
}