const Discord = require('discord.js');
const economy = require('./economy')
const fncClock = require('./functions-clock')

// Give Role by ID
  module.exports.setup = (guildID, userID, callType) => {
  	try {
      const items = await economy.getItems(guildID, userID)
      const health = await economy.getHealth(guildID, userID)
      const equipment = {}
      var dmgVal = 0
      var armorVal = 0
      for (let i = 0; i < items.length; i++) { //Go through each role and see if the ID matches any of the IDs of other arrays
        let name = Object.keys(items)[i]
        let amount = Object.values(items)[i]
        let taking = await dsMsg.response(message, `You have ${amount} ${name}(s). How many would you like to take?`);
        if(taking > 0){
          equipment[name] = taking
          let dmgVal = dmgVal + economy.getAttack(name)
          let armorVal = armorVal + economy.getDefence(name)
          items[name] = items[name] - taking
        }
      }
      await economy.giveItem(guildID, userID, items)
      await updtBattleDef(guildID, callType, health, dmgVal, armorVal)
  	} catch {
      	console.log("error in giving user a role")
    }
  }

// Take Role by ID
  module.exports.startBattle = (guildID, name) => {
  	try {
      var [atkHealth, atkDmg, atkArmor, defHealth, defDmg, defArmor] = economy.getBattleInfo(guildID, name)
      const modifier = economy.getModifier(guildID, name)
      var payout = economy.getPayout(guildID, name)
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
        dsMsg.guildMessage(guild, `The criminals escaped from the heist and made off with ${payout}.`, "battle");
      } else {
        dsMsg.guildMessage(guild, `The officers stopped the criminals from escaping and the mayor rewarded them with ${payout}.`, "battle");
      }
     console.log(payout)
  	} catch {
  		console.log("error in removing a role from a user")
  	}
  }

// Send a profile message for the user mentioned
  module.exports.updateNick = async (message,userInfo) => {
    console.log('Running updateNick()')
    try {
      var badge = userInfo.badge;
      var name = userInfo.name;
      const space = " "
      const period = "."
      badge = adget.concat(space)
      var newnick = badget.concat(name);
      var length = newnick.length;
      if(length<32){
        message.member.setNickname(length)     
      } else {
        var res = name.split(" ");
        var lastI = res[1].charAt(0)
        newnick = badget.concat(res[0].concat(space.concat(lastI.concat(period))));
      }
    } catch(err){
      console.error(err)
    }
  }


