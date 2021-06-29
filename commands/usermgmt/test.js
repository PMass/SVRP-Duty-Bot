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
    const userInfo = {}
    userInfo.callsign = `X-??`
    userInfo.name = message.author.username
    userInfo.rank = rank
    userInfo.photo = message.author.displayAvatarURL({ format: 'jpg', size: 512 })
    userInfo.department = await fncDiscord.multiGroupCheck(message, groups)
    userInfo.location = "NA/EU"
    userInfo.pn = "012-345-6789"
    userInfo.hired = "01/01/2020"
    userInfo.promo = "01/01/2020"

    await fncDiscord.sendProfileMessage(message.channel, userInfo)



    fncDiscord.sendGuildMessage(message.guild, text, message.channel.id, 10)
  },
}