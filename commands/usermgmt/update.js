const dbGet = require('../../dbGet')
const dbUpdate = require('../../dbUpdate')
const dsMsg = require('../../dsMsg')
const dsGet = require('../../dsGet')
const gSheets = require('../../gSheets')

module.exports = {
  commands: ['update', 'updt'],
  minArgs: 2,
  maxArgs: 2,
  expectedArgs: "<The target's @> <what you want to update (options are \`all\`, \`rank\`, \`certs\`, \`department\`, \`photo\`, \`badge\`, \`title\`, \`strikes\` , \`other1\`, \`other2\`>",
  permissionError: 'You must be HR or higher to use this command.',
  permissions: 'MANAGE_ROLES',
  callback: async (message, arguments) => {
    message.delete({ timeout: 2000 })
    guild = message.guild
    guildID = guild.id
    const mention = message.mentions.members.first()
    if (!mention) {
      message.reply('Please tag the user who you are putting into the database.')
      return
    }
    userID = mention.id
    const option = arguments[1];
    var [certs, noMatch ] = await dbGet.userCerts(guildID, userID)
    var [userInfo, noMatch ] = await dbGet.userFull(guildID, userID)
    userInfo.ID = mention.id
    switch (option) {
      case "all":    
        var [groups, certs, rank] = await dsGet.getRoles(guild, mention)
        userInfo.department = await dsGet.multiGroupCheck(message, groups);
        userInfo.rank = rank[0];
        break;
      case "rank":
        var rank = await dsGet.getRank(guild, userID)
        console.log(rank)
        userInfo.rank = rank[0];
        break;
      case "certs":
        certs = await dsGet.getCerts(guild, userID)
        break;
      case "department":
        var groups = await dsGet.getDprt(guild, userID)
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
    await dbUpdate.userInfo(guildID, userInfo, certs)
    const [userInfoNew, noMatch2] = await dbGet.userFull(guildID, userID)
    userInfoNew.certsFull = await dsGet.checkCerts(guild, certs);
    await gSheets.userUpdate(userInfoNew)
    dsMsg.sendGuildMessage(guild, `You have sucessfully updated ${mention.displayName} ${option}!`, message.channel.id, 10);

  },
}