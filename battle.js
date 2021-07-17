const Discord = require('discord.js');
const dbBattle = require('./dbBattle')
const fncClock = require('./functions-clock')
const dsMsg = require('./dsMsg')

// Give Role by ID
  module.exports.join = async (guildID, message, callType) => {
  	try {
      console.log(`running battle join()`)
      const userID = message.author.id
      const items = await dbBattle.getItems(guildID, userID)
      const health = await dbBattle.getHealth(guildID, userID)
      const equipment = {}
      var dmgVal = 0
      var armorVal = 0
      const length = Object.keys(items).length - 1;
      for (let i = 0; i <= length; i++) { //Go through each role and see if the ID matches any of the IDs of other arrays
        let name = Object.keys(items)[i]
        let amount = Object.values(items)[i]
        if (amount >= 0 ) {
          let taking = await dsMsg.response(message, `You have ${amount} ${name}(s). How many would you like to take?`);
          if(taking > 0){
            console.log(name)
            equipment[name] = taking
            dmgVal = dmgVal + (await dbBattle.getAttack(guildID, name) * taking)
            armorVal = armorVal + (await dbBattle.getDefence(guildID, name) * taking)
            items[name] = items[name] - taking
          }
        }
      }
      console.log(equipment)
      const totalAmount = Object.values(equipment)
      console.log(totalAmount)
      if(totalAmount.reduce(reducer) >= 0){
        dsMsg.guildMessage(message.guild, `<@${userID}> you are responding to the ${callType} with ${Object.keys(equipment)}.`, "battle", 60); 
        await dbBattle.addItemtoUser(guildID, userID, items)      
        await dbBattle.updtBattleDef(guildID, callType, userID, health, dmgVal, armorVal)
      }
  	} catch (err){
      console.log(err)
      console.log("error in joining a user to a battle")
    }
  }

// Take Role by ID
  module.exports.startBattle = async (guild, name) => {
  	try {
      console.log(`running battle startBattle()`)
      const guildID = guild.id;
      var [atkHealth, atkDmg, atkArmor, defHealth, defDmg, defArmor] = await dbBattle.getBattleInfo(guildID, name);
      const modifier = await dbBattle.getModifier(guild.id, name);
      var payout = await dbBattle.getPayout(guild.id, name);
      if(atkHealth == 0){
        atkHealth = defHealth;
        atkDmg = defDmg;
        atkArmor = defArmor;
      };
      if(defHealth == 0){
        defHealth = atkHealth
        defDmg = atkDmg;
        defArmor = atkArmor;
      }
      console.log(atkHealth, atkDmg, atkArmor, defHealth, defDmg, defArmor, modifier, payout)
      var status = "engaged"
      if (isNaN(atkHealth)) {
        return
      }
      while (status == "engaged") {
        let atkHit = getRandomInt(atkDmg)
        let atkSave = getRandomInt(atkArmor) * modifier
        let defHit = getRandomInt(defDmg) * modifier
        let defSave = getRandomInt(defArmor) * modifier
        let atkWound = defHit - atkSave
        let defWound = atkHit - defSave
        console.log("random", atkHit, atkSave, defHit, defSave)
        if (isNaN(atkHit)) {
          return
        }
        if(atkWound > 0){
          atkHealth = atkHealth - atkWound
          if(atkWound > 5){
            dsMsg.guildMessage(guild, `The criminals were caught out in the open and were hit hard.`, "battle", 60); 
          } else {
            dsMsg.guildMessage(guild, `The criminals took a some grazing shots from officers but nothing that oxy can't fix.`, "battle", 60);
          }
        } else {
          dsMsg.guildMessage(guild, `The criminals hid behind the counter and doged all the shots.`, "battle", 60);
        }
        await fncClock.sleep(5)
        if(defWound > 0){
          defHealth = defHealth - defWound
          if(defWound > 5){
            dsMsg.guildMessage(guild, `The officers tried to push and took multiple shots.`, "battle", 60); 
          } else {
            dsMsg.guildMessage(guild, `The officers took some shots directly into the chest plate and recovered quickly.`, "battle", 60);
          }
        } else {
          dsMsg.guildMessage(guild, `The officers moved to cover behind their cars doged all the shots.`, "battle", 60);
        }
        await fncClock.sleep(5)
        dsMsg.guildMessage(guild, `The attackers rolled ${atkHit} for Dmg and ${atkSave} for Save. The defenders rolled ${defHit} for Dmg and ${defSave} for Save. The Attackers HP is now ${atkHealth} and the defneders HP is now ${defHealth}`, "log");
        if(atkHealth <= 0 || defHealth <= 0){
          status = "over"
        }
      }
      console.log(atkHealth, defHealth)

      payout = await getRandomInt(payout)

      if(atkHealth > defHealth){
        dsMsg.guildMessage(guild, `The criminals escaped from the heist and made off with ${payout} dollars.`, "battle");
      } else {
        dsMsg.guildMessage(guild, `The officers stopped the criminals from escaping and the mayor rewarded them with ${payout} dollars.`, "battle");
      }
     console.log(payout)
  	} catch (err){
      console.log("error in running the battle")
      console.log(err)  		
  	}
  }

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const reducer = (accumulator, currentValue) => accumulator + currentValue;