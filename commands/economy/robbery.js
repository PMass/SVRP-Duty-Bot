const dbBattle = require('../../dbBattle')
const battle = require('../../battle')
const dsMsg = require('../../dsMsg')

module.exports = {
  commands: ['10-90'],
  callback: async (message, arguments) => {
    message.delete({ timeout: 100 })
    const guild = message.guild
    const actives = await dbBattle.getActives(guild.id)
    if(actives.length > 0){
      var callType = await dsMsg.response(message, `What call are you responding to? ${actives}`);
      callType = await fnOther.capitalize(callType)
      dsMsg.guildMessage(guild, `<@${message.author.id}> you readying up to respond to the ${callType} robbery. Let's sort out your equipment.`, message.channel.id, 30);
      await battle.join(guild.id, message, callType)
    } else {
      dsMsg.guildMessage(guild, `Their are no active ${callType} robberies to responde to. Good job keeping the city safe`, message.channel.id, 30);
    }
  },
}