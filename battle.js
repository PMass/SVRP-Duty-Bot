const Discord = require('discord.js');
const dbBattle = require('./dbBattle')
const fncClock = require('./functions-clock')
const dsMsg = require('./dsMsg')
const { MessageButton, MessageActionRow, MessageMenuOption, MessageMenu} = require('discord-buttons');

const atkHigh = ['Assult Rifle', 'Shotgun', 'Sub-Machine Gun', 'Grenade']
const atkLow = ['Pistol', 'Supressive Fire', 'Tazer', 'Nightstick']
const neutral = ['Cover', 'Fall Back']
const defLow = ['Use Firstaid-kit', 'Apply Bandage', 'Apply Tourniquet', 'Take Painkillers']
const defHigh =  ['Use Med-kit', 'Apply Armor', 'Apply IFAK']

// Add a user to the battle
  module.exports.join = async (guildID, message, callType) => {
  	try {
      const userID = message.author.id
      const items = await dbBattle.getItems(guildID, userID)
      const health = await dbBattle.getHealth(guildID, userID)
      console.log(health)
      const equipment = {}
      var dmgVal = 0
      var armorVal = 0
      const length = Object.keys(items).length - 1;
      for (let i = 0; i <= length; i++) { //Go through each role and see if the ID matches any of the IDs of other arrays
        let name = Object.keys(items)[i]
        let amount = Object.values(items)[i]
        let taking = await dsMsg.response(message, `You have ${amount} ${name}(s). How many would you like to take?`);
        if(taking > 0){
          console.log(name)
          equipment[name] = taking
          dmgVal = dmgVal + (await dbBattle.getAttack(guildID, name) * taking)
          armorVal = armorVal + (await dbBattle.getDefence(guildID, name) * taking)
          items[name] = items[name] - taking
        }
      }
      console.log(equipment)
      console.log(guildID, callType, health, dmgVal, armorVal)
      await dbBattle.addItemtoUser(guildID, userID, items)
      await dbBattle.updtBattleDef(guildID, callType, health, dmgVal, armorVal, userID)
  	} catch (err){
      console.log(err)
      console.log("error in joining a user to a battle")
    }
  }

// Run the Battle Simulation
  module.exports.startBattle = async (guildID, name) => {
  	try {
      var [atkHealth, atkDmg, atkArmor, defHealth, defDmg, defArmor] = dbBattle.getBattleInfo(guildID, name)
      const modifier = dbBattle.getModifier(guildID, name)
      var payout = dbBattle.getPayout(guildID, name)
      var status = "engaged"
      while (status == "engaged") {
        let atkHit = getRandomInt(atkDmg)
        let atkSave = getRandomInt(atkArmor) * modifier
        let defHit = getRandomInt(defDmg) * modifier
        let defSave = getRandomInt(defArmor) * modifier
        let atkWound = defHit - atkSave
        let defWound = atkHit - defSave
        console.log("random", atkHit, atkSave, defHit, defSave)
        if(atkWound > 0){
          atkHealth = atkHealth - atkWound
          if(atkWound > 5){
            dsMsg.guildMsg(guild, `The criminals were caught out in the open and were hit hard.`, "battle", 60); 
          } else {
            dsMsg.guildMsg(guild, `The criminals took a some grazing shots from officers but nothing that oxy can't fix.`, "battle", 60);
          }
        } else {
          dsMsg.guildMsg(guild, `The criminals hid behind the counter and doged all the shots.`, "battle", 60);
        }
        await fncClock.sleep(5)
        if(defWound > 0){
          defHealth = defHealth - defWound
          if(defWound > 5){
            dsMsg.guildMsg(guild, `The officers tried to push and took multiple shots.`, "battle", 60); 
          } else {
            dsMsg.guildMsg(guild, `The officers took some shots directly into the chest plate and recovered quickly.`, "battle", 60);
          }
        } else {
          dsMsg.guildMsg(guild, `The officers moved to cover behind their cars doged all the shots.`, "battle", 60);
        }
        await fncClock.sleep(5)
        dsMsg.guildMsg(guild, `The attackers rolled ${atkHit} for Dmg and ${atkSave} for Save. The defenders rolled ${defHit} for Dmg and ${defSave} for Save. The Attackers HP is now ${atkHealth} and the defneders HP is now ${defHealth}`, "log");
        if(atkHealth <= 0 || defHealth <= 0){
          status = "over"
        }
      }
      console.log(atkHealth, defHealth)

      payout = await getRandomInt(payout)

      if(atkHealth > defHealth){
        dsMsg.guildMsg(guild, `The criminals escaped from the heist and made off with ${payout}.`, "battle");
      } else {
        dsMsg.guildMsg(guild, `The officers stopped the criminals from escaping and the mayor rewarded them with ${payout}.`, "battle");
      }
     console.log(payout)
  	} catch (err){
  		console.log("error in running the battle")
  	}
  }

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
      var [attacker, atkAttack, atkDefence, atkDmg, atkHealth, defender, defAttack, defDefence, defDmg, defHealth, payout] = dbBattle.getTrainingInfo(guild.id, name)
      if(atkDmg > 0){
        if(atkAttack >= defDefence){
          defHealth = defHealth - atkDmg
          dsMsg.guildMsg(guild, `${attacker.username} was able to get past ${defender.username}'s defence and did some damage`, "battle", 10);
        }
      } else {
        atkHealth = atkHealth - atkDmg
        dsMsg.guildMsg(guild, `${attacker.username} decided to protect themselves and now feels more rested`, "battle", 10);
      }
      if(defDmg > 0){
        if(defAttack >= atkDefence){        
          atkHealth = atkHealth - defDmg
          dsMsg.guildMsg(guild, `${defender.username} was able to get past ${attacker.username}'s defence and did some damage`, "battle", 10);
        }
      } else {
        defHealth = defHealth - defDmg
        dsMsg.guildMsg(guild, `${defender.username} decided to protect themselves and now feels more rested`, "battle", 10);
      }
      if(atkHealth <= 0 || defHealth <= 0){
        if(atkHealth > defHealth){
          dsMsg.guildMsg(guild, `${attacker.username} has come out victorious over ${defender.username} in training and earned ${payout}`, "battle", 60);
          await dbEcon.addCoins(guildID, attacker.id, payout)
        } else {
          dsMsg.guildMsg(guild, `${defender.username} was able to defend themselves against ${attacker.username} in training and earned ${payout}`, "battle", 60);
          await dbEcon.addCoins(guildID, defender.id, payout)
        } 
        const name = attacker.username + `-` + defender.username
        await dbBattle.endTraining(guildID, name)
      } else {
        await battle.moreTraining(guild, attacker.username, defender.username)
      }
    } catch (err){
      console.log("error in running the battle")
    }
  }

// Run the Training Simulation
  module.exports.saveTraining = async (guild, name, clicker, attacker, defender, atk, def, dmg) => {
    try {
      if(clicker == attacker){
        var status = await dbBattle.updtTrainingAtk(guild.id, name, atk, def, dmg)
        if(status){
          await dbBattle.startTraining(guild, name)
          message.delete({ timeout: 100 })
        } else {
          dsMsg.guildMsg(guild, `${attacker} Has made their decision, awaiting ${defender}`, "battle", 10);
        }
      } else {
        var status = await dbBattle.updtTrainingDef(guild.id, name, atk, def, dmg)
        if(status){
          await dbBattle.startTraining(guild, name)
          message.delete({ timeout: 100 })
        } else {
          dsMsg.guildMsg(guild, `${defender} Has made their decision, awaiting ${attacker}`, "battle", 10);
        }
      }
    } catch (err){
      console.log("error in saving the training")
    }
  }



function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

      //Menu
        // AR = new MessageMenuOption()
        //   .setDescription('placeholder')
        //   .setLabel(`Shoot AR`)
        //   .setValue('train_AR')
        //   .setEmoji('841158580941619270')

        // supress = new MessageMenuOption()
        //   .setDescription('placeholder')
        //   .setLabel(`Supressive Fire`) 
        //   .setValue('train_supress')
        //   .setEmoji('🔥')

        // grenade = new MessageMenuOption()
        //   .setDescription('placeholder')
        //   .setLabel(`Throw Grenade`) 
        //   .setValue('train_grenade')
        //   .setEmoji('💣')

        // pistol = new MessageMenuOption()
        //   .setDescription('placeholder')
        //   .setLabel(`Shoot Pistol`) 
        //   .setValue('train_pistol')
        //   .setEmoji('🍔')
        //   .setEmoji('🔫')

        // back = new MessageMenuOption()
        //   .setDescription('placeholder')
        //   .setLabel(`Fall Back`) 
        //   .setValue('train_back')
        //   .setEmoji('🏃')

        // cover = new MessageMenuOption()
        //   .setDescription('placeholder')
        //   .setLabel(`Move to Cover`) 
        //   .setValue('train_cover')
        //   .setEmoji('🧱')

        // armor = new MessageMenuOption()
        //   .setDescription('placeholder')
        //   .setLabel(`Apply Armor`) 
        //   .setValue('train_armor')
        //   .setEmoji('🦺')

        // heal = new MessageMenuOption()
        //   .setDescription('placeholder')
        //   .setLabel(`Use IFAK`) 
        //   .setValue('stance_heal')
        //   .setEmoji('💉')

        // let selectAtk = new MessageMenu()
        //   .setID('customAtkid')
        //   .setPlaceholder('Attack Options')
        //   .setMaxValues(1)
        //   .setMinValues(1)
        //   .addOptions(AR, supress, grenade, pistol)

        // let selectDef = new MessageMenu()
        //   .setID('customDefid')
        //   .setPlaceholder('Defend Options')
        //   .setMaxValues(1)
        //   .setMinValues(1)
        //   .addOptions(back, cover, armor, heal)

        // let selectOptions = new MessageActionRow()
        //   .addComponents(selectAtk, selectDef);
      // dsMsg.guildMsgBtns(guild, `<@${attacker}> and <@${defender}> choose the action you're going to take.`, "battle", selectAtk);
