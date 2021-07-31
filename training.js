const Discord = require('discord.js');
const dbTraining = require('./dbTraining')
const fncClock = require('./functions-clock')
const dsMsg = require('./dsMsg')
const dbEcon = require('./dbEcon')
const training = require('./training')

const { MessageButton, MessageActionRow, MessageMenuOption, MessageMenu} = require('discord-buttons');

const atkHigh = ['Assult Rifle', 'Shotgun', 'Sub-Machine Gun', 'Grenade']
const atkLow = ['Pistol', 'Supressive Fire', 'Tazer', 'Nightstick']
const neutral = ['Cover', 'Fall Back']
const defLow = ['Use Firstaid-kit', 'Apply Bandage', 'Apply Tourniquet', 'Take Painkillers']
const defHigh =  ['Use Med-kit', 'Apply Armor', 'Apply IFAK']

// Create the first Training Message
  module.exports.training = async (guild, message, attacker) => {
    console.log(`running battle training()`) 
    try {
      const defender = message.mentions.users.first().username
      const atkHighLbl = atkHigh[getRandomInt(atkHigh.length)]
      const atkLowLbl = atkLow[getRandomInt(atkLow.length)]
      const neutralLbl = neutral[getRandomInt(neutral.length)]
      const defLowLbl = defLow[getRandomInt(defLow.length)]
      const defHighLbl = defHigh[getRandomInt(defHigh.length)]
      //Buttons
        atkHighBtn = new MessageButton()
          .setStyle('grey')
          .setLabel(`${atkHighLbl}`) 
          .setID('train_atkHigh')
          .setEmoji('🔥')
        atkLowBtn = new MessageButton()
          .setStyle('grey')
          .setLabel(`${atkLowLbl}`) 
          .setID('train_atkLow')
          .setEmoji('🔫')
        neutralBtn = new MessageButton()
          .setStyle('grey')
          .setLabel(`${neutralLbl}`) 
          .setID('train_neutral')
          .setEmoji('🧱')
        defLowBtn = new MessageButton()
          .setStyle('grey')
          .setLabel(`${defLowLbl}`) 
          .setID('train_deflow')
          .setEmoji('🩹')
        defHighBtn = new MessageButton()
          .setStyle('grey')
          .setLabel(`${defHighLbl}`) 
          .setID('train_defHigh')
          .setEmoji('💉')
        let buttons = new MessageActionRow()
          .addComponents(atkHighBtn, atkLowBtn, neutralBtn, defLowBtn, defHighBtn);
      // Message
        dsMsg.guildMsgBtns(guild, `${attacker} and ${defender} choose the action you're going to take.`, "battle", buttons);
      console.log(attacker, defender)
    } catch (err){
      console.log("error in running the training battle")
      console.log(err)
    }
  }

// Create the Training Message
  module.exports.moreTraining = async (guild, attacker, defender) => {
    console.log(`running battle moreTraining()`) 
    try {
      
      const atkHighLbl = atkHigh[getRandomInt(atkHigh.length)]
      const atkLowLbl = atkLow[getRandomInt(atkLow.length)]
      const neutralLbl = neutral[getRandomInt(neutral.length)]
      const defLowLbl = defLow[getRandomInt(defLow.length)]
      const defHighLbl = defHigh[getRandomInt(defHigh.length)]
      //Buttons
        atkHighBtn = new MessageButton()
          .setStyle('grey')
          .setLabel(`${atkHighLbl}`) 
          .setID('train_atkHigh')
          .setEmoji('🔥')
        atkLowBtn = new MessageButton()
          .setStyle('grey')
          .setLabel(`${atkLowLbl}`) 
          .setID('train_atkLow')
          .setEmoji('🔫')
        neutralBtn = new MessageButton()
          .setStyle('grey')
          .setLabel(`${neutralLbl}`) 
          .setID('train_neutral')
          .setEmoji('🧱')
        defLowBtn = new MessageButton()
          .setStyle('grey')
          .setLabel(`${defLowLbl}`) 
          .setID('train_deflow')
          .setEmoji('🩹')
        defHighBtn = new MessageButton()
          .setStyle('grey')
          .setLabel(`${defHighLbl}`) 
          .setID('train_defHigh')
          .setEmoji('💉')
        let buttons = new MessageActionRow()
          .addComponents(atkHighBtn, atkLowBtn, neutralBtn, defLowBtn, defHighBtn);
      // Message
        dsMsg.guildMsgBtns(guild, `${attacker} and ${defender} choose the action you're going to take.`, "battle", buttons);
      console.log(attacker, defender)
    } catch (err){
      console.log("error in running the training battle")
      console.log(err)
    }
  }

// Run the Training Simulation
  module.exports.startTraining = async (guild, name) => {
    try {
      const guildID = guild.id
      console.log(guild.id, name)
      var [attacker, atkAttack, atkDefence, atkDmg, atkHealth, defender, defAttack, defDefence, defDmg, defHealth, payout] = await dbTraining.getTrainingInfo(guildID, name)
      await dbTraining.logTraining(guildID, name, attacker, atkAttack, atkDefence, atkDmg, atkHealth, defender, defAttack, defDefence, defDmg, defHealth, payout)
      if(atkDmg > 0){
        if(atkAttack >= defDefence){
          defHealth = defHealth - atkDmg
          dsMsg.guildMsg(guild, `${attacker.username} was able to get past ${defender.username}'s defence and did some damage`, "battle", 10);
        } else{
          dsMsg.guildMsg(guild, `${attacker.username} couldn't get past ${defender.username}'s defence and did no damage`, "battle", 10);
        }
      } else {
        atkHealth = atkHealth - atkDmg
        dsMsg.guildMsg(guild, `${attacker.username} decided to protect themselves and now feels more rested`, "battle", 10);
      }
      await fncClock.sleep(3)
      if(defDmg > 0){
        if(defAttack >= atkDefence){        
          atkHealth = atkHealth - defDmg
          dsMsg.guildMsg(guild, `${defender.username} was able to get past ${attacker.username}'s defence and did some damage`, "battle", 10);
        } else {
          dsMsg.guildMsg(guild, `${defender.username}  couldn't get past ${attacker.username}'s defence and did no damage`, "battle", 10);
        }
      } else {
        defHealth = defHealth - defDmg
        dsMsg.guildMsg(guild, `${defender.username} decided to protect themselves and now feels more rested and recovered`, "battle", 10);
      }
      await fncClock.sleep(3)
      if(atkHealth <= 0 || defHealth <= 0){
        if(atkHealth > defHealth){
          dsMsg.guildMsg(guild, `${attacker.username} has come out victorious over ${defender.username} in training and earned ${payout}`, "battle", 60);
          await dbEcon.addCoins(guildID, attacker.id, payout)
          await dbTraining.trackWins(guildID, attacker.id, 1)
          await dbTraining.trackWins(guildID, defender.id, 0)
          var winner = `attacker`
        } else {
          dsMsg.guildMsg(guild, `${defender.username} was able to defend themselves against ${attacker.username} in training and earned ${payout}`, "battle", 60);
          await dbEcon.addCoins(guildID, defender.id, payout)
          await dbTraining.trackWins(guildID, attacker.id, 0)
          await dbTraining.trackWins(guildID, defender.id, 1)
          var winner = `defender`
        }
        await dbTraining.endTraining(guildID, name, winner)
      } else {
        await dbTraining.trainingRound(guildID, name, atkHealth, defHealth)
        await training.moreTraining(guild, attacker.username, defender.username)
      }
    } catch (err){
      console.log("error in running the battle")
      console.log(err)
      console.log(attacker, atkAttack, atkDefence, atkDmg, atkHealth, defender, defAttack, defDefence, defDmg, defHealth, payout)
    }
  }

// Run the Training Simulation
  module.exports.saveTraining = async (guild, name, clicker, attacker, defender, atk, def, dmg, message) => {
    try {
      if(clicker == attacker){
        var status = await dbTraining.updtTrainingAtk(guild.id, name, atk, def, dmg)
        if(status){
          await training.startTraining(guild, name)
          message.delete({ timeout: 100 })
        } else {
          dsMsg.guildMsg(guild, `${attacker} Has made their decision, awaiting ${defender}`, "battle", 10);
        }
      } else {
        var status = await dbTraining.updtTrainingDef(guild.id, name, atk, def, dmg)
        if(status){
          await training.startTraining(guild, name)
          message.delete({ timeout: 100 })
        } else {
          dsMsg.guildMsg(guild, `${defender} Has made their decision, awaiting ${attacker}`, "battle", 10);
        }
      }
    } catch (err){
      console.log("error in saving the training")
      console.log(err)
      console.log(clicker, attacker, defender, atk, def, dmg)
    }
  }

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

