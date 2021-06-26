const Discord = require('discord.js');
const management = require('./management')
const dbGet = require('./dbGet')

module.exports.giveRole = (guild,userID,role) => {
	try {
 		guild.members.fetch(userID).then(member => { 
 			member.roles.add(role);
 		});
	} catch {
    	console.log("error in giving user a role")
  }
}

module.exports.takeRole = (guild,userID,role) => {
	try {
 		guild.members.fetch(userID).then(member => {
 			member.roles.remove(role);
 		});
	} catch {
		console.log("error in removing a role from a user")
	}
}

module.exports.sendMessage = (channel, text, duration = -1) => {
  channel.send(text).then((message) => {
    if (duration === -1) {
      return
    }
    setTimeout(() => {
      message.delete()
    }, 1000 * duration)
  })
}

module.exports.sendGuildMessage = async (guild, text, msgType, duration = -1) => {
  try {
    const [ clockID, errorID, logID, spamID ] = await dbGet.guildInfo(guild.id)
    var ch = 0
    switch (msgType) {
      case "log":
        ch = guild.channels.cache.get(logID)
        break;
      case "clock":
        ch = guild.channels.cache.get(clockID)
        break;
      case "error":
        ch = guild.channels.cache.get(errorID)
        break;
      case "spam":
        ch = guild.channels.cache.get(spamID)
        break;
      default:
        ch = guild.channels.cache.get(msgType)
        console.log("ERROR: No channel specified for Guild Message")
    }
    const msg = await ch.send(text)
    if (duration === -1) {
      return
    }
    setTimeout(() => {
      msg.delete()
    }, 1000 * duration)
  } catch(err){
    console.error(err)
  }
}

module.exports.sendStartMessage = async (channel) => {
  try {
    const onDutyEmbed = new Discord.MessageEmbed()
      .setColor('#0b2e54')
      .setTitle('On duty List')
      .addFields(
      { name: 'Officers', value: 'None On Duty', inline: true  },
      { name: 'Cadets', value: 'None On Duty', inline: true  },
    );
    const queueEmbed = new Discord.MessageEmbed()
      .setColor('#ffca28')
      .setTitle('In Queue list')
      .addFields(
      { name: 'Officers', value: 'No Queue', inline: true  },
      { name: 'Cadets', value: 'No Queue', inline: true  },
    );
    const docEmbed = new Discord.MessageEmbed()
      .setColor('#9900ff')
      .setTitle('DOC On duty List')
      .addFields(
      { name: 'Officers', value: 'None On Duty', inline: true  },
      { name: 'Cadets', value: 'None On Duty', inline: true  },
    );  
    const embOn = await channel.send(onDutyEmbed)
    const embQueue = await channel.send(queueEmbed)
    const embDOC = await channel.send(docEmbed)
    return [embOn, embQueue, embDOC]
  } catch(err){
    console.error(err)
  }
}