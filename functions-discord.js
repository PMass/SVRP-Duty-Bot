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

module.exports.getGuildRolesGroup = async (guild) => {
  try {
    let roleCadet = message.guild.roles.cache.find(role => role.name === "Rolename");
    let roleDOC = message.guild.roles.cache.find(role => role.name === "Rolename");
    // let roleCadet = message.guild.roles.cache.find(role => role.name === "Rolename");    
    return [embOn, embQueue, embDOC]
  } catch(err){
    console.error(err)
  }
}

module.exports.getGuildRolesCert = async (guild) => {
  try {
    let roleFTO = message.guild.roles.cache.find(role => role.name === "Rolename");
    let roleAR = message.guild.roles.cache.find(role => role.name === "Rolename");
    let roleASU = message.guild.roles.cache.find(role => role.name === "Rolename");
    let roleMustang = message.guild.roles.cache.find(role => role.name === "Rolename");
    let roleBike = message.guild.roles.cache.find(role => role.name === "Rolename");
    let roleSWAT = message.guild.roles.cache.find(role => role.name === "Rolename");
    let roleK9 = message.guild.roles.cache.find(role => role.name === "Rolename");
    let roleCERT = message.guild.roles.cache.find(role => role.name === "Rolename");
    let roleICU = message.guild.roles.cache.find(role => role.name === "Rolename");
    let roleCMU = message.guild.roles.cache.find(role => role.name === "Rolename");
    return [embOn, embQueue, embDOC]
  } catch(err){
    console.error(err)
  }
}

module.exports.getGuildRolesRank = async (guild) => {
  try {
    const cache = guild.roles.cache
    let roleChief = cache.find(role => role.name === "Chief of Police");
    let roleAstChief = cache.find(role => role.name === "Assistant Chief");
    let roleSheriff = cache.find(role => role.name === "Sheriff");
    let roleUdrSheriff = cache.find(role => role.name === "Undersheriff");
    let roleCaptin = cache.find(role => role.name === "S.A.L.E Captain");
    let roleLt = cache.find(role => role.name === "S.A.L.E Lieutenant");
    let roleSgt = cache.find(role => role.name === "S.A.L.E Sergeant");
    let roleSrOfc = cache.find(role => role.name === "Senior Officer");
    let roleSrDpty = cache.find(role => role.name === "Senior Deputy");
    let roleOfc = cache.find(role => role.name === "Officer");
    let roleDpty = cache.find(role => role.name === "Deputy");
    let rolePrbOfc = cache.find(role => role.name === "Probationary Officer");
    let rolePrbDpty = cache.find(role => role.name === "Probationary Deputy");
    let roleCdtPh2 = cache.find(role => role.name === "Cadet Phase 2");
    let roleCdtPh1 = cache.find(role => role.name === "Cadet Phase 1");
    let roleWarden = cache.find(role => role.name === "Warden");
    let roleDptyWarden = cache.find(role => role.name === "Chief Deputy Warden");
    let roleCrtnOfc = cache.find(role => role.name === "Corrections Officer");
    let roleRctPh2 = cache.find(role => role.name === "Recruit Phase 2");
    let roleRctPh1 = cache.find(role => role.name === "Recruit Phase 1");
    console.log(roleChief, roleAstChief, roleSheriff, roleUdrSheriff, 
    roleCaptin, roleLt, roleSgt, roleSrOfc,
    roleSrDpty, roleOfc, roleDpty, rolePrbOfc,
    rolePrbDpty, roleCdtPh2, roleCdtPh1, roleWarden,
    roleDptyWarden, roleCrtnOfc, roleRctPh2, roleCdtPh2)
    return [
    roleChief, roleAstChief, roleSheriff, roleUdrSheriff, 
    roleCaptin, roleLt, roleSgt, roleSrOfc,
    roleSrDpty, roleOfc, roleDpty, rolePrbOfc,
    rolePrbDpty, roleCdtPh2, roleCdtPh1, roleWarden,
    roleDptyWarden, roleCrtnOfc, roleRctPh2, roleCdtPh2
    ]
  } catch(err){
    console.error(err)
  }
}