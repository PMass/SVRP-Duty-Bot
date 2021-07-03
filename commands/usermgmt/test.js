const dbGet = require('../../dbGet')
const dsMsg = require('../../dsMsg')

module.exports = {
  commands: ['test'],
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: "<their Hex Id>",
  permissionError: 'You must be HR or higher to use this command.',
  permissions: 'MANAGE_ROLES',
  callback: async (message, arguments) => {
    message.delete({ timeout: 5000 })
    const hexID = arguments[0];
    const characters = await dbGet.players(hexID)
    const characterCount = characters.length
    if(characterCount > 0){
      dsMsg.sendGuildMessage(message.guild, `That person has ${characterCount} characters. Which person would you like to add? \'reply with number\'`, message.channel.id, 30)
      for (let i = 0; i < characterCount; i++) { //Go through each role and see if the ID matches any of the IDs of other arrays
        dsMsg.sendGuildMessage(message.guild, `${i+1}: ${characters[i].name}?`, message.channel.id, 30)    
      }
    } else {
      
    }
  
  },
}