const mongo = require('./mongo')
const userInfoSchema = require('./schemas/user-info-schema')
const clockLogSchema = require('./schemas/clock-log-schema')
const onDutySchema = require('./schemas/on-duty-schema')
const guildInfoSchema = require('./schemas/guild-info-schema')
const officersOnSchema = require('./schemas/officers-on-schema')
const cadetsOnSchema = require('./schemas/cadets-on-schema')
const docOnSchema = require('./schemas/doc-on-schema')

// Update status on the Duty Clock Database
  module.exports.status = async (userID, department, time, status) => {
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
  module.exports.time = async (userID, department, time) => {
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
