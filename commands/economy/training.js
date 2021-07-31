const dbTraining = require('../../dbTraining')
const battle = require('../../battle')
const dsMsg = require('../../dsMsg')
const disbut = require("discord-buttons");
const dbEcon = require('../../dbEcon')

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
    const author = message.author
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
    if (isNaN(cost)) {
      message.reply('Please provide a valid numnber amount.')
      return
    }

    var coins = await dbEcon.getCoins(guild.id, author.id)
    var newbal = coins - cost
    if(newbal < 0){
      dsMsg.guildMsg(guild, `You do not have enough coins for this training, please suggest a lower wager!`, "battle", 30);
      return
    }
    var coins = await dbEcon.getCoins(guild.id, user.id)
    var newbal = coins - cost
    if(newbal < 0){
      dsMsg.guildMsg(guild, `They do not have enough coins for this training, please suggest a lower wager!`, "battle", 30);
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
    await dbEcon.addCoins(guild.id, user.id, cost)
    const name = authorTag + `-` + user.username
    await dbTraining.addBattle(guild.id, name, 0, winnings)
    const attacker = {id: author.id, username:author.username}
    const defender =  {id: user.id, username:user.username}
    await dbTraining.addFighters(guild.id, name, attacker, defender)
  },
}