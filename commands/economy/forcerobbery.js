const dsMsg = require('../../dsMsg')

module.exports = {
  commands: ['forcerobbery'],
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: "<What type of call are you responding to  \`LTD\` / \`Fleeca\ / \`Paleto\` / \`Pacific\`>",
  permissionError: 'You must be an administrator to use this command.',
  permissions: 'ADMINISTRATOR',
  callback: async (message, arguments) => {
    const guildID = message.guild.id
    message.delete({ timeout: 100 })
    const callType = arguments[0]

    message.reply(
      `You have started a forced robbery of the ${callType}.`
    )
  },
}