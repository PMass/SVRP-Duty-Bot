const Discord = require('discord.js');
const dbGet = require('./dbGet')
const dsMsg = require('./dsMsg')

// Get information on a user based on their roles
  module.exports.getRoles = async (guild, userID) => {
    console.log('Running getRoles()')
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
      return [groupName, certName, rank]
    } catch (err){
      console.error(err)
    }
  }

// Determine which department a user is in based on their Roles
  module.exports.getDprt = async (guild, userID) => {
    console.log('Running getDprt()')
    try {
      const member = await guild.members.fetch(userID);
      const allRoles = member.roles.cache
      const roles = []
      allRoles.forEach(allRoles => roles.push(allRoles.id)); 
      const [rolesGroups, rolesCerts, rolesRanks] = await dbGet.guildRoles(guild.id)
      const groupsValues = Object.values(rolesGroups) // Pull the ID and name of each Group Role/certs/ranks
      var groupName = [] // Create a blank array for the groups/certs/rank of the user
      for (let i = 0; i < roles.length; i++) { //Go through each role and see if the ID matches any of the IDs of other arrays
        groupName.push(checkVariables(groupsValues, roles, i))
      }
      groupName = groupName.filter(x => x !== undefined); //Filter out each array for undefiend values
      return groupName
    } catch (err){
      console.error(err)
    }
  }

// Determine which Rank a user is in based on their Roles
  module.exports.getRank = async (guild, userID) => {
    console.log('Running getRank()')
    try {
      const member = await guild.members.fetch(userID);
      const allRoles = member.roles.cache
      const roles = []
      allRoles.forEach(allRoles => roles.push(allRoles.id)); 
      const [rolesGroups, rolesCerts, rolesRanks] = await dbGet.guildRoles(guild.id)
      const ranksValues = Object.values(rolesRanks)
      var rank = []
      for (let i = 0; i < roles.length; i++) { //Go through each role and see if the ID matches any of the IDs of other arrays
        rank.push(checkVariables(ranksValues, roles, i))
      }
      rank = rank.filter(x => x !== undefined);
      return rank
    } catch (err){
      console.error(err)
    }
  } 

// Determine which certs a user has in based on their Roles
  module.exports.getCerts = async (guild, userID) => {
    console.log('Running getCerts()')
    try {
      const member = await guild.members.fetch(userID);
      const allRoles = member.roles.cache
      const roles = []
      allRoles.forEach(allRoles => roles.push(allRoles.id)); 
      const [rolesGroups, rolesCerts, rolesRanks] = await dbGet.guildRoles(guild.id)
      const certsValues = Object.values(rolesCerts)
      var certName = []
      for (let i = 0; i < roles.length; i++) { //Go through each role and see if the ID matches any of the IDs of other arrays
        certName.push(checkVariables(certsValues, roles, i))
      }
      certName = certName.filter(x => x !== undefined);
      return certName
    } catch (err){
      console.error(err)
    }
  }

// Get Roles for main groups (on duty, in queue, recruit, doc)
  module.exports.getGuildRolesGroup = async (guild) => {
    console.log('Running getGuildRolesGroup()')
    try {
      const rolesGroups = {};
      const cache = guild.roles.cache
      const on = {};
      const inQueue = {};
      const cadetPh2 = {};
      const cadetPh1 = {};
      const LSPD = {};
      const BCSO = {};
      const SASP = {};
      const DOJ = {};      
      const DOC = {};
      on.id = cache.find(role => role.name === "Clocked In").id;
      on.name = cache.find(role => role.name === "Clocked In").name;
      inQueue.id = cache.find(role => role.name === "In Queue").id;
      inQueue.name = cache.find(role => role.name === "In Queue").name;
      cadetPh2.id = cache.find(role => role.name === "Cadet Phase 2").id;
      cadetPh2.name = cache.find(role => role.name === "Cadet Phase 2").name;
      cadetPh1.id = cache.find(role => role.name === "Cadet Phase 1").id;
      cadetPh1.name = cache.find(role => role.name === "Cadet Phase 1").name;
      LSPD.id = cache.find(role => role.name === "Los Santos Police Department").id;
      LSPD.name = cache.find(role => role.name === "Los Santos Police Department").name;
      BCSO.id = cache.find(role => role.name === "Blaine County Sheriff's Office").id;
      BCSO.name = cache.find(role => role.name === "Blaine County Sheriff's Office").name;
      SASP.id = cache.find(role => role.name === "San Andreas State Police").id;
      SASP.name = cache.find(role => role.name === "San Andreas State Police").name;
      DOJ.id = cache.find(role => role.name === "Department Of Justice").id;
      DOJ.name = cache.find(role => role.name === "Department Of Justice").name;
      DOC.id = cache.find(role => role.name === "Department Of Corrections").id;
      DOC.name = cache.find(role => role.name === "Department Of Corrections").name;
      rolesGroups.on = on;
      rolesGroups.inQueue = inQueue;
      rolesGroups.cadetPh2 = cadetPh2;
      rolesGroups.cadetPh1 = cadetPh1;
      rolesGroups.LSPD = LSPD;
      rolesGroups.BCSO = BCSO;
      rolesGroups.SASP = SASP;
      rolesGroups.DOJ = DOJ;
      rolesGroups.DOC = DOC;
      return rolesGroups
    } catch(err){
      console.error(err)
    }
  }

// Get Roles for certs (FTO, K9, CMU)
  module.exports.getGuildRolesCert = async (guild) => {
    console.log('Running getGuildRolesCert()')
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
    console.log('Running getGuildRolesRank()')
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
    console.log('Running multiGroupCheck()')
    try {
      var department = ""
      if (groups.length > 1) {
        response = await dsMsg.response(message, `Multiple departments listed, which department are they in? \`BCSO\` / \`LSPD\` / \`SASP\` / \`DOC\` / \`DOJ\``);
        switch (response) {
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

// Check their certs that the user has and return a T/F array of what certs match
  module.exports.checkCerts = async (guild, certs) => {
    console.log('Running checkCerts()')
    try {
      const [rolesGroups, rolesCerts, rolesRanks] = await dbGet.guildRoles(guild.id)
      const certsValues = Object.values(rolesCerts);
      let allCerts = certsValues.map(o => o.name);
      userCerts = arrayMatch(allCerts,certs); //Run the Array matching function    
      return userCerts
    } catch(err){
      console.error(err);
    }
  }

//Internaul function to check variables role IDs aginst a role id array and see matching ones and return the name of the at one
  function checkVariables(values, roles, i){ // Take in a role ID and see if it matches any of the IDs in the provided array of values, if it does, return the name, otherwise return undefined
    const result = values.find( ({ id }) => id === roles[i] );
    if (result === undefined) {
    } else { 
      return result.name
    }
  }

// Internaul function to input 2 arrays and output a T/F array of the size of array 1 where True vales are values that are in both array
  function arrayMatch(array1, array2){ 
    var output = []
    for (let i = 0; i < array1.length; i++) {
      output.push(array2.includes(array1[i]))
    }
    return output
  }

