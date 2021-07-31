const mongo = require('./mongo')
const profileSchema = require('./schemas/profile-schema')
const battleSchema = require('./schemas/battle-schema')
const trainingLogSchema = require('./schemas/training-log-schema')
const trainingSchema = require('./schemas/training-schema')

const payoutCache = {} // { 'guildID-name': payout }
const trainingCache = {} // Either { 'guildID-name-level': level } or { 'guildID-name-damage': dmg }

module.exports = (client) => {}

// Add commands

  // Setup a battle
    module.exports.addBattle = async (guildID, name, modifier, payout) => {
      return await mongo().then(async (mongoose) => {
        const atkHealth = 0
        const atkDmg = 0
        const atkArmor = 0
        const defHealth = 0
        const defDmg = 0
        const defArmor = 0
        const active = false
        try {
          const result = await battleSchema.findOneAndUpdate(
            {
              guildID,
              name,
            },
            {
              guildID,
              name,
              modifier,
              payout,
              active,
              atkHealth,
              atkDmg,
              atkArmor,
              defHealth,
              defDmg,
              defArmor,
            },
            {
              upsert: true,
              new: true,
            }
          )
        } finally {
          mongoose.connection.close()
        }
      })
    }

  // Setup a training battle
    module.exports.addFighters = async (guildID, name, attacker, defender) => {
      return await mongo().then(async (mongoose) => {
        const atkHealth = 20
        const defHealth = 20
        const active = false
        try {
          const result = await battleSchema.findOneAndUpdate(
            {
              guildID,
              name,
            },
            {
              guildID,
              name,
              atkHealth,
              defHealth,
              attacker,
              defender,
            },
            {
              upsert: true,
              new: true,
            }
          )
        } finally {
          mongoose.connection.close()
        }
      })
    }

  // Log a training Battle
    module.exports.logTraining = async (guildID, name, attacker, atkAttack, atkDefence, atkDmg, atkHealth, defender, defAttack, defDefence, defDmg, defHealth, payout) => {
      return await mongo().then(async (mongoose) => {
        try {
          const active = true 
          const atkStatus = {Attack: atkAttack, Defence: atkDefence, Damage: atkDmg, Health: atkHealth};
          const defStatus = {Attack: defAttack, Defence: defDefence, Damage: defDmg, Health: defHealth};
          const date = new Date().getTime()
          const result = await trainingLogSchema.findOneAndUpdate(
            {
              guildID,
              name,
              active,
            },
            {
              guildID,
              name,
              payout,
              attacker,
              defender,
              date,
              $push: {
                atkStatus,
                defStatus,
              },              
            },
            {
              upsert: true,
              new: true,
              sort: { 'date': -1 }
            }
          )
          console.log(result)
        } finally {
          mongoose.connection.close()
        }
      })
    }

  // Add a Training Stance - NOT USED ANYMORE
    module.exports.trainingStance = async (guildID, name, level, damage) => {
      return await mongo().then(async (mongoose) => {
        try {
          const result = await trainingSchema.findOneAndUpdate(
            {
              guildID,
              name,
            },
            {
              guildID,
              name,
              level,
              damage,
            },
            {
              upsert: true,
              new: true,
            }
          )
          trainingCache[`${guildID}-${name}-level`] = result.level
          trainingCache[`${guildID}-${name}-damage`] = result.damage
          console.log(trainingCache)
        } finally {
          mongoose.connection.close()
        }
      })
    }

// Get commands

  // Get if a battle is active or not
    module.exports.getActive = async (guildID, name) => {
      return await mongo().then(async (mongoose) => {
        try {
          const result = await battleSchema.findOne({
            guildID,
            name,
          })
          let active = false
          console.log(result)
          if (result) {
            active = result.active
          } else {
            console.log('No active battle found')
          }
          return active
        } finally {
        }
      })
    }

  // Get if a battle is active or not
    module.exports.getTrnStance = async (guildID, name) => {
      const cachedDmg = trainingCache[`${guildID}-${name}-damage`]
      const cachedValue = trainingCache[`${guildID}-${name}-level`]
      if (cachedValue) {
        return [cachedValue, cachedDmg];
      }
      return await mongo().then(async (mongoose) => {
        try {
          const result = await trainingSchema.findOne({
            guildID,
            name,
          })
          let level = 0
          let damage = 0
          console.log(result)
          if (result) {
            level = result.level
            damage = result.damage
          } else {
            console.log('No stance found')
          }
          return [level, damage]
        } finally {
        }
      })
    }

  // Get the training information
    module.exports.getTrainingInfo = async (guildID, name) => {
      return await mongo().then(async (mongoose) => {
        try {
          const result = await battleSchema.findOne({
            guildID,
            name,
          })
          console.log(result)
          let attacker = 0
          let atkAttack = 0
          let atkDefence = 0
          let atkDmg = 0 
          let atkHealth = 0
          let defender = 0
          let defAttack = 0
          let defDefence = 0
          let defDmg = 0 
          let defHealth = 0
          let payout = 0
          if (result) {            
            attacker = result.attacker
            atkAttack = result.atkAttack
            atkDefence = result.atkDefence
            atkDmg  = result.atkDmg 
            atkHealth = result.atkHealth
            defender = result.defender
            defAttack = result.defAttack
            defDefence = result.defDefence
            defDmg  = result.defDmg 
            defHealth = result.defHealth
            payout = result.payout
          } else {
            console.log('No user found')
          }
          console.log(attacker, atkAttack, atkDefence, atkDmg, atkHealth, defender, defAttack, defDefence, defDmg, defHealth, payout)
          return [attacker, atkAttack, atkDefence, atkDmg, atkHealth, defender, defAttack, defDefence, defDmg, defHealth, payout]
        } finally {
          mongoose.connection.close()
        }
      })
    }

// Update Commands

  // Update a training from the attackers side
    module.exports.updtTrainingAtk = async (guildID, name, atkAttack, atkDefence, atkDmg) => {
      return await mongo().then(async (mongoose) => {
        try {
          const atkStatus = true
          result = await battleSchema.findOneAndUpdate(
            {
              guildID,
              name,
            },
            {
              guildID,
              name,
              atkAttack,
              atkDefence,
              atkDmg,
              atkStatus,
            },
            {
              upsert: true,
              new: true,
            }
          )
          return result.defStatus
        } finally {
          mongoose.connection.close()
        }
      })
    }

  // Update a training from the defenders side
    module.exports.updtTrainingDef = async (guildID, name, defAttack, defDefence, defDmg) => {
      return await mongo().then(async (mongoose) => {
        try {
          const defStatus = true
          result = await battleSchema.findOneAndUpdate(
            {
              guildID,
              name,
            },
            {
              guildID,
              name,
              defAttack,
              defDefence,
              defDmg,
              defStatus,
            },
            {
              upsert: true,
              new: true,
            }
          )
          return result.atkStatus
        } finally {
          mongoose.connection.close()
        }
      })
    }

  // Update the training after a round
    module.exports.trainingRound = async (guildID, name, atkHealth, defHealth) => {
      return await mongo().then(async (mongoose) => {
        try {
          const atkStatus = false
          const defStatus = false
          result = await battleSchema.findOneAndUpdate(
            {
              guildID,
              name,
            },
            {
              guildID,
              name,
              atkHealth,
              atkStatus,
              defHealth,
              defStatus,
            },
            {
              upsert: true,
              new: true,
            }
          )
          return
        } finally {
          mongoose.connection.close()
        }
      })
    }

  // End a training battle
    module.exports.endTraining = async (guildID, name, winner) => {
      return await mongo().then(async (mongoose) => {
        try {
          var active = false
          await battleSchema.findOneAndDelete(
            {
              guildID,
              name,
            }            
          )
          await trainingLogSchema.findOneAndUpdate(
            {
              guildID,
              name,
            },
            {
              guildID,
              name,
              active,
              winner,
            },
            {
              upsert: true,
              new: true,
            }
          )
        } finally {
          mongoose.connection.close()
        }
      })
    }

  // Log a users stats
    module.exports.trackWins = async (guildID, userID, wins) => {
      return await mongo().then(async (mongoose) => {
        try {
          if(wins=0){
            var loses = 1
          } else {
            var loses = 0
          }
          const result = await profileSchema.findOneAndUpdate(
            {
              guildID,
              userID,
            },
            {
              guildID,
              userID,
              $inc: {
                wins,
                loses,
              },
            },
            {
              upsert: true,
              new: true,
            }
          )
          return
        } catch (err) {
          console.log(err)
        }
      })
    }