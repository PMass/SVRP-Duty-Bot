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

// Give Role by ID
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

// Take Role by ID
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

// Take Role by ID
  module.exports.training = async (guild, message, attacker) => {
    console.log(`running battle training()`) 
    try {
      const defender = message.mentions.users.first().username
      const name = attacker + `-` + defender

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

      // Messages
        dsMsg.guildMsgBtns(guild, `${attacker} and ${defender} choose the action you're going to take.`, "battle", buttons);
        // dsMsg.guildMsgBtns(guild, `_ _`, "battle", buttonsDef);

        // dsMsg.guildMsgBtns(guild, `<@${attacker}> and <@${defender}> choose the action you're going to take.`, "battle", selectAtk);

      console.log(attacker, defender)
    } catch (err){
      console.log("error in running the training battle")
      console.log(err)
    }
  }

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

