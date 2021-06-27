const mongo = require('./mongo')
const userInfoSchema = require('./schemas/user-info-schema')
const onDutySchema = require('./schemas/on-duty-schema')
const guildInfoSchema = require('./schemas/guild-info-schema')
const clockFunctions = require('./functions-clock')

// Find a user's discord tag and hours worked by their hex id and department on the User Database
  module.exports.user = async (hexID, department) => {
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running getUser()')
        const result = await userInfoSchema.findOne({
          hexID,
          department,     
        })
        let userID = 0
        let time = 0
        let cadet = false
        let doc = false
        if (result) {
          userID = result.userID
          time = result.time
          cadet = result.cadet
          doc = result.doc
          noMatch = false
        } else {
          console.log('No User Found')
          noMatch = true
        }
        return [
          userID,
          time,
          cadet,
          doc,
          noMatch
        ];
      } finally {
        mongoose.connection.close()
      }
    })
  }

// Find a users current status hours worked by their user ID and department on the On Duty Database
  module.exports.status = async (userID, department) => {
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running getStatus()')
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
        console.log('Running getTime()')
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
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running getGuildInfo()')
        const result = await guildInfoSchema.findOne({
          guildID,     
        })
        let channels = {};
        if (result) {
          channels = result.channels;
        } else {
          console.log('No Server Found');
        }
        return channels;
      } finally {
        mongoose.connection.close()
      }
    })
  } // const [ clockID, errorID, logID, spamID ] = await management.getGuildInfo(guildID)

// Find a the guilds discord roles for clocked on and in queue from the Guild database
  module.exports.guildRoles = async (guildID) => {
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running getGuildRoles()')
        const result = await guildInfoSchema.findOne({
          guildID,
        })
        let roles = {};
        if (result) {
          roles = result.roles
        } else {
          console.log('No User Found')
        }
        return roles;
      } finally {
        mongoose.connection.close()
      }
    })
  }

// Find all users who are of a current status on the On Duty Database
  module.exports.usersOn = async (status) => {
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running getUsersOnDuty()')
        const result = await onDutySchema.find({
          status,
        })
        console.log(result)
        console.log(result.length)
        console.log(result[0].userID)
        return result
      } finally {
        mongoose.connection.close()
      }
    })
  }

