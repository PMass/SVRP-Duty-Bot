const Discord = require('discord.js');
const economy = require('./economy')

// Give Role by ID
  module.exports.setup = (guildID, userID, callType) => {
  	try {
      const items = await economy.getItems(guildID, userID)
      const health = await economy.getHealth(guildID, userID)
      const equipment = {}
      var dmgVal = 0
      var armorVal = 0
      for (let i = 0; i < items.length; i++) { //Go through each role and see if the ID matches any of the IDs of other arrays
        let name = Object.keys(items)[i]
        let amount = Object.values(items)[i]
        let taking = await dsMsg.response(message, `You have ${amount} ${name}(s). How many would you like to take?`);
        if(taking > 0){
          equipment[name] = taking
          let dmgVal = dmgVal + economy.getAttack(name)
          let armorVal = armorVal + economy.getDefence(name)
          items[name] = items[name] - taking
        }
      }
      await economy.giveItem(guildID, userID, items)
      await updtBattleDef(guildID, callType, health, dmgVal, armorVal)
  	} catch {
      	console.log("error in giving user a role")
    }
  }

// Take Role by ID
  module.exports.takeRole = (guild, userID, role) => {
  	try {
   		guild.members.fetch(userID).then(member => {
   			member.roles.remove(role);
   		});
  	} catch {
  		console.log("error in removing a role from a user")
  	}
  }

// Send a profile message for the user mentioned
  module.exports.updateNick = async (message,userInfo) => {
    console.log('Running updateNick()')
    try {
      var badge = userInfo.badge;
      var name = userInfo.name;
      const space = " "
      const period = "."
      badge = adget.concat(space)
      var newnick = badget.concat(name);
      var length = newnick.length;
      if(length<32){
        message.member.setNickname(length)     
      } else {
        var res = name.split(" ");
        var lastI = res[1].charAt(0)
        newnick = badget.concat(res[0].concat(space.concat(lastI.concat(period))));
      }
    } catch(err){
      console.error(err)
    }
  }


