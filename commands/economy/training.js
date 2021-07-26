const dbBattle = require('../../dbBattle')
const battle = require('../../battle')
const dsMsg = require('../../dsMsg')
const disbut = require("discord-buttons");

module.exports = {
  commands: ['training', 'train'],
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: "<@ the person who you want to train with>",
  callback: async (message, arguments) => {
    message.delete({ timeout: 100 })

    const guild = message.guild
    const user = message.mentions.users.first()
    const userID = user.id
    const authorTag = message.author.username

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
    dsMsg.guildMsgBtns(guild, `<@${userID}>, ${authorTag} would like to train with you. It costs $50 and is winner take all. Do you accept?`, "battle", buttons);

    const name = authorTag + `-` + user.username
    await dbBattle.addBattle(guild.id, name, 0, 100)
    await dbBattle.addFighters(guild.id, name, message.author.id, userID)


  },
}