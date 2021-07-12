const economy = require('../../economy')

module.exports = {
  commands: ['additem'],
  minArgs: 5,
  maxArgs: 5,
  expectedArgs: "<The items name> <coin cost> <stock amount> <Defence> <Attack>",
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

    const cost = arguments[1]
    if (isNaN(cost)) {
      message.reply('Please provide a valid number for the cost.')
      return
    }

    const stock = arguments[2]
    if (isNaN(stock)) {
      message.reply('Please provide a valid number for the stock.')
      return
    }

    const defence = arguments[3]
    if (isNaN(defence)) {
      message.reply('Please provide a valid number for the items defence.')
      return
    }

    const attack = arguments[4]
    if (isNaN(attack)) {
      message.reply('Please provide a valid number for the items attack.')
      return
    }

    await economy.addItemStore(guildID, name, cost, stock)
    await economy.addItemStats(guildID, name, defence, attack)

    message.reply(
      `You have added ${name} to the database. It costs ${cost} coin(s) and their is ${stock} of it in stock!`
    )
  },
}