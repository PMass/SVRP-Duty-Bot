const management = require('../../management')
const fncDiscord = require('../../functions-discord')

module.exports = {
  commands: ['setup'],
  minArgs: 7,
  maxArgs: 7,
  expectedArgs: "<The bot's @> <The duty role's @> <The queue role's @> <The duty clock channel's #> <The Log channel's #> <The error channel's #> <The spam channel's #>",
  permissionError: 'You must be an admin to run this',
  permissions: 'ADMINISTRATOR',
  callback: async (message, arguments) => {
    message.delete({ timeout: 10000 })
    const guild = message.guild
  	const botID = message.mentions.users.first().id
      if (!botID) {
        message.reply('Please tag the bot.')
        return
      }
      const dutyID = message.mentions.roles.array()[1].id
      if (!dutyID) {
        message.reply('Please tag the role that will be used for on-duty.')
        return
      }
      const queueID = message.mentions.roles.array()[0].id
      if (!queueID) {
        message.reply('Please tag the role that will be used for the queue.')
        return
      }
      const clockID = message.mentions.channels.array()[0].id
      if (!clockID) {
        message.reply('Please tag the channel that will be used for the duty clock.')
        return
      }
      const logID = message.mentions.channels.array()[1].id
      if (!logID) {
        message.reply('Please tag the channel that will be used the log.')
        return
      }
      const errorID = message.mentions.channels.array()[2].id
      if (!errorID) {
        message.reply('Please tag the channel that will be used for errors.')
        return
      }
      const spamID = message.mentions.channels.array()[3].id
      if (!spamID) {
        message.reply('Please tag the channel that will be used for spamming commands.')
        return
      }
      console.log(guild.id, botID, dutyID, queueID, clockID, logID, errorID, spamID)

      await management.setup(guildID, botID, dutyID, queueID, clockID, logID, errorID, spamID)
      fncDiscord.sendGuildMessage(guild, `You have added this server to the database. Thank you!`, "log")

  },
}