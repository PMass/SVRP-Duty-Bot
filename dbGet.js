const mongo = require('./mongo')
const userInfoSchema = require('./schemas/user-info-schema')
const onDutySchema = require('./schemas/on-duty-schema')
const guildInfoSchema = require('./schemas/guild-info-schema')
const playersSchema = require('./schemas/players-schema')
const clockFunctions = require('./functions-clock')

const channelsCache = {} // { 'guildID': channels }

// Find a user's discord tag and hours worked by their hex id and department on the User Database
  module.exports.user = async (hexID) => {
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running user()')
        const result = await userInfoSchema.findOne({
          hexID,    
        })
        let userID = 0
        let time = 0
        let cadet = false
        let doc = false
        let department = ""
        if (result) {
          userID = result.userID
          time = result.time
          cadet = result.cadet
          doc = result.doc
          department = result.department
          noMatch = false
        } else {
          console.log('No User Found')
          noMatch = true
        }
        return [userID, time, cadet, doc, department, noMatch];
      } finally {
        mongoose.connection.close()
      }
    })
  }

// Find a users current status hours worked by their user ID and department on the On Duty Database
  module.exports.status = async (userID, department) => {
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running status()')
        const result = await onDutySchema.findOne({
          userID,
          department,
        })
        let currentStatus = 0
        if (result) {
          currentStatus = result.status
        } else {
          console.log('No User Found')  
        }
        return currentStatus
      } finally {
        mongoose.connection.close()
      }
    })
  }

// Find a users total hours worked by their user ID and department on the On Duty Database
  module.exports.time = async (userID, department, time) => {
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running time()')
        const result = await onDutySchema.findOne({
          userID,
          department,
        })
        let clockOffTime = 0
        if (result) {
          clockOffTime = result.time
        } else {
          console.log('No User Found')  
        }
        const offTime = Date.parse(clockOffTime)
        const onTime = Date.parse(time)
        const rawTime = (onTime - offTime)/60000;
        const workedTime = clockFunctions.timeConvert(rawTime)
        return workedTime
      } finally {
        mongoose.connection.close()
      }
    })
  }

// Find the guild channels for the clock, error, log and spam from the Guild database
  module.exports.guildChannels = async (guildID) => {
    const cachedValue = channelsCache[`${guildID}`]
    if (cachedValue) {
      return cachedValue
    }
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running guildChannels()')
        const result = await guildInfoSchema.findOne({
          guildID,     
        })
        let channels = {};
        if (result) {
          channels = result.channels;
        } else {
          console.log('No Server Found');
        }
        channelsCache[`${guildID}`] = channels
        return channels;
      } finally {
        mongoose.connection.close()
      }
    })
  }

// Find the guild channels for the clock, error, log and spam from the Guild database
  module.exports.guild = async (name) => {
    return await mongo().then(async (mongoose) => {
      try {
        switch (name) {
          case "police":
            ch = guild.channels.cache.get(channels.log)
            break;
          case "sheriff":
            ch = guild.channels.cache.get(channels.clock)
            break;
          case "ems":
            ch = guild.channels.cache.get(channels.error)
            break;
          case "spam":
            ch = guild.channels.cache.get(channels.spam)
            break;
          default:
            ch = guild.channels.cache.get(msgType)
            console.log("ERROR: No channel specified for Guild Message, using message channel")
      }
        console.log('Running guildChannels()')
        const result = await guildInfoSchema.findOne({
          name,
        })
        let guild = {};
        if (result) {
          guild = result.guild;
        } else {
          console.log('No Server Found');
        }
        return guild;
      } finally {
        mongoose.connection.close()
      }
    })
  }

// Find a the guilds discord roles for clocked on and in queue from the Guild database
  module.exports.guildRoles = async (guildID) => {
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running guildRoles()')
        const result = await guildInfoSchema.findOne({
          guildID,
        })
        let rolesGroups = {};
        let rolesCerts = {};
        let rolesRanks = {};
        if (result) {
          rolesGroups = result.groups
          rolesCerts = result.certs
          rolesRanks = result.ranks
        } else {
          console.log('No User Found')
        }
        return [rolesGroups, rolesCerts, rolesRanks];
      } finally {
        mongoose.connection.close()
      }
    })
  }

// Find all users who are of a current status on the On Duty Database
  module.exports.usersOn = async (status) => {
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running usersOn()')
        const result = await onDutySchema.find({
          status,
        })
        return result
      } finally {
        mongoose.connection.close()
      }
    })
  }

// Add user to User Database
  module.exports.userProfile = async (guildID, userID) => {
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running userProfile()')
        const userInfo = {}
        const result = await userInfoSchema.findOne(
          {
            guildID,
            userID,
          })
        if (result) {
          userInfo.userID = result.userID
          userInfo.department = result.department
          userInfo.hired = result.hired
          userInfo.name = result.name
          userInfo.badge = result.badge
          userInfo.phone = result.phone
          userInfo.photo = result.photo
          userInfo.region = result.region
          userInfo.color = result.color
          userInfo.rank = result.rank
          userInfo.time = result.time
          userInfo.cadet = result.cadet
          userInfo.doc = result.doc
          userInfo.certs = result.certs
          noMatch = false
        } else {
          console.log('No User Found')
          noMatch = true
        }
        return [
          userInfo,
          noMatch
        ];
      } finally {
        mongoose.connection.close()
      }
    })
  }

// Add user to User Database
  module.exports.userFull = async (guildID, userID) => {
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running userFull()')
        var userInfo = {}
        const result = await userInfoSchema.findOne(
          {
            guildID,
            userID,
          })
        if (result) {
          userInfo = result
          noMatch = false
        } else {
          console.log('No User Found')
          noMatch = true
        }
        return [
          userInfo,
          noMatch
        ];
      } finally {
        mongoose.connection.close()
      }
    })
  }

// Add user to User Database
  module.exports.userCerts = async (guildID, userID) => {
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running userCerts()')
        var certs = []
        const result = await userInfoSchema.findOne(
          {
            guildID,
            userID,
          })
        if (result) {
          certs = result.certs
          noMatch = false
        } else {
          console.log('No User Found')
          noMatch = true
        }
        return [ certs, noMatch ];
      } finally {
        mongoose.connection.close()
      }
    })
  }

// Add user to User Database
  module.exports.players = async (hex) => {
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running players()')
        const result = await playersSchema.find({
            hex,
          }) 
        // print a message if no documents were found
        let characters = []
        if (result.length === 0) {
          console.log("No users found!");
        } else {
          characters = result
        }
        // replace console.dir with your callback to access individual elements
        return characters;
      } finally {
        mongoose.connection.close()
      }
    })
  }

