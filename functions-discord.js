const Discord = require('discord.js');
const dbGet = require('./dbGet')

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

// Get information on a user that user is
  module.exports.getRoles = async (guild, userID) => {
    try {
      const member = await guild.members.fetch(userID);
      const allRoles = member.roles.cache
      const roles = []
      allRoles.forEach(allRoles => roles.push(allRoles.id)); 
      const [rolesGroups, rolesCerts, rolesRanks] = await dbGet.guildRoles(guild.id)
      const groupsValues = Object.values(rolesGroups) // Pull the ID and name of each Group Role/certs/ranks
      const certsValues = Object.values(rolesCerts)
      const ranksValues = Object.values(rolesRanks) 
      var groupName = [] // Create a blank array for the groups/certs/rank of the user
      var certName = []
      var rank = []
      for (let i = 0; i < roles.length; i++) { //Go through each role and see if the ID matches any of the IDs of other arrays
        groupName.push(checkVariables(groupsValues, roles, i))
        certName.push(checkVariables(certsValues, roles, i))
        rank.push(checkVariables(ranksValues, roles, i))
      }
      groupName = groupName.filter(x => x !== undefined); //Filter out each array for undefiend values
      certName = certName.filter(x => x !== undefined);
      rank = rank.filter(x => x !== undefined);
      console.log(groupName, certName, rank)
      return [groupName, certName, rank]
    } catch (err){
      console.error(err)
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
      const on = {};
      const inQueue = {};
      const LSCadet = {};
      const BCCadet = {};
      const DOC = {};
      on.id = cache.find(role => role.name === "Clocked In").id;
      on.name = cache.find(role => role.name === "Clocked In").name;
      inQueue.id = cache.find(role => role.name === "In Queue").id;
      inQueue.name = cache.find(role => role.name === "In Queue").name;
      LSCadet.id = cache.find(role => role.name === "LSPD Cadet").id;
      LSCadet.name = cache.find(role => role.name === "LSPD Cadet").name;
      BCCadet.id = cache.find(role => role.name === "BCSO Cadet").id;
      BCCadet.name = cache.find(role => role.name === "BCSO Cadet").name;
      DOC.id = cache.find(role => role.name === "Department Of Corrections").id;
      DOC.name = cache.find(role => role.name === "Department Of Corrections").name;  
      rolesGroups.on = on;
      rolesGroups.inQueue = inQueue;
      rolesGroups.LSCadet = LSCadet;
      rolesGroups.BCCadet = BCCadet;
      rolesGroups.DOC = DOC;
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
      const FTO = {};
      const AR = {};
      const ASU = {};
      const CAR1 = {};
      const CAR2 = {};
      const CAR3 = {};
      const Bike = {};
      const SWAT = {};
      const K9 = {};
      const SADOC = {};
      const DOCFTO = {};
      const DOCK9 = {};
      const CERT = {};
      const ICU = {};
      const CMU = {};
      const DOCAR = {};
      FTO.id = cache.find(role => role.name === "Field Training Officer").id;
      FTO.name = cache.find(role => role.name === "Field Training Officer").name;
      AR.id = cache.find(role => role.name === "AR Certified").id;
      AR.name = cache.find(role => role.name === "AR Certified").name;
      ASU.id = cache.find(role => role.name === "ASU Certified").id;
      ASU.name = cache.find(role => role.name === "ASU Certified").name;
      CAR1.id = cache.find(role => role.name === "TEU CAR1 Certified").id;
      CAR1.name = cache.find(role => role.name === "TEU CAR1 Certified").name;
      CAR2.id = cache.find(role => role.name === "TEU CAR2 Certified").id;
      CAR2.name = cache.find(role => role.name === "TEU CAR2 Certified").name;
      CAR3.id = cache.find(role => role.name === "TEU CAR3 Certified").id;
      CAR3.name = cache.find(role => role.name === "TEU CAR3 Certified").name;
      Bike.id = cache.find(role => role.name === "TEU Bike Certified").id;
      Bike.name = cache.find(role => role.name === "TEU Bike Certified").name;
      SWAT.id = cache.find(role => role.name === "SWAT").id;
      SWAT.name = cache.find(role => role.name === "SWAT").name;
      K9.id = cache.find(role => role.name === "K9 Handler").id;
      K9.name = cache.find(role => role.name === "K9 Handler").name;
      SADOC.id = cache.find(role => role.name === "SADOC").id;
      SADOC.name = cache.find(role => role.name === "SADOC").name;
      DOCFTO.id = cache.find(role => role.name === "DOC FTO").id;
      DOCFTO.name = cache.find(role => role.name === "DOC FTO").name;
      DOCK9.id = cache.find(role => role.name === "DOC K-9 Handler").id;
      DOCK9.name = cache.find(role => role.name === "DOC K-9 Handler").name;
      CERT.id = cache.find(role => role.name === "CERT").id;
      CERT.name = cache.find(role => role.name === "CERT").name;
      ICU.id = cache.find(role => role.name === "ISU").id;
      ICU.name = cache.find(role => role.name === "ISU").name;
      CMU.id = cache.find(role => role.name === "CMU").id;
      CMU.name = cache.find(role => role.name === "CMU").name;
      DOCAR.id = cache.find(role => role.name === "DOC AR Certified").id;
      DOCAR.name = cache.find(role => role.name === "DOC AR Certified").name;
      rolesCerts.FTO = FTO;
      rolesCerts.AR = AR;
      rolesCerts.ASU = ASU;
      rolesCerts.CAR1 = CAR1;
      rolesCerts.CAR2 = CAR2;
      rolesCerts.CAR3 = CAR3;
      rolesCerts.Bike = Bike;
      rolesCerts.SWAT = SWAT;
      rolesCerts.K9 = K9;
      rolesCerts.SADOC = SADOC;
      rolesCerts.DOCFTO = DOCFTO;
      rolesCerts.DOCK9 = DOCK9;
      rolesCerts.CERT = CERT;
      rolesCerts.ICU = ICU;
      rolesCerts.CMU = CMU;
      rolesCerts.DOCAR = DOCAR;
      return rolesCerts
    } catch(err){
      console.error(err)
    }
  }

// Get Roles for ranks
  module.exports.getGuildRolesRank = async (guild) => {
    try {
      const cache = guild.roles.cache
      const rolesRanks = {};
      const chief = {};
      const astChief = {};
      const sheriff = {};
      const udrSheriff = {};
      const captin = {};
      const lt = {};
      const sgt = {};
      const srOfc = {};
      const srDpty = {};
      const ofc = {};
      const dpty = {};
      const prbOfc = {};
      const prbDpty = {};
      const cdtPh2 = {};
      const cdtPh1 = {};
      const warden = {};
      const dptyWarden = {};
      const crtnOfc = {};
      const rctPh2 = {};
      const rctPh1 = {};
      chief.id = cache.find(role => role.name === "Chief of Police").id;
      chief.name = cache.find(role => role.name === "Chief of Police").name;
      astChief.id = cache.find(role => role.name === "Assistant Chief").id;
      astChief.name = cache.find(role => role.name === "Assistant Chief").name;
      sheriff.id = cache.find(role => role.name === "Sheriff").id;
      sheriff.name = cache.find(role => role.name === "Sheriff").name;
      udrSheriff.id = cache.find(role => role.name === "Undersheriff").id;
      udrSheriff.name = cache.find(role => role.name === "Undersheriff").name;
      captin.id = cache.find(role => role.name === "SALE Captain").id;
      captin.name = cache.find(role => role.name === "SALE Captain").name;
      lt.id = cache.find(role => role.name === "SALE Lieutenant").id;
      lt.name = cache.find(role => role.name === "SALE Lieutenant").name;
      sgt.id = cache.find(role => role.name === "SALE Sergeant").id;
      sgt.name = cache.find(role => role.name === "SALE Sergeant").name;
      srOfc.id = cache.find(role => role.name === "Senior Officer").id;
      srOfc.name = cache.find(role => role.name === "Senior Officer").name;
      srDpty.id = cache.find(role => role.name === "Senior Deputy").id;
      srDpty.name = cache.find(role => role.name === "Senior Deputy").name;
      ofc.id = cache.find(role => role.name === "Officer").id;
      ofc.name = cache.find(role => role.name === "Officer").name;
      dpty.id = cache.find(role => role.name === "Deputy").id;
      dpty.name = cache.find(role => role.name === "Deputy").name;
      prbOfc.id = cache.find(role => role.name === "Probationary Officer").id;
      prbOfc.name = cache.find(role => role.name === "Probationary Officer").name;
      prbDpty.id = cache.find(role => role.name === "Probationary Deputy").id;
      prbDpty.name = cache.find(role => role.name === "Probationary Deputy").name;
      cdtPh2.id = cache.find(role => role.name === "Cadet Phase 2").id;
      cdtPh2.name = cache.find(role => role.name === "Cadet Phase 2").name;
      cdtPh1.id = cache.find(role => role.name === "Cadet Phase 1").id;
      cdtPh1.name = cache.find(role => role.name === "Cadet Phase 1").name;
      warden.id = cache.find(role => role.name === "Warden").id;
      warden.name = cache.find(role => role.name === "Warden").name;
      dptyWarden.id = cache.find(role => role.name === "Chief Deputy Warden").id;
      dptyWarden.name = cache.find(role => role.name === "Chief Deputy Warden").name;
      crtnOfc.id = cache.find(role => role.name === "Corrections Officer").id;
      crtnOfc.name = cache.find(role => role.name === "Corrections Officer").name;
      rctPh2.id = cache.find(role => role.name === "Recruit Phase 2").id;
      rctPh2.name = cache.find(role => role.name === "Recruit Phase 2").name;
      rctPh1.id = cache.find(role => role.name === "Recruit Phase 1").id;
      rctPh1.name = cache.find(role => role.name === "Recruit Phase 1").name;
      rolesRanks.cheif = chief;
      rolesRanks.astChief = astChief;
      rolesRanks.sheriff = sheriff;
      rolesRanks.udrSheriff = udrSheriff;
      rolesRanks.lt = lt;
      rolesRanks.sgt = sgt;
      rolesRanks.srOfc = srOfc;
      rolesRanks.srDpty = srDpty;
      rolesRanks.ofc = ofc;
      rolesRanks.dpty = dpty;
      rolesRanks.prbOfc = prbOfc;
      rolesRanks.prbDpty = prbDpty;
      rolesRanks.cdtPh2 = cdtPh2;
      rolesRanks.cdtPh1 = cdtPh1;
      rolesRanks.warden = warden;
      rolesRanks.dptyWarden = dptyWarden;
      rolesRanks.crtnOfc = crtnOfc;
      rolesRanks.rctPh2 = rctPh2;
      rolesRanks.rctPh1 = rctPh1;
      return rolesRanks
    } catch(err){
      console.error(err)
    }
  }

// Check for multiple departments
  module.exports.multiGroupCheck = async (message, groups) => {
    try {
      var department = ""
      if (groups.length > 1) {
        const filter = m => m.author.id === message.author.id
        await message.channel.send(`Multiple departments listed, which department are they in? \`BCSO\` / \`LSPD\` / \`SASP\` / \`DOC\` / \`DOJ\``)
        const newMsg = await message.channel.awaitMessages(filter, {
          max: 1,
          time: 30000,
          errors: ['time']
        })
        const responseMsg = newMsg.first()
        switch (responseMsg.content.toUpperCase()) {
          case "BSCO":
              department = "Blaine County Sheriff's Office"
              message.channel.send(`Logged as BCSO`)
            break;
          case "LSPD":
              department = "Los Santos Police Department"
              message.channel.send(`Logged as LSPD`)
            break;
          case "DOC":
              department = "Department Of Corrections"
              message.channel.send(`Logged as DOC`)
            break;
          case "SASP":
              department = "San Andreas State Police"
              message.channel.send(`Logged as SASP`)                  
            break;
          case "DOJ":
              department = "Department Of Justice"
              message.channel.send(`Logged as DOJ`)
            break;
          default:
            console.log(`Terminated: Invalid Response`)
            message.channel.send(`Invalid Response`)
        }
      } else {
        department = groups[0]
      }
      return department
    } catch(err){
      message.channel.send('Timeout');
      console.error(err)
    }
  }

// Check for multiple departments
  module.exports.response = async (message, text) => {
    try {
      const filter = m => m.author.id === message.author.id
      await message.channel.send(text)        
      const newMsg = await message.channel.awaitMessages(filter, {
        max: 1,
        time: 30000,
        errors: ['time']
      })
      const responseMsg = newMsg.first()
      const content = responseMsg.content
      return content
    } catch(err){
      message.channel.send('Timeout');
      console.error(err)
    }
  }

// Send a profile message for the user mentioned
  module.exports.sendProfileMessage = async (channel,userInfo,guildInfo) => {
    try {
      const embeds = {}
      console.log(userInfo.certs)
      certList = userInfo.certs
      certList.forEach(convertTFtoIcon);
      console.log(certList)
      if (userInfo.department == "Los Santos Police Department" || userInfo.department == "Blaine County Sheriff's Office" || userInfo.department == "San Andreas State Police" || userInfo.department == "Department Of Justice"){
      const profile = new Discord.MessageEmbed()
        .setColor(`#8b5900`)
        .setTitle(`${userInfo.callsign} - ${userInfo.name}`)
        .setAuthor(`${userInfo.rank} with ${userInfo.department}', 'https://i.imgur.com/Department.jpeg` )
        .setThumbnail(`${userInfo.photo}`)
        .addFields(
        { name: 'Phone Number', value: `${userInfo.pn}`, inline: true  },
        { name: 'Hired Date', value: `${userInfo.hired}`, inline: true  },
        { name: 'Last Promotion Date', value: `${userInfo.promo}`, inline: true  },
        { name: 'FTO', value: userInfo.certs[0], inline: true  },
        { name: 'AR', value: userInfo.certs[1], inline: true  },
        { name: 'ASU', value: userInfo.certs[2], inline: true  },
        { name: 'BIKE', value: userInfo.certs[6], inline: true  },
        { name: 'SWAT', value: userInfo.certs[7], inline: true  },
        { name: 'K9', value: userInfo.certs[8], inline: true  },
        { name: 'SADOC', value: userInfo.certs[9], inline: true  },
        { name: 'CAR1', value: userInfo.certs[3], inline: true  },
        { name: 'CAR2', value: userInfo.certs[4], inline: true  },
        { name: 'CAR3', value: userInfo.certs[5], inline: true  },
        )
        .setTimestamp()
        .setFooter(`${userInfo.region}`, 'https://i.imgur.com/Department.jpeg');
      } else { // Else if they work for DOC as they have seperate Certs
      const profile = new Discord.MessageEmbed()
        .setColor(`#bf3cf8`)
        .setTitle(`${userInfo.callsign} - ${userInfo.name}`)
        .setAuthor(`${userInfo.rank} with ${userInfo.department}', 'https://i.imgur.com/Department.jpeg` )
        .setThumbnail(`${userInfo.photo}`)
        .addFields(
        { name: 'Phone Number', value: `${userInfo.pn}`, inline: true  },
        { name: 'Hired Date', value: `${userInfo.hired}`, inline: true  },
        { name: 'Last Promotion Date', value: `${userInfo.promo}`, inline: true  },
        { name: 'FTO', value: userInfo.certs[10], inline: true  },
        { name: 'AR', value: userInfo.certs[14], inline: true  },
        { name: 'K9', value: userInfo.certs[11], inline: true  },
        { name: 'CERT', value: userInfo.certs[12], inline: true  },
        { name: 'ICU', value: userInfo.certs[13], inline: true  },
        )
        .setTimestamp()
        .setFooter(`${userInfo.region}`, 'https://i.imgur.com/Department.jpeg');
      }
      embeds.on = await channel.send(profile)
      return embeds
    } catch(err){
      console.error(err)
    }
  }

  module.exports.checkCerts = async (message, certs) => {
    try {
      const [rolesGroups, rolesCerts, rolesRanks] = await dbGet.guildRoles(message.guild.id)
      const certsValues = Object.values(rolesCerts);
      let allCerts = certsValues.map(o => o.name);
      userCerts = arrayMatchTF(allCerts,certs);      
      return userCerts
    } catch(err){
      console.error(err);
    }
  }


function checkVariables(values, roles, i){ // Take in a role ID and see if it matches any of the IDs in the provided array of values, if it does, return the name, otherwise return undefined
  const result = values.find( ({ id }) => id === roles[i] );
  if (result === undefined) {
  } else { 
    return result.name
  }
}

function arrayMatch(array1, array2){ // Input 2 arrays and compare to see how they are the same or different
  const onlyFirst =  array1.filter(x => !array2.includes(x)); // in 1 but not 2
  const both =  array1.filter(x => array2.includes(x)); // in both
  return [onlyFirst, both]
}

function arrayMatchTF(array1, array2){ // Input 2 arrays and compare to see how they are the same or different
  var tf = []
  for (let i = 0; i < array1.length; i++) {
    tf.push( array2.includes(array1[i]))
  }
  return tf
}

function convertTFtoIcon(item, index, arr){ // Input 2 arrays and compare to see how they are the same or different
  if(item){
    arr[index] = "✅"
  } else {
    arr[index] = "❌"
  }
  return arr
}
