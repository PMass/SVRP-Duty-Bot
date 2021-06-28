module.exports.findGroup = async (department, cadet, doc) => {
  try {
    if (cadet) {
      const group = cadets
    } else if (doc) {
      const group = doc
    } else {
      const group = officers
    }
    return group
  } catch(err){
    console.error(err)
  }
}

module.exports.getRank = async (rank) => {
  try {
    switch (rank) {
        case "chief":
          fullRank = "LSPD Chief of Police"
          break;
        case "astChief":
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
    return group
  } catch(err){
    console.error(err)
  }
}

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
