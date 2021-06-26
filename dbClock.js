const mongo = require('./mongo')
const clockLogSchema = require('./schemas/clock-log-schema')
const officersOnSchema = require('./schemas/officers-on-schema')
const cadetsOnSchema = require('./schemas/cadets-on-schema')
const docOnSchema = require('./schemas/doc-on-schema')

module.exports = (client) => {}

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
        const time = 0
        const code = 0
        const placeholder = 0
        console.log('Running clockOn()')
        switch (group) {
          case "officers":
            await officersOnSchema.insertMany(
              {
                guildID,
                userID,
                time,
                code,
                placeholder,
              },  
            )
            break;
          case "cadets":
            await cadetsOnSchema.insertMany(
              {
                guildID,
                userID,
                time,
                code,
                placeholder,
              },  
            )
            break;
          case "doc":
            await docOnSchema.insertMany(
              {
                guildID,
                userID,
                time,
                code,
                placeholder,
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
