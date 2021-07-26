const dbEcon = require('../../dbEcon')
const dbBattle = require('../../dbBattle')

module.exports = {
  commands: ['addtraining'],
  minArgs: 3,
  maxArgs: 3,
  expectedArgs: "<The items name> <defence/attack> <damage/heals>",
  permissionError: 'You must be an administrator to use this command.',
  permissions: 'ADMINISTRATOR',
  callback: async (message, arguments) => {
    message.delete({ timeout: 100 })
    const guildID = message.guild.id

    const name = arguments[0]
    if (!name) {
      message.reply('Please provide a name for the item.');
      return
    }

    const level = arguments[1]
    if (isNaN(level)) {
      message.reply('Please provide a valid number for the attack or defence stat.')
      return
    }

    const damage = arguments[2]
    if (isNaN(damage)) {
      message.reply('Please provide a valid number for the damage/healing.')
      return
    }
    await dbBattle.trainingStance(guildID, name, level, damage)

    message.reply(
      `You have added ${name} to the database. It has a ${level} defence/attack and will do ${damage} damage!`
    )
  },
}