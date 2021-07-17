const dbEcon = require('../../dbEcon')

module.exports = {
  commands: ['balance', 'bal', 'money'],
  maxArgs: 1,
  expectedArgs: "[Target user's @]",
  callback: async (message) => {
    message.delete({ timeout: 1000 })
    const target = message.mentions.users.first() || message.author

    const guildID = message.guild.id
    const userID = target.id

    const coins = await dbEcon.getCoins(guildID, userID)

    message.reply(`${target.username} has ${coins} dollars!`)
  },
}