const dbEcon = require('../../dbEcon')

module.exports = {
  commands: ['addbalance', 'addbal'],
  minArgs: 2,
  maxArgs: 2,
  expectedArgs: "<The target's @> <coin amount>",
  permissionError: 'You must be an administrator to use this command.',
  permissions: 'ADMINISTRATOR',
  callback: async (message, arguments) => {
    message.delete({ timeout: 1000 })
    const mention = message.mentions.users.first()

    if (!mention) {
      message.reply('Please tag a user to add coins to.')
      return
    }

    const coins = arguments[1]
    if (isNaN(coins)) {
      message.reply('Please provide a valid numnber of coins.')
      return
    }

    const guildID = message.guild.id
    const userID = mention.id

    const newCoins = await dbEcon.addCoins(guildID, userID, coins)

    message.reply(
      `You have given <@${userID}> ${coins} dollars(s). They now have ${newCoins} dollars(s)!`
    )
  },
}