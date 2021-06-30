const dbGet = require('../../dbGet')
const dbUpdate = require('../../dbUpdate')
const dsMsg = require('../../dsMsg')
const dsGet = require('../../dsGet')

module.exports = {
  commands: ['update', 'updt'],
  minArgs: 2,
  maxArgs: 2,
  expectedArgs: "<The target's @> <what you want to update (options are \`rank\`, \`certs\`, \`photo\`, \`badge\`, \`title\`, \`strikes\` , \`other1\`, \`other2\`>",
  permissionError: 'You must be HR or higher to use this command.',
  permissions: 'MANAGE_ROLES',
  callback: async (message, arguments) => {
    message.delete({ timeout: 5000 })
    guild = message.guild
    const mention = message.mentions.members.first()
    if (!mention) {
      message.reply('Please tag the user who you are putting into the database.')
      return
    }
    const option = arguments[1];
    var [certs, noMatch ] = await dbGet.userCerts(guild.id, mention.id)
    var [userInfo, noMatch ] = await dbGet.userFull(guild.id, mention.id)
    userInfo.ID = mention.id
    switch (option) {
      case "rank":    
        const rank = await dsGet.getRank(guild, mention.id)
        userInfo.rank = rank[0];
        break;
      case "certs":
        certs = await dsGet.getCerts(guild, mention.id)
        break;
      case "department":
        groups = await dsGet.getDprt(guild, mention.id)
        userInfo.department = await dsGet.multiGroupCheck(message, groups);
        break;
      case "photo":
        userInfo.photo = await dsMsg.response(message, `Provide a direct link to a their employee photo? NOTE: THE URL NEEDS TO END IN .JPG or .PNG`);
        break;
      case "badge":
        userInfo.badge = await dsMsg.response(message, `What is the characters badge number? \`X-##\` / \`9##\` / \`D-###\ format `);
        break;
      case "title":
        userInfo.title = await dsMsg.response(message, `What is this persons title?`);
        break;
      case "strikes":
        userInfo.strikes = await dsMsg.response(message, `How many strike points should this person have?`);
        break;
      case "other1":
        userInfo.other1 = await dsMsg.response(message, `What other piece of information would you like to record about this person?`);
        break;
      case "other2":
        userInfo.other2 = await dsMsg.response(message, `What other piece of information would you like to record about this person?`);
        break;
      default:
        console.log("ERROR: No channel specified for Guild Message, using message channel")
    }
    await dbUpdate.userInfo(guild.id, userInfo, certs)

  },
}