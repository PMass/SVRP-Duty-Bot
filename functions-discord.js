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
    let chief = cache.find(role => role.name === "Chief of Police").id;
    let astChief = cache.find(role => role.name === "Assistant Chief").id;
    let sheriff = cache.find(role => role.name === "Sheriff").id;
    let udrSheriff = cache.find(role => role.name === "Undersheriff").id;
    let captin = cache.find(role => role.name === "S.A.L.E Captain").id;
    let lt = cache.find(role => role.name === "S.A.L.E Lieutenant").id;
    let sgt = cache.find(role => role.name === "S.A.L.E Sergeant").id;
    let srOfc = cache.find(role => role.name === "Senior Officer").id;
    let srDpty = cache.find(role => role.name === "Senior Deputy").id;
    let ofc = cache.find(role => role.name === "Officer").id;
    let dpty = cache.find(role => role.name === "Deputy").id;
    let prbOfc = cache.find(role => role.name === "Probationary Officer").id;
    let prbDpty = cache.find(role => role.name === "Probationary Deputy").id;
    let cdtPh2 = cache.find(role => role.name === "Cadet Phase 2").id;
    let cdtPh1 = cache.find(role => role.name === "Cadet Phase 1").id;
    let warden = cache.find(role => role.name === "Warden").id;
    let dptyWarden = cache.find(role => role.name === "Chief Deputy Warden").id;
    let crtnOfc = cache.find(role => role.name === "Corrections Officer").id;
    let rctPh2 = cache.find(role => role.name === "Recruit Phase 2").id;
    let rctPh1 = cache.find(role => role.name === "Recruit Phase 1").id;

    console.log(chief, astChief, sheriff, udrSheriff, captin, lt, sgt, srOfc, srDpty, ofc, dpty,
    prbOfc, prbDpty, cdtPh2, cdtPh1, warden, dptyWarden, crtnOfc, rctPh2, rctPh1)
    return [
    chief, astChief, sheriff, udrSheriff, captin, lt, sgt, srOfc, srDpty, ofc, dpty,
    prbOfc, prbDpty, cdtPh2, cdtPh1, warden, dptyWarden, crtnOfc, rctPh2, rctPh1
    ]
  } catch(err){
    console.error(err)
  }
}