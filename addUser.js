const dbAdd = require('./dbAdd')
const dsGet = require('./dsGet')
const dsMsg = require('./dsMsg')

module.exports.add = async (message, mention) => {
  const guild = message.guild
  try {
    const userInfo = {}    
    userInfo.ID = mention.id
    const [groups, certs, rank] = await dsGet.getRoles(guild, mention)
    if(groups.includes("Cadet Phase 2") || groups.includes("Cadet Phase 1")){
      userInfo.cadet = true
    } else {
      userInfo.cadet = false
    }
    userInfo.department = await dsGet.multiGroupCheck(message, groups);
    userInfo.hexid = await dsMsg.response(message, `What is the users steam HEX? \`110000#########\` format`);
    userInfo.hired = await dsMsg.response(message, `On what day was this person hired? \`MM-DD-YYYY\` format`);
    userInfo.name = await dsMsg.response(message, `What is the users Character Name?`);
    userInfo.badge = await dsMsg.response(message, `What is the characters badge number? \`X-##\` / \`9##\` / \`D-###\ format `);
    userInfo.phone = await dsMsg.response(message, `What is their phone number?`);
    userInfo.photo = await dsMsg.response(message, `Provide a direct link to a their employee photo? NOTE: THE URL NEEDS TO END IN .JPG or .PNG`);
    userInfo.region = await dsMsg.response(message, `Where is the person located? \`NA\` / \`EU\` / \`AUS\` `);
    userInfo.color = mention.displayHexColor;
    userInfo.time = "0000:00:00"
    userInfo.rank = rank[0]
    if (userInfo.department == `Department Of Corrections`){
      userInfo.doc = true
    } else {
      userInfo.doc = false
    }
    console.log(guild.id, userInfo, certs, rank[0])
    await dbAdd.addUser(guild.id, userInfo, certs)
    return ;
    } catch (err){
      console.log(err)
      dsMsg.sendGuildMessage(guild, 'Error in adding user to database',"error")
    }
}
