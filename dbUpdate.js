const mongo = require('./mongo')
const userInfoSchema = require('./schemas/user-info-schema')
const onDutySchema = require('./schemas/on-duty-schema')

// Update status on the Duty Clock Database
  module.exports.status = async (userID, department, time, status) => {
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running status()')

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
      } finally {
        mongoose.connection.close()
      }
    })
  }

// Update Hours on Main Database
  module.exports.time = async (userID, department, time) => {
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running time()')

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
      } finally {
        mongoose.connection.close()
      }
    })
  }

// Update a piece of the users info 
  module.exports.userInfo = async (guildID, userInfo, certs) => {
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running userInfo()')
        const userID = userInfo.ID
        const photo = userInfo.photo
        const rank = userInfo.rank
        const badge = userInfo.badge
        const strikes = userInfo.strike
        const title = userInfo.title
        const other1 = userInfo.other1
        const other2 = userInfo.other2
        const result = await userInfoSchema.findOneAndUpdate(
          {
            guildID,
            userID,
          },
          {
          userID,
          photo,
          rank,
          badge,
          strikes,
          title,
          other1,
          other2,
          certs,
          },
          {
            upsert: false,
            new: true,
          }
        )
      } finally {
        mongoose.connection.close()
      }
    })
  }