const mongo = require('./mongo')
const userInfoSchema = require('./schemas/user-info-schema')
const guildInfoSchema = require('./schemas/guild-info-schema')


module.exports = (client) => {}

// Add a server to the Guild Database
  module.exports.setup = async (guildID, botID, groups, certs, ranks, channels) => {
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running setup()')
        const embeds = {}
        const result = await guildInfoSchema.findOneAndUpdate(
          {
            guildID,
          },
          {
            guildID,
            botID,
            groups,
            certs,
            ranks,
            channels,
            embeds,
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
  module.exports.start = async (guildID, embeds) => {
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running setup()')
        const result = await guildInfoSchema.findOneAndUpdate(
          {
            guildID,
          },
          {
            guildID,
            embeds,
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

