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

// Get Roles for main groups (on duty, in queue, recruit, doc)
  module.exports.getGuildRolesGroup = async (guild) => {
    try {
      const rolesGroups = {};
      const cache = guild.roles.cache
      rolesGroups.on = cache.find(role => role.name === "Clocked In").id;
      rolesGroups.inQueue = cache.find(role => role.name === "In Queue").id;
      rolesGroups.LSCadet = cache.find(role => role.name === "LSPD Cadet").id;
      rolesGroups.BCCadet = cache.find(role => role.name === "BCSO Cadet").id;
      rolesGroups.DOC = cache.find(role => role.name === "Department Of Corrections").id;  
      return rolesGroups
    } catch(err){
      console.error(err)
    }
  }

// Get Roles for certs (FTO, K9, CMU)
  module.exports.getGuildRolesCert = async (guild) => {
    try {
      const rolesCerts = {};
      const cache = guild.roles.cache
      rolesCerts.FTO = cache.find(role => role.name === "Field Training Officer").id;
      rolesCerts.AR = cache.find(role => role.name === "A.R. Certified").id;
      rolesCerts.ASU = cache.find(role => role.name === "A.S.U. Certified").id;
      rolesCerts.Mustang = cache.find(role => role.name === "T.E.U. Mustang Certified").id;
      rolesCerts.Bike = cache.find(role => role.name === "T.E.U. Bike Certified").id;
      rolesCerts.SWAT = cache.find(role => role.name === "S.W.A.T.").id;
      rolesCerts.K9 = cache.find(role => role.name === "K9 Handler").id;
      rolesCerts.DOCFTO = cache.find(role => role.name === "DOC F.T.O.").id;
      rolesCerts.DOCK9 = cache.find(role => role.name === "DOC K-9 Handler").id;
      rolesCerts.CERT = cache.find(role => role.name === "C.E.R.T.").id;
      rolesCerts.ICU = cache.find(role => role.name === "I.S.U.").id;
      rolesCerts.CMU = cache.find(role => role.name === "C.M.U.").id;
      rolesCerts.DOCAR = cache.find(role => role.name === "DOC A.R. Certified").id;
      return rolesCerts
    } catch(err){
      console.error(err)
    }
  }

// Get Roles for ranks
  module.exports.getGuildRolesRank = async (guild) => {
    try {
      const rolesRanks = {};
      const cache = guild.roles.cache
      rolesRanks.chief = cache.find(role => role.name === "Chief of Police").id;
      rolesRanks.astChief = cache.find(role => role.name === "Assistant Chief").id;
      rolesRanks.sheriff = cache.find(role => role.name === "Sheriff").id;
      rolesRanks.udrSheriff = cache.find(role => role.name === "Undersheriff").id;
      rolesRanks.captin = cache.find(role => role.name === "S.A.L.E Captain").id;
      rolesRanks.lt = cache.find(role => role.name === "S.A.L.E Lieutenant").id;
      rolesRanks.sgt = cache.find(role => role.name === "S.A.L.E Sergeant").id;
      rolesRanks.srOfc = cache.find(role => role.name === "Senior Officer").id;
      rolesRanks.srDpty = cache.find(role => role.name === "Senior Deputy").id;
      rolesRanks.ofc = cache.find(role => role.name === "Officer").id;
      rolesRanks.dpty = cache.find(role => role.name === "Deputy").id;
      rolesRanks.prbOfc = cache.find(role => role.name === "Probationary Officer").id;
      rolesRanks.prbDpty = cache.find(role => role.name === "Probationary Deputy").id;
      rolesRanks.cdtPh2 = cache.find(role => role.name === "Cadet Phase 2").id;
      rolesRanks.cdtPh1 = cache.find(role => role.name === "Cadet Phase 1").id;
      rolesRanks.warden = cache.find(role => role.name === "Warden").id;
      rolesRanks.dptyWarden = cache.find(role => role.name === "Chief Deputy Warden").id;
      rolesRanks.crtnOfc = cache.find(role => role.name === "Corrections Officer").id;
      rolesRanks.rctPh2 = cache.find(role => role.name === "Recruit Phase 2").id;
      rolesRanks.rctPh1 = cache.find(role => role.name === "Recruit Phase 1").id;
      return rolesRanks
    } catch(err){
      console.error(err)
    }
  }