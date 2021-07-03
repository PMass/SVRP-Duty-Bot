const dbAdd = require('./dbAdd')
const dbGet = require('./dbGet')
const dsGet = require('./dsGet')
const dsMsg = require('./dsMsg')
const fnOther = require('./functions-other')

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
    const characters = await dbGet.players(userInfo.hexid)
    const characterCount = characters.length
    if(characterCount > 0){
      dsMsg.sendGuildMessage(guild, `That person has ${characterCount} characters.`, message.channel.id, 10);
      for (let i = 0; i < characterCount; i++) { //Go through each role and see if the ID matches any of the IDs of other arrays
        dsMsg.sendGuildMessage(message.guild, `${i+1}: ${characters[i].name}?`, message.channel.id, 15)
      } 
      const choice = await dsMsg.response(message, `Which person would you like to add? \'reply with number\'`);
      userInfo.name = characters[choice-1]
    } else {
      const check = await dsMsg.response(message, `That hexID is not in the database, are you sure you ented it correctly? \`yes\` / \`no\``);
      if(check == "yes"){
        userInfo.name = await dsMsg.response(message, `What is the users Character Name?`);
      } else {
        userInfo.hexid = await dsMsg.response(message, `What is the users steam HEX? \`110000#########\` format`);
        const characters = await dbGet.players(userInfo.hexid)
        const characterCount = characters.length
        if(characterCount > 0){
          dsMsg.sendGuildMessage(guild, `That person has ${characterCount} characters.`, message.channel.id, 10);
          for (let i = 0; i < characterCount; i++) { //Go through each role and see if the ID matches any of the IDs of other arrays
            dsMsg.sendGuildMessage(message.guild, `${i+1}: ${characters[i].name}?`, message.channel.id, 15)
          } 
          const choice = await dsMsg.response(message, `Which person would you like to add? \'reply with number\'`);
          userInfo.name = characters[choice-1]
        } else {
          userInfo.name = await dsMsg.response(message, `What is the users Character Name?`);
        }
      }
    }
    console.log(userInfo)
    // Find a user based on searching the database of all joined users
    userInfo.hired = await dsMsg.response(message, `On what day was this person hired? \`MM-DD-YYYY\` format`);
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
    const validPhoto = await fnOther.checkURL(userInfo.photo)
    if (validPhoto){
    } else {
    userInfo.photo = "https://cdn.discordapp.com/attachments/162286223866593280/859824380014886933/Rotate-Blast-Black.gif"
    dsMsg.sendGuildMessage(guild, `Photo not valid, substituting` ,"error")
    dsMsg.sendGuildMessage(guild, `The photo was not a direct link, substituting alternate!`, message.channel.id, 30);
    }
    console.log(guild.id, userInfo, certs, rank[0])
    await dbAdd.user(guild.id, userInfo, certs)
    
    return ;
    } catch (err){
      console.log(err)
      dsMsg.sendGuildMessage(guild, 'Error in adding user to database',"error")
    }
}

