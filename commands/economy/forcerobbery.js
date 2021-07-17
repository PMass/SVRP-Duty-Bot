const dsMsg = require('../../dsMsg')
const dbBattle = require('../../dbBattle')
const battle = require('../../battle')

module.exports = {
  commands: ['forcerobbery'],
  permissionError: 'You must be an administrator to use this command.',
  permissions: 'ADMINISTRATOR',
  callback: async (message, arguments) => {
    const guildID = message.guild.id
    message.delete({ timeout: 100 })
    const callType = await dsMsg.response(message, `What robbery are you doing?`);
    const active = await dsMsg.response(message, `What are you trying to do \`start\`, \`end\`?`);
    var status = true
    switch (active) {
      case "start":
        await dbBattle.updtActive(message.guild.id, callType, status)
        dsMsg.guildMessage(guild, `Opening up the ${callType} robbery for PD to repospond to`, message.channel.id, 30);
        break;
      case "end":
        status = false
        await dbBattle.updtActive(message.guild.id, callType, status)
        await battle.startBattle(guildID, callType)
        dsMsg.guildMessage(guild, `Closing and starting the ${callType} robbery for PD to repospond to`, message.channel.id, 30);
        break;
      default:
        console.log("ERROR: NOT A VALID OPTION FOR TYRING TO DO")
    }
    dsMsg.guildMessage(guild, `Their are no active ${callType} robberies to responde to. Good job keeping the city safe`, message.channel.id, 30);

  },
}