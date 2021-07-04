const Discord = require('discord.js');

// Give Role by ID
  module.exports.giveRole = (guild, userID, role) => {
  	try {
   		guild.members.fetch(userID).then(member => { 
   			member.roles.add(role);
   		});
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
