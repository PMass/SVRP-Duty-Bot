const mongo = require('./mongo')
const economy = require('./economy')
const messageCountSchema = require('./schemas/message-count-schema')

module.exports = (client) => {
  client.on('message', async (message) => {
    const { author } = message
    const guildID = message.guild.id
    const userID = author.id
    const coins = getRandomInt(10)
    const newCoins = await economy.addCoins(guildID, userID, coins)    
  })
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
