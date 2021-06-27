const Discord = require('discord.js');
const management = require('./management')
const dbGet = require('./dbGet')

// Give Role by ID
  module.exports.giveRole = (guild,userID,role) => {
  	try {
   		guild.members.fetch(userID).then(member => { 
   			member.roles.add(role);
   		});
  	} catch {
      	console.log("error in giving user a role")
    }
  }

// Take Role by ID
  module.exports.takeRole = (guild,userID,role) => {
  	try {
   		guild.members.fetch(userID).then(member => {
   			member.roles.remove(role);
   		});
  	} catch {
  		console.log("error in removing a role from a user")
  	}
  }

// Send message based on channel
  module.exports.sendGuildMessage = async (guild, text, msgType, duration = -1) => {
    try {
      const channels = await dbGet.guildChannels(guild.id)
      var ch = 0
      switch (msgType) {
        case "log":
          ch = guild.channels.cache.get(channels.log)
          break;
        case "clock":
          ch = guild.channels.cache.get(channels.clock)
          break;
        case "error":
          ch = guild.channels.cache.get(channels.error)
          break;
        case "spam":
          ch = guild.channels.cache.get(channels.spam)
          break;
        default:
          ch = guild.channels.cache.get(msgType)
          console.log("ERROR: No channel specified for Guild Message, using message channel")
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

// Send initial message
  module.exports.sendStartMessage = async (channel) => {
    try {
      const embeds = {}
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
      embeds.on = await channel.send(onDutyEmbed)
      embeds.queue = await channel.send(queueEmbed)
      embeds.DOC = await channel.send(docEmbed)
      return embeds
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
    const roles = {};
    const cache = guild.roles.cache
    roles.on = cache.find(role => role.name === "Clocked In").id;
    roles.inQueue = cache.find(role => role.name === "In Queue").id;
    roles.chief = cache.find(role => role.name === "Chief of Police").id;
    roles.astChief = cache.find(role => role.name === "Assistant Chief").id;
    roles.sheriff = cache.find(role => role.name === "Sheriff").id;
    roles.udrSheriff = cache.find(role => role.name === "Undersheriff").id;
    roles.captin = cache.find(role => role.name === "S.A.L.E Captain").id;
    roles.lt = cache.find(role => role.name === "S.A.L.E Lieutenant").id;
    roles.sgt = cache.find(role => role.name === "S.A.L.E Sergeant").id;
    roles.srOfc = cache.find(role => role.name === "Senior Officer").id;
    roles.srDpty = cache.find(role => role.name === "Senior Deputy").id;
    roles.ofc = cache.find(role => role.name === "Officer").id;
    roles.dpty = cache.find(role => role.name === "Deputy").id;
    roles.prbOfc = cache.find(role => role.name === "Probationary Officer").id;
    roles.prbDpty = cache.find(role => role.name === "Probationary Deputy").id;
    roles.cdtPh2 = cache.find(role => role.name === "Cadet Phase 2").id;
    roles.cdtPh1 = cache.find(role => role.name === "Cadet Phase 1").id;
    roles.warden = cache.find(role => role.name === "Warden").id;
    roles.dptyWarden = cache.find(role => role.name === "Chief Deputy Warden").id;
    roles.crtnOfc = cache.find(role => role.name === "Corrections Officer").id;
    roles.rctPh2 = cache.find(role => role.name === "Recruit Phase 2").id;
    roles.rctPh1 = cache.find(role => role.name === "Recruit Phase 1").id;
    return roles
  } catch(err){
    console.error(err)
  }
}