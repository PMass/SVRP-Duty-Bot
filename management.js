const mongo = require('./mongo')
const userInfoSchema = require('./schemas/user-info-schema')
const clockLogSchema = require('./schemas/clock-log-schema')
const onDutySchema = require('./schemas/on-duty-schema')
const guildInfoSchema = require('./schemas/guild-info-schema')
const officersOnSchema = require('./schemas/officers-on-schema')
const cadetsOnSchema = require('./schemas/cadets-on-schema')
const docOnSchema = require('./schemas/doc-on-schema')

const clockFunctions = require('./functions-clock')

module.exports = (client) => {}

// Add a server to the Guild Info Database
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

// Add a server to the Guild Info Database
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

// Add user to Main Database
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

// Log someone clocking on/off on the Log Database
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

// Log someone clocking on/off on the Log Database
  module.exports.clockOn = async (department, hexID, time, name, status) => {
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running logClock()')
        const result = await clockLogSchema.insertMany(
          {
            guildID,
            userID,
          },    
        )
      } finally {
        mongoose.connection.close()
      }
    })
  }

// Update status on the Duty Clock Database
  module.exports.onDuty = async (userID, department, time, status) => {
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running onDuty')

        const result = await onDutySchema.findOneAndUpdate(
          {
            userID,
            department,
          },
          {
            userID,
            department,
            time,
            status,
          },
          {
            upsert: true,
            new: true,
          }
        )
        return result.userID
      } finally {
        mongoose.connection.close()
      }
    })
  }

// Update Hours on Main Database
  module.exports.updateHours = async (userID, department, time) => {
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running updateStatus')

        const result = await userInfoSchema.findOneAndUpdate(
          {
            userID,
            department,
          },
          {
            time,
          },
          {
            upsert: false,
            new: true,
          }
        )
        return result.status
      } finally {
        mongoose.connection.close()
      }
    })
  }

// Find a user's discord tag and hours worked by their hex id and department on the main Database
  module.exports.getUser = async (hexID, department) => {
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running getUser()')
        const result = await userInfoSchema.findOne({
          hexID,
          department,     
        })
        let userID = 0
        let time = 0
        if (result) {
          userID = result.userID
          time = result.time
          noMatch = false
        } else {
          console.log('No User Found')
          noMatch = true
        }
        return [
          userID,
          time,
          noMatch
        ];
      } finally {
        mongoose.connection.close()
      }
    })
  }

// Find a users total hours worked by their user ID and department on the Duty Clock Database
  module.exports.getStatus = async (userID, department) => {
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

// Find a users total hours worked by their user ID and department on the Duty Clock Database
  module.exports.getTime = async (userID, department, time) => {
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

// Find the guild channels for the clock, error, log and spam on the Guild Info Database
  module.exports.getGuildInfo = async (guildID) => {
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running getGuildInfo()')
        const result = await guildInfoSchema.findOne({
          guildID,     
        })
        let clockID = 0;
        let errorID = 0;
        let logID = 0;
        let spamID = 0;
        if (result) {
          clockID = result.clockID;
          errorID = result.errorID;
          logID = result.logID;
          spamID = result.spamID;
        } else {
          console.log('No Server Found');
        }
        return [
          clockID,
          errorID,
          logID,
          spamID
        ];
      } finally {
        mongoose.connection.close()
      }
    })
  } // const [ clockID, errorID, logID, spamID ] = await management.getGuildInfo(guildID)

// Find a user's discord tag and hours worked by their hex id and department on the main Database
  module.exports.getGuildRoles = async (guildID) => {
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running getGuildRoles()')
        const result = await guildInfoSchema.findOne({
          guildID,
        })
        let dutyID = ""
        let queueID = ""
        if (result) {
          dutyID = result.dutyID
          queueID = result.queueID
        } else {
          console.log('No User Found')
        }
        return [
          dutyID,
          queueID
        ];
      } finally {
        mongoose.connection.close()
      }
    })
  }

// Find a users total hours worked by their user ID and department on the Duty Clock Database
  module.exports.getUsersOnDuty = async (status) => {
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

