const dbAdd = require('./dbAdd')
const fncDiscord = require('./functions-discord')

module.exports.add = async (message, mention) => {
  try {
    const userInfo = {}
    const guild = message.guild
    userInfo.ID = mention.id
    const [groups, certs, rank] = await fncDiscord.getRoles(guild, mention)
    userInfo.department = await fncDiscord.multiGroupCheck(message, groups);
    userInfo.hexid = await fncDiscord.response(message, `What is the users steam HEX? \`110000#########\` format`);
    userInfo.hired = await fncDiscord.response(message, `On what day was this person hired? \`MM-DD-YYYY\` format`);
    userInfo.name = await fncDiscord.response(message, `What is the users Character Name?`);
    userInfo.callsign = await fncDiscord.response(message, `What is the characters Callsign?`);
    userInfo.phone = await fncDiscord.response(message, `What is their phone number?`);
    userInfo.photo = await fncDiscord.response(message, `Provide a link to a their employee photo?`);
    userInfo.region = await fncDiscord.response(message, `Where is the person located? \`NA\` / \`EU\` / \`AUS\` `);
    // await fncDiscord.checkCerts(message, certs)
    userInfo.time = "0000:00:00"
    console.log(guild.id, userInfo)
    // const newUser = await dbAdd.addUser(guild.id, userInfo)
    return ;
    } catch {
      fncDiscord.sendGuildMessage(guild, 'Error in adding user to database',"error")
    }
}
