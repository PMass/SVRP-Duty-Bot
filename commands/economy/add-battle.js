const economy = require('../../economy')

module.exports = {
  commands: ['addbattle'],
  minArgs: 3,
  maxArgs: 3,
  expectedArgs: "<The Battle Name> <The Battle Modifier> <The Battle payout>",
  permissionError: 'You must be an administrator to use this command.',
  permissions: 'ADMINISTRATOR',
  callback: async (message, arguments) => {
    message.delete({ timeout: 1000 })
    const mention = message.mentions.users.first()
    const name = arguments[0]
    if (isNaN(name)) {
      message.reply('Please provide a valid numnber of name.')
      return
    }
    const modifier = arguments[1]
    if (isNaN(modifier)) {
      message.reply('Please provide a valid numnber of modifier.')
      return
    }
    const payout = arguments[2]
    if (isNaN(payout)) {
      message.reply('Please provide a valid numnber of payout.')
      return
    }
    const guildID = message.guild.id
    const newCoins = await economy.addBattle(guildID, name, modifier, payout)

    message.reply(
      `You have given <@${userID}> ${coins} coin(s). They now have ${newCoins} coin(s)!`
    )
  },
}