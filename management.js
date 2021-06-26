const mongo = require('./mongo')
const userInfoSchema = require('./schemas/user-info-schema')
const clockLogSchema = require('./schemas/clock-log-schema')
const onDutySchema = require('./schemas/on-duty-schema')
const guildInfoSchema = require('./schemas/guild-info-schema')
const officersOnSchema = require('./schemas/officers-on-schema')
const cadetsOnSchema = require('./schemas/cadets-on-schema')
const docOnSchema = require('./schemas/doc-on-schema')

module.exports = (client) => {}

// Add a server to the Guild Database
  module.exports.setup = async (guildID, botID, dutyID, queueID, clockID, logID, errorID, spamID) => {
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running setup()')
        var embOn = ""
        var embQueue = ""
        var embDOC = ""    
        const result = await guildInfoSchema.findOneAndUpdate(
          {
            guildID,
          },
          {
            guildID,
            botID,
            dutyID,
            queueID,
            clockID,
            logID,
            errorID,
            spamID,
            embOn,
            embQueue,
            embDOC,
          },
          {
            upsert: true,
            new: true,
          }
        )
        return
      } finally {
        mongoose.connection.close()
      }
    })
  }

// Add a server to the Guild Database
  module.exports.start = async (guildID, embOn, embQueue, embDOC) => {
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running setup()')
        const result = await guildInfoSchema.findOneAndUpdate(
          {
            guildID,
          },
          {
            guildID,
            embOn,
            embQueue,
            embDOC,
          },
          {
            upsert: true,
            new: true,
          }
        )
        return
      } finally {
        mongoose.connection.close()
      }
    })
  }

// Add user to User Database
  module.exports.addUser = async (guildID, userID, department, hexID, hired, name, time) => {
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running addUser()')
        const result = await userInfoSchema.findOneAndUpdate(
          {
            userID,
            guildID,
          },
          {
            userID,
            guildID,
            hexID,
            name,
            department,
            hired,
            time,
          },
          {
            upsert: true,
            new: true,
          }
        )
        return result.hexID
      } finally {
        mongoose.connection.close()
      }
    })
  }

// Log someone clocking on/off on the Log Database
  module.exports.logClock = async (department, hexID, time, name, status) => {
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running logClock()')
        await clockLogSchema.insertMany(
          {
            hexID,
            name,
            department,
            time,
            status,
          },    
        )
      } finally {
        mongoose.connection.close()
      }
    })
  }

// Add user to the proper on duty database for them
  module.exports.clockOn = async (guildID, userID, group) => {
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running clockOn()')
        switch (group) {
          case "officers":
            await officersOnSchema.insertMany(
              {
                guildID,
                userID,
              },  
            )
            break;
          case "cadets":
            await cadetsOnSchema.insertMany(
              {
                guildID,
                userID,
              },  
            )
            break;
          case "doc":
            await docOnSchema.insertMany(
              {
                guildID,
                userID,
              },  
            )
            break;
          default:
            console.log("ERROR: No group Specified")
        }
      } finally {
        mongoose.connection.close()
      }
    })
  }

// Log someone clocking on/off on the Log Database
  module.exports.clockOff = async (guildID, userID, group) => {
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running clockOn()')
        switch (group) {
          case "officers":
            await officersOnSchema.findOneAndDelete(
              {
                guildID,
                userID,
              },  
            )
            break;
          case "cadets":
            await cadetsOnSchema.findOneAndDelete(
              {
                guildID,
                userID,
              },  
            )
            break;
          case "doc":
            await docOnSchema.findOneAndDelete(
              {
                guildID,
                userID,
              },  
            )
            break;
          default:
            console.log("ERROR: No group Specified")
        }
      } finally {
        mongoose.connection.close()
      }
    })
  }
