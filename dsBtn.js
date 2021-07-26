const Discord = require('discord.js');
const disbut = require("discord-buttons");
const dsMsg = require('./dsMsg')
const battle = require('./battle')

module.exports = (client) => {
  client.on('clickButton', async (button) => {
      let message = button.message
      let guild = button.guild
      const attacker = button.message.content.split(" ")[0]
      const defender = button.message.content.split(" ")[2]
      const clicker = button.clicker.user.username
      const name = attacker + `-` + defender
      switch (button.id) {
        case `train_yes`:
          if(button.clicker.user.id == message.mentions.users.first().id){
            dsMsg.guildMsg(guild, `Let the training begin!`, "battle", 10);
            const initiator = button.message.content.split(" ")[1]
            battle.training(guild, message, initiator)
            message.delete({ timeout: 100 })
          }
          break;
        case `train_no`:
          if(button.clicker.user.id == message.mentions.users.first().id){
            dsMsg.guildMsg(guild, `Perhaps another time.`, "battle", 10);
            dbBattle.endTraining(guildID, name)
            message.delete({ timeout: 100 })
          }  
          break;
        case `train_atkHigh`:
          if(clicker == attacker || clicker == defender){
            dsMsg.guildMsg(guild, `${clicker} your choice has been saved.`, "battle", 10);
            var atk = getRandomInt(4)
            var def = getRandomInt(4)
            var dmgPoints = getRandomInt(9)
            switch (dmgPoints) {
              case 0:
                var dmg = 6
                break;
              case 1:
                var dmg = 7
                break;
              case 2:
                var dmg = 7
                break;
              case 3:
                var dmg = 8
                break;
              case 4:
                var dmg = 9
                break;
              case 5:
                var dmg = 9
                break;
              case 6:
                var dmg = 10
                break;
              case 7:
                var dmg = 11
                break;
              case 8:
                var dmg = 11
                break;
              case 9:
                var dmg = 12
                break;
            }
          } 
          break;
        case `train_atkLow`:
          if(clicker == attacker || clicker == defender){
            dsMsg.guildMsg(guild, `${clicker} your choice has been saved.`, "battle", 10);
            var atk = getRandomInt(4) + 4
            var def = getRandomInt(4) + 4
            var dmgPoints = getRandomInt(9)
            switch (dmgPoints) {
              case 0:
                var dmg = 2
                break;
              case 1:
                var dmg = 3
                break;
              case 2:
                var dmg = 3
                break;
              case 3:
                var dmg = 3
                break;
              case 4:
                var dmg = 3
                break;
              case 5:
                var dmg = 4
                break;
              case 6:
                var dmg = 4
                break;
              case 7:
                var dmg = 4
                break;
              case 8:
                var dmg = 4
                break;
              case 9:
                var dmg = 5
                break;
            }          
            if(clicker == attacker){
              dbBattle.updtTrainingAtk(guildID, name, atk, def, dmg)
            } else {
              dbBattle.updtTrainingDef(guildID, name, atk, def, dmg)
            }
          }  
          break;
        case `train_neutral`:
          if(clicker == attacker || clicker == defender){
            dsMsg.guildMsg(guild, `${clicker} your choice has been saved.`, "battle", 10);
            var def = getRandomInt(4) + 8
          }  
          break;
        case `train_deflow`:
          if(clicker == attacker || clicker == defender){
            dsMsg.guildMsg(guild, `${clicker} your choice has been saved.`, "battle", 10);
            var def = getRandomInt(4) + 4
            var dmgPoints = getRandomInt(9)
            switch (dmgPoints) {
              case 0:
                var dmg = 0
                break;
              case 1:
                var dmg = -1
                break;
              case 2:
                var dmg = -1
                break;
              case 3:
                var dmg = -1
                break;
              case 4:
                var dmg = -1
                break;
              case 5:
                var dmg = -2
                break;
              case 6:
                var dmg = -2
                break;
              case 7:
                var dmg = -2
                break;
              case 8:
                var dmg = -2
                break;
              case 9:
                var dmg = 3
                break;
            }
          }  
          break;
        case `train_defHigh`:
          if(clicker == attacker || clicker == defender){
            dsMsg.guildMsg(guild, `${clicker} your choice has been saved.`, "battle", 10);
            var def = getRandomInt(4)
            var dmgPoints = getRandomInt(9)
            switch (dmgPoints) {
              case 0:
                var dmg = -3
                break;
              case 1:
                var dmg = -4
                break;
              case 2:
                var dmg = -4
                break;
              case 3:
                var dmg = -4
                break;
              case 4:
                var dmg = -4
                break;
              case 5:
                var dmg = -5
                break;
              case 6:
                var dmg = -5
                break;
              case 7:
                var dmg = -5
                break;
              case 8:
                var dmg = -5
                break;
              case 9:
                var dmg = -6
                break;
            }
          }  
          break;
        default:
          dsMsg.guildMsg(guild, `I'm not familiar with this button. Please tag PMass to fix this`, message.channel.id, 10);
          console.log("ERROR: unrecognized button")
      }

  });
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

