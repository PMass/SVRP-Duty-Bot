const dbBattle = require('../../dbBattle')
const battle = require('../../battle')
const dsMsg = require('../../dsMsg')
const disbut = require("discord-buttons");

module.exports = {
  commands: ['training', 'train'],
  minArgs: 2,
  maxArgs: 2,
  expectedArgs: "<@ the person who you want to train with> <How much you want to wager on the fight",
  callback: async (message, arguments) => {
    message.delete({ timeout: 100 })

    const guild = message.guild
    const user = message.mentions.users.first()
    const authorTag = message.author.username
    var cost = arguments[1]
    if (cost<20) {
      message.reply('Too low of a wager, it must be greater than $20')
      return
    }
    const winnings = cost * 2 - 10

    if (!user) {
      message.reply('Please tag who you want to train with.')
      return
    }
    let btns = {}
    btns.yes = new disbut.MessageButton()
      .setStyle('green')
      .setLabel(`Heck yeah let's train!`) 
      .setID('train_yes') 

    btns.no = new disbut.MessageButton()
      .setStyle('red')
      .setLabel(`Nah, I'd rather not train right now`) 
      .setID('train_no') 

    let buttons = new disbut.MessageActionRow()
      .addComponents(btns.yes, btns.no);
    dsMsg.guildMsgBtns(guild, `<@${user.id}>, ${authorTag} would like to train with you. It will cost ${cost} and is winner will win ${winnings}. Do you accept?`, "battle", buttons);
    cost = 0 - cost
    await dbEcon.addCoins(guildID, user.id, cost)
    const name = authorTag + `-` + user.username
    await dbBattle.addBattle(guild.id, name, 0, winnings)
    await dbBattle.addFighters(guild.id, name, message.author, user)
  },
}