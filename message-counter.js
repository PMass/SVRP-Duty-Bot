const mongo = require('./mongo')
const dbEcon = require('./dbEcon')
const messageCountSchema = require('./schemas/message-count-schema')

const talkedRecently = new Set();

module.exports = (client) => {
  client.on('message', async (message) => {
    if (talkedRecently.has(message.author.id)) {
    } else {
      const { author } = message
      const guildID = message.guild.id
      const userID = author.id
      const coins = getRandomInt(10)
      const time = coins*3000;
      const newCoins = await dbEcon.addCoins(guildID, userID, coins)    
      talkedRecently.add(message.author.id);
      setTimeout(() => {
        // Removes the user from the set after a minute
        talkedRecently.delete(message.author.id);
      }, time);
    }

  })
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
