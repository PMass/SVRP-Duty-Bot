const Discord = require('discord.js');
const dbGet = require('./dbGet');

// Send message based on channel and a guild
  module.exports.guildMessage = async (guild, text, msgType, duration = -1) => {
    try {
      const channels = await dbGet.guildChannels(guild.id)
      var ch = 0
      switch (msgType) {
        case "log":
          ch = guild.channels.cache.get(channels.log)
          break;
        case "clock":
          ch = guild.channels.cache.get(channels.clock)
          break;
        case "error":
          ch = guild.channels.cache.get(channels.error)
          break;
        case "spam":
          ch = guild.channels.cache.get(channels.spam)
          break;
        case "battle":
          ch = guild.channels.cache.get(channels.battle)
          break;
        default:
          ch = guild.channels.cache.get(msgType)
          console.log("Using direct channel method")
      }
      const msg = await ch.send(text)
      if (duration === -1) {
        return
      }
      setTimeout(() => {
        msg.delete()
      }, 1000 * duration)
    } catch(err){
      console.error(err)
    }
  }

// Send initial message
  module.exports.startMessage = async (channel) => {
    console.log('Running startMessage()')
    try {
      const embeds = {}
      const onDutyEmbed = new Discord.MessageEmbed()
        .setColor('#0b2e54')
        .setTitle('On duty List')
        .addFields(
        { name: 'Officers', value: 'None On Duty', inline: true  },
        { name: 'Cadets', value: 'None On Duty', inline: true  },
      );
      const queueEmbed = new Discord.MessageEmbed()
        .setColor('#ffca28')
        .setTitle('In Queue list')
        .addFields(
        { name: 'Officers', value: 'No Queue', inline: true  },
        { name: 'Cadets', value: 'No Queue', inline: true  },
      );
      const docEmbed = new Discord.MessageEmbed()
        .setColor('#9900ff')
        .setTitle('DOC On duty List')
        .addFields(
        { name: 'Officers', value: 'None On Duty', inline: true  },
        { name: 'Cadets', value: 'None On Duty', inline: true  },
      );  
      embeds.on = await channel.send(onDutyEmbed)
      embeds.queue = await channel.send(queueEmbed)
      embeds.DOC = await channel.send(docEmbed)
      return embeds
    } catch(err){
      console.error(err)
    }
  }

// Send a discord message and log a response
  module.exports.response = async (message, text) => {
    try {
      const filter = m => m.author.id === message.author.id
      const q = await message.channel.send(text)        
      const newMsg = await message.channel.awaitMessages(filter, {
        max: 1,
        time: 60000,
        errors: ['time']
      })
      const responseMsg = await newMsg.first()
      q.delete({ timeout: 200 })
      const content = responseMsg.content
      responseMsg.delete({ timeout: 200 })
      return content
    } catch(err){
      message.channel.send('Timed out');
      console.error(err)
    }
  }

// Send a profile message for the user mentioned
  module.exports.profileMessage = async (channel,userInfo) => {
    console.log('Running profileMessage()')
    try {
      const embeds = {}
      certList = userInfo.certsFull
      certList.forEach(convertTFtoIcon);
      console.log(certList)
      if (userInfo.department == "Los Santos Police Department" || userInfo.department == "Blaine County Sheriff's Office" || userInfo.department == "San Andreas State Police" || userInfo.department == "Department Of Justice"){
        switch(userInfo.department){
          case "Los Santos Police Department":
            var logo = 'https://cdn.discordapp.com/attachments/474425814126166056/859572584517861386/SASP_Badge.png'
            break;
          case "Blaine County Sheriff's Office":
            var logo = 'https://cdn.discordapp.com/attachments/474425814126166056/859572584517861386/SASP_Badge.png'
            break;
          case "San Andreas State Police":
            var logo = 'https://cdn.discordapp.com/attachments/474425814126166056/859572584517861386/SASP_Badge.png'
            break;
          case "Department Of Justice":
            var logo = 'https://cdn.discordapp.com/attachments/474425814126166056/859572584517861386/SASP_Badge.png'
            break;
          default:
            ch = guild.channels.cache.get(msgType)
            console.log("ERROR: no department, investigate ")
        }
        var profile = new Discord.MessageEmbed()
          .setColor(`${userInfo.color}`)
          .setTitle(`${userInfo.badge} - ${userInfo.name}`)
          .setAuthor(`${userInfo.rank} with ${userInfo.department}`, `${logo}` )
          .setThumbnail(`${userInfo.photo}`)
          .addFields(
          { name: 'Phone Number', value: `${userInfo.phone}`, inline: true  },
          { name: 'Hired Date', value: `${userInfo.hired}`, inline: true  },
          { name: 'Last Promotion Date', value: `${userInfo.promo}`, inline: true  },
          { name: 'FTO', value: certList[0], inline: true  },
          { name: 'AR', value: certList[1], inline: true  },
          { name: 'ASU', value: certList[2], inline: true  },
          { name: 'BIKE', value: certList[6], inline: true  },
          { name: 'SWAT', value: certList[7], inline: true  },
          { name: 'K9', value: certList[8], inline: true  },
          { name: 'SADOC', value: certList[9], inline: true  },
          { name: 'CAR1', value: certList[3], inline: true  },
          { name: 'CAR2', value: certList[4], inline: true  },
          { name: 'CAR3', value: certList[5], inline: true  },
          )
          .setTimestamp()
          .setFooter(`${userInfo.region}`, `${logo}`);
      } else { // Else if they work for DOC as they have seperate Certs
        var profile = new Discord.MessageEmbed()
          .setColor(`#bf3cf8`)
          .setTitle(`${userInfo.badge} - ${userInfo.name}`)
          .setAuthor(`${userInfo.rank} with ${userInfo.department}`, `https://cdn.discordapp.com/attachments/474425814126166056/859572954333577226/doc.png` )
          .setThumbnail(`${userInfo.photo}`)
          .addFields(
          { name: 'Phone Number', value: `${userInfo.phone}`, inline: true  },
          { name: 'Hired Date', value: `${userInfo.hired}`, inline: true  },
          { name: 'Last Promotion Date', value: `${userInfo.promo}`, inline: true  },
          { name: 'FTO', value: certList[10], inline: true  },
          { name: 'CMU', value: certList[14], inline: true  },
          { name: 'AR', value: certList[15], inline: true  },
          { name: 'K9', value: certList[11], inline: true  },
          { name: 'CERT', value: certList[12], inline: true  },
          { name: 'ICU', value: certList[13], inline: true  },
          )
          .setTimestamp()
          .setFooter(`${userInfo.region}`, `https://cdn.discordapp.com/attachments/474425814126166056/859572954333577226/doc.png`);
      }
      embeds.on = await channel.send(profile)
      return embeds
    } catch(err){
      console.error(err)
    }
  }

// Send a profile message for the user mentioned
  module.exports.profileHR = async (channel,userInfo) => {
    console.log('Running dsMsg profileHR()')
    try {
      const embeds = {}
      certList = userInfo.certsFull
      certList.forEach(convertTFtoIcon);
      console.log(certList)
        switch(userInfo.department){
          case "Los Santos Police Department":
            var logo = 'https://cdn.discordapp.com/attachments/474425814126166056/859572584517861386/SASP_Badge.png'
            break;
          case "Blaine County Sheriff's Office":
            var logo = 'https://cdn.discordapp.com/attachments/474425814126166056/859572584517861386/SASP_Badge.png'
            break;
          case "San Andreas State Police":
            var logo = 'https://cdn.discordapp.com/attachments/474425814126166056/859572584517861386/SASP_Badge.png'
            break;
          case "Department Of Justice":
            var logo = 'https://cdn.discordapp.com/attachments/474425814126166056/859572584517861386/SASP_Badge.png'
            break;
          default:
            ch = guild.channels.cache.get(msgType)
            console.log("ERROR: no department, investigate ")
        }
        var profile = new Discord.MessageEmbed()
          .setColor(`${userInfo.color}`)
          .setTitle(`HR only profile for ${userInfo.badge} - ${userInfo.name}`)
          .setAuthor(`${userInfo.rank} with ${userInfo.department}`, `${logo}` )
          .setThumbnail(`${userInfo.photo}`)
          .addFields(
          { name: 'Phone Number', value: `${userInfo.phone}`, inline: true  },
          { name: 'Hired Date', value: `${userInfo.hired}`, inline: true  },
          { name: 'Last Promotion Date', value: `${userInfo.promo}`, inline: true  },
          { name: 'Title', value: `${userInfo.title}`, inline: false  },
          { name: 'Strike Points', value: `${userInfo.strikes}`, inline: true  },
          { name: 'Other Information #1', value: `${userInfo.other1}`, inline: false  },
          { name: 'Other Information #2', value: `${userInfo.other2}`, inline: true  },
          { name: 'FTO', value: certList[0], inline: true  },
          { name: 'AR', value: certList[1], inline: true  },
          { name: 'ASU', value: certList[2], inline: true  },
          { name: 'BIKE', value: certList[6], inline: true  },
          { name: 'SWAT', value: certList[7], inline: true  },
          { name: 'K9', value: certList[8], inline: true  },
          { name: 'SADOC', value: certList[9], inline: true  },
          { name: 'CAR1', value: certList[3], inline: true  },
          { name: 'CAR2', value: certList[4], inline: true  },
          { name: 'CAR3', value: certList[5], inline: true  },
          { name: 'DOC FTO', value: certList[10], inline: true  },
          { name: 'CMU', value: certList[14], inline: true  },
          { name: 'DOC AR', value: certList[15], inline: true  },
          { name: 'DOC K9', value: certList[11], inline: true  },
          { name: 'CERT', value: certList[12], inline: true  },
          { name: 'ICU', value: certList[13], inline: true  },
          )
          .setTimestamp()
          .setFooter(`${userInfo.region}`, `${logo}`);
      embeds.on = await channel.send(profile)
      return embeds
    } catch(err){
      console.error(err)
    }
  }

// Send a profile message for the user mentioned
  module.exports.store = async (channel,items,guild) => {
    console.log('Running dsMsg store()')
    try {
      const length = items.length
      const date = new Date()
      var field = []
      for (let i = 0; i < length; i++) { //Go through each role and see if the ID matches any of the IDs of other arrays
        var item = {}
        let stock = items[i].stock
        if(stock == 0){
          item.name = `${items[i].name} is SOLD OUT!`
          let cost = items[i].cost
          item.value = `Unavailable`
        } else {
          item.name = items[i].name
          let cost = items[i].cost
          item.value = `Cost: ${cost}\nStock: ${stock}`          
        }
        item.inline = true
        field[i] = item
      }
      const embed = {
          "title": `SVRP Items Store`,
          "color": 8717573,
          "timestamp": `${date}`,
          "thumbnail": {
            "url": `${guild.iconURL()}`
          },
          "fields": field
        }
      await channel.send({ embed });
      return
    } catch(err){
      console.error(err)
    }
  }

// Send a profile message for the user mentioned
  module.exports.inventory = async (channel,items,guild,member) => {
    console.log('Running dsMsg inventory()')
    try {
      const length = Object.entries(items).length
      const date = new Date()
      var field = []
      for (let i = 0; i < length; i++) { //Go through each role and see if the ID matches any of the IDs of other arrays
        let stock = Object.values(items)[i]
        if(stock == 0){
        } else {
          let item = {}
          item.name = Object.keys(items)[i]
          item.value = `Amount: ${stock}`
          item.inline = true
          field.push(item)
        }
      }
      if(field.length == 0){
        const embed = {
          "title": `${member.displayName} inventory`,
          "color": `${member.displayHexColor}`,
          "timestamp": `${date}`,
          "thumbnail": {
            "url": `${member.user.avatarURL()}`
          },
          "image": {"url": "https://media1.giphy.com/media/10h8CdMQUWoZ8Y/giphy-downsized-large.gif"
          }
        }
        await channel.send({ embed }); 
      } else {
        const embed = {
          "title": `${member.displayName} inventory`,
          "color": `${member.displayHexColor}`,
          "timestamp": `${date}`,
          "thumbnail": {
            "url": `${member.user.avatarURL()}`
          },
          "fields": field
        }      
        await channel.send({ embed });
      }
      return
    } catch(err){
      console.error(err)
    }
  }

// Internal function to convert a True/False array to an array of Icons for True or False
  function convertTFtoIcon(item, index, arr){ // Input 2 arrays and compare to see how they are the same or different
    if(item){
      arr[index] = "✅"
    } else {
      arr[index] = "❌"
    }
    return arr
  }