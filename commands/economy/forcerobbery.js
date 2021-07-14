const economy = require('../../economy')
const dsMsg = require('../../dsMsg')

module.exports = {
  commands: ['forcerobbery'],
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: "<What type of call are you responding to  \`LTD\` / \`Fleeca\ / \`Paleto\` / \`Pacific\`>",
  permissionError: 'You must be an administrator to use this command.',
  permissions: 'ADMINISTRATOR',
  callback: async (message, arguments) => {
    const guildID = message.guild.id
    message.delete({ timeout: 100 })
    const callType = arguments[0]
    switch (callType) {
      case "LTD":
        itemInfo.cost = await dsMsg.response(message, `This item currently costs ${itemInfo.cost}. Provide a new cost for this item`);
        await economy.updtItemStore(guildID, name, itemInfo)
        break;
      case "Fleeca":
        itemInfo.stock = await dsMsg.response(message, `This item currently has ${itemInfo.stock} in stock. Provide a new stock for this item`);
        await economy.updtItemStore(guildID, name, itemInfo)
        break;
      case "Paleto":
        itemInfo.attack = await dsMsg.response(message, `This item currently has an attack of ${itemInfo.attack}. Provide a new cost for this item`);
        await economy.updtItemStats(guildID, name, itemInfo)
        break;
      case "Pacific":
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