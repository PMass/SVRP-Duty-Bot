const economy = require('../../economy')
const dsMsg = require('../../dsMsg')

module.exports = {
  commands: ['updateitem'],
  minArgs: 2,
  maxArgs: 2,
  expectedArgs: "<the items name> <What you wanted to update  \`cost\` / \`stock\ / \`attack\` / \`defence\`>",
  permissionError: 'You must be an administrator to use this command.',
  permissions: 'ADMINISTRATOR',
  callback: async (message, arguments) => {
    const guildID = message.guild.id
    message.delete({ timeout: 100 })
    const name = arguments[0]
    const option = arguments[1]
    var itemInfo = {}
    itemInfo.cost = await economy.getCost(guildID, name)
    itemInfo.stock = await economy.getStock(guildID, name)
    itemInfo.attack = await economy.getAttack(guildID, name)
    itemInfo.defence = await economy.getDefence(guildID, name)
    console.log(itemInfo)
    switch (option) {
      case "cost":
        itemInfo.cost = await dsMsg.response(message, `This item currently costs ${itemInfo.cost}. Provide a new cost for this item`);
        await economy.updtItemStore(guildID, name, itemInfo)
        break;
      case "stock":
        itemInfo.stock = await dsMsg.response(message, `This item currently has ${itemInfo.stock} in stock. Provide a new stock for this item`);
        await economy.updtItemStore(guildID, name, itemInfo)
        break;
      case "attack":
        itemInfo.attack = await dsMsg.response(message, `This item currently has an attack of ${itemInfo.attack}. Provide a new cost for this item`);
        await economy.updtItemStats(guildID, name, itemInfo)
        break;
      case "defence":
        itemInfo.defence = await dsMsg.response(message, `This item currently has an defence of ${itemInfo.defence} in stock. Provide a new stock for this item`);
        await economy.updtItemStats(guildID, name, itemInfo)
        break;
      default:
        message.reply('Please provide a valid option to update.');
    }

    message.reply(
      `You have updated ${name} in the database. It now costs ${itemInfo.cost} coin(s) and their is ${itemInfo.stock} of it in stock! Its attack is ${itemInfo.attack} and defence is ${itemInfo.defence}`
    )
  },
}