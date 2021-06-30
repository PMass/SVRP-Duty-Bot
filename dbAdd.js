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

// Log the embeded messages to the guilds database
  module.exports.start = async (guildID, embeds) => {
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running start()')
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
  module.exports.addUser = async (guildID, userInfo, certs, rank) => {
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running addUser()')
        const userID = userInfo.ID      
        const department = userInfo.department
        const hexID = userInfo.hexid
        const hired = userInfo.hired
        const name = userInfo.name
        const badge = userInfo.badge
        const phone = userInfo.phone
        const photo = userInfo.photo
        const region = userInfo.region
        const color = userInfo.color
        const rank = userInfo.rank
        const time = userInfo.time
        const cadet = userInfo.cadet
        const doc = userInfo.doc
        const strikes = 0
        const title = ""
        const other1 = ""
        const other2 = ""

        const result = await userInfoSchema.findOneAndUpdate(
          {
            guildID,
            userID,
          },
          {
            guildID,
            userID,
            hexID,
            name,
            department,
            hired,
            time,
            cadet,
            doc,
            rank,
            badge,
            phone,
            region,
            strikes,
            photo,
            certs,
            color,
            title,
            other1,
            other2,
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

