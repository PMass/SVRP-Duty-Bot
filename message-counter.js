const mongo = require('./mongo')
const economy = require('./economy')
const messageCountSchema = require('./schemas/message-count-schema')

module.exports = (client) => {
  client.on('message', async (message) => {
    const { author } = message
    const guildId = message.guild.id
    const userId = author.id
    const coins = 1
    const newCoins = await economy.addCoins(guildId, userId, coins)    
  })
}