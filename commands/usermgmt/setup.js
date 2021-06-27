const dbAdd = require('../../dbAdd')
const fncDiscord = require('../../functions-discord')

module.exports = {
  commands: ['setup'],
  minArgs: 5,
  maxArgs: 5,
  expectedArgs: "<The bot's @> <The duty clock channel's #> <The Log channel's #> <The error channel's #> <The spam channel's #>",
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
      const groups = await fncDiscord.getGuildRolesGroup(guild)
      const certs = await fncDiscord.getGuildRolesCert(guild)
      const ranks = await fncDiscord.getGuildRolesRank(guild)
      const channels = await {};
      channels.clock = message.mentions.channels.array()[0].id
      if (!channels.clock) {
        message.reply('Please tag the channel that will be used for the duty clock.');
        return
      }
      channels.log = message.mentions.channels.array()[1].id;
      if (!channels.log) {
        message.reply('Please tag the channel that will be used the log.');
        return
      }
      channels.error = message.mentions.channels.array()[2].id;
      if (!channels.error) {
        message.reply('Please tag the channel that will be used for errors.');
        return
      }
      channels.spam = message.mentions.channels.array()[3].id;
      if (!channels.spam) {
        message.reply('Please tag the channel that will be used for spamming commands.');
        return
      }
      console.log(guild.id, botID, groups, certs, ranks, channels);

      await dbAdd.setup(guild.id, botID, groups, certs, ranks, channels);
      fncDiscord.sendGuildMessage(guild, `You have added this server to the database. Thank you!`, "log");

  },
}