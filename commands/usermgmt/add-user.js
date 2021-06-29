const dbAdd = require('../../dbAdd')
const fncDiscord = require('../../functions-discord')

module.exports = {
  commands: ['adduser'],
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: "<The target's @>",
  permissionError: 'You must be HR or higher to use this command.',
  permissions: 'MANAGE_ROLES',
  callback: async (message, arguments) => {
    message.delete({ timeout: 5000 })
    const mention = message.mentions.users.first()
    if (!mention) {
      message.reply('Please tag the user who you are putting into the database.')
      return
    }
    const userInfo = {}
    const guild = message.guild
    userInfo.ID = mention.id

    const [groups, certs, rank] = await fncDiscord.getRoles(guild, mention)
    userInfo.department = await fncDiscord.multiGroupCheck(message, groups)
    userInfo.hexid = await fncDiscord.response(message, `What is the users steam HEX? \`110000#########\` format`)
    userInfo.hired = await fncDiscord.response(message, `On what day was this person hired?`)
    userInfo.name = await fncDiscord.response(message, `What is the users Character Name?`)




    const isLoggedIn = await req.isLoggedIn();



    if (isLoggedIn) {
        // do login stuff
    }   

    userInfo.time = "0000:00:00"
    const space = " ";
    if (department != "police" && department != "sheriff") {
      message.reply('Please provide a valid department (police/sheriff).')
      return
    }
    const newUser = await dbAdd.addUser(guild.id, userInfo)
    fncDiscord.sendGuildMessage(message.guild, `<@${message.author.id}> have added <@${userId}> to the database. Thank you!`, "spam", 10)
  },
}