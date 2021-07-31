const dbAdd = require('../../dbAdd')
const dsGet = require('../../dsGet')
const dsMsg = require('../../dsMsg')

module.exports = {
  commands: ['setup'],
  minArgs: 6,
  maxArgs: 6,
  expectedArgs: "<The bot's @> <name> <The duty clock channel's #> <The Log channel's #> <The error channel's #> <The spam channel's #> <The battle channel's #>",
  permissionError: 'You must be an admin to run this',
  permissions: 'ADMINISTRATOR',
  callback: async (message, arguments) => {
    try {
      message.delete({ timeout: 10000 })
      const guild = message.guild
      const botID = message.mentions.users.first().id
      if (!botID) {
        message.reply('Please tag the bot.')
        return
      }
      const name = arguments[1];
      const groups = await dsGet.getGuildRolesGroup(guild)
      const certs = await dsGet.getGuildRolesCert(guild)
      const ranks = await dsGet.getGuildRolesRank(guild)
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
      channels.battle = message.mentions.channels.array()[4].id;
      if (!channels.battle) {
        message.reply('Please tag the channel that will be used for the battle commands.');
        return
      }
      console.log(guild.id, botID, groups, certs, ranks, channels, guild);
      await dbAdd.setup(guild.id, botID, groups, certs, ranks, channels, guild, name);
      dsMsg.guildMsg(guild, `Added!`, message.channel.id, 30);
      dsMsg.guildMsg(guild, `You have added this server to the database. Thank you!`, "log");
    } catch(err){
      console.error(err)
    }
  },
}