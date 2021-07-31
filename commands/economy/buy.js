const dbEcon = require('../../dbEcon')
const dsMsg = require('../../dsMsg')
const fnOther = require('../../functions-other')

module.exports = {
  commands: ['buy'],
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: "<What item u want to buy>",
  permissionError: 'You must be an administrator to use this command.',
  permissions: 'VIEW_CHANNEL',
  callback: async (message, arguments) => {
    const guild = message.guild
    const guildID = guild.id
    const userID = message.author.id
    var name = arguments[0]
    name = await fnOther.capitalize(name)
    message.delete({ timeout: 100 })
    var stock = await dbEcon.getStock(guildID, name)
    if(stock == 0){
      dsMsg.guildMsg(guild, `That item is out of stock, please purchase another item!`, message.channel.id, 30);
    } else {
      const coins = await dbEcon.getCoins(guildID, userID)
      const cost = await dbEcon.getCost(guildID, name)
      const newbal = coins - cost
      if(newbal < 0){
        dsMsg.guildMsg(guild, `You do not have enough coins to purchase this item!`, message.channel.id, 30);
        return
      } else {
        const items = await dbEcon.getItems(guildID, userID)
        const current = items[name];
        if (current === undefined) {
          items[name] = 1        
        } else {
          items[name] = 1 + current
        }
        stock = stock - 1
        await dbEcon.updtBal(guildID, userID, newbal)
        await dbEcon.addItemtoUser(guildID, userID, items)
        await dbEcon.updtStock(guildID, name, stock)
        dsMsg.guildMsg(guild, `You have purchased a ${name} for $${cost}.00 and have $${newbal}.00 left. Their are ${stock} left in stock!`, message.channel.id, 30);

      }
    }
  },
}
