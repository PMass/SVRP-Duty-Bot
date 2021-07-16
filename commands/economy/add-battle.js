const dbBattle = require('../../dbBattle')

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
    await dbBattle.addBattle(guildID, name, modifier, payout)

    message.reply(
      `You have added a ${name} battle to the database. It has a ${modifier} X modifier and pays out average ${payout}!`
    )
  },
}