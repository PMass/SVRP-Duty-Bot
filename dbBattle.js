const mongo = require('./mongo')
const profileSchema = require('./schemas/profile-schema')
const itemSchema = require('./schemas/item-schema')
const battleSchema = require('./schemas/battle-schema')
const trainingSchema = require('./schemas/training-schema')

const itemCache = {} // Either { 'guildID-name-attack': attack } or { 'guildID-name-defence': defence }
const healthCache = {} // { 'guildID-userID': health }
const attackCache = {} // { 'guildID-name': attack }
const defenceCache = {} // { 'guildID-name': defence }
const modifierCache = {} // { 'guildID-name': modifier }
const payoutCache = {} // { 'guildID-name': payout }
const trainingCache = {} // Either { 'guildID-name-level': level } or { 'guildID-name-damage': dmg }

module.exports = (client) => {}

// Add commands

  // Adding an items stats
    module.exports.addItemStats = async (guildID, name, defence, attack) => {
      return await mongo().then(async (mongoose) => {
        const other = {}
        try {
          const result = await itemSchema.findOneAndUpdate(
            {
              guildID,
              name,
            },
            {
              guildID,
              name,
              attack,
              defence,
            },
            {
              upsert: true,
              new: true,
            }
          )
          itemCach[`${guildID}-${name}-attack`] = result.attack
          itemCach[`${guildID}-${name}-defence`] = result.defence
          attackCache[`${guildID}-${name}`] = result.attack
          defenceCache[`${guildID}-${name}`] = result.defence
        } finally {
          mongoose.connection.close()
        }
      })
    }

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
          modifierCache[`${guildID}-${name}`] = result.modifier
          payoutCache[`${guildID}-${name}`] = result.payout
        } finally {
          mongoose.connection.close()
        }
      })
    }

  // Setup a training battle
    module.exports.addFighters = async (guildID, name, attacker, defender) => {
      return await mongo().then(async (mongoose) => {
        const atkHealth = 50
        const defHealth = 50
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

  // Give/take an item to a user
    module.exports.addItemtoUser = async (guildID, userID, items) => {
      return await mongo().then(async (mongoose) => {
        try {
          const result = await profileSchema.findOneAndUpdate(
            {
              guildID,
              userID,
            },
            {
              guildID,
              userID,
              items,
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

  // Give/take an item to a user
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

  // Getting the items Attack
    module.exports.getAttack = async (guildID, name) => {
      const cachedValue = attackCache[`${guildID}-${name}`]
      if (cachedValue) {
        return cachedValue
      }
      return await mongo().then(async (mongoose) => {
        try {
          const result = await itemSchema.findOne({
            guildID,
            name,
          })
          let attack = 0
          if (result) {
            attack = result.attack
          } else {
            console.log('No item found')
          }
          attackCache[`${guildID}-${name}`] = attack
          return attack
        } finally {
          mongoose.connection.close()
        }
      })
    }

  // Getting the items Defence
    module.exports.getDefence = async (guildID, name) => {
      const cachedValue = defenceCache[`${guildID}-${name}`]
      if (cachedValue) {
        return cachedValue
      }
      return await mongo().then(async (mongoose) => {
        try {
          const result = await itemSchema.findOne({
            guildID,
            name,
          })
          let defence = 0
          if (result) {
            defence = result.defence
          } else {
            console.log('No item found')
          }
          defenceCache[`${guildID}-${name}`] = defence
          return defence
        } finally {
          mongoose.connection.close()
        }
      })
    }

  // Get all the items that the user currently has
    module.exports.getItems = async (guildID, userID) => {
      return await mongo().then(async (mongoose) => {
        try {
          const result = await profileSchema.findOne({
            guildID,
            userID,
          })
          let items = {}
          if (result) {
            items = result.items
          } else {
            console.log('No items found')
          }
          if (items == undefined){
            items = {}
          }
          return items
        } finally {
          mongoose.connection.close()
        }
      })
    }

  // Get the modifier for a battle
    module.exports.getModifier = async (guildID, name) => {
      const cachedValue = modifierCache[`${guildID}-${name}`]
      if (cachedValue) {
        return cachedValue
      }
      return await mongo().then(async (mongoose) => {
        try {
          const result = await battleSchema.findOne({
            guildID,
            name,
          })
          let modifier = {}
          if (result) {
            modifier = result.modifier
          } else {
            console.log('No user found')
          }
          modifierCache[`${guildID}-${name}`] = modifier
          return modifier
        } finally {
          mongoose.connection.close()
        }
      })
    }

  // Get the payout for a battle
    module.exports.getPayout = async (guildID, name) => {
      const cachedValue = payoutCache[`${guildID}-${name}`]
      if (cachedValue) {
        return cachedValue
      }
      return await mongo().then(async (mongoose) => {
        try {
          const result = await battleSchema.findOne({
            guildID,
            name,
          })
          let payout = {}
          if (result) {
            payout = result.payout
          } else {
            console.log('No user found')
          }
          payoutCache[`${guildID}-${name}`] = payout
          return payout
        } finally {
          mongoose.connection.close()
        }
      })
    }

  // Get a users health
    module.exports.getHealth = async (guildID, userID) => {
      const cachedValue = healthCache[`${guildID}-${userID}`]
      if (cachedValue) {
        return cachedValue
      }
      return await mongo().then(async (mongoose) => {
        try {
          const result = await profileSchema.findOne({
            guildID,
            userID,
          })
          let health = 0
          if (result) {
            health = result.health
          }
          if (health == undefined){
            health = 20
          }
          healthCache[`${guildID}-${userID}`] = health
          return health
        } finally {
          mongoose.connection.close()
        }
      })
    }

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

// Update Commands

  // Adding an item's stats
    module.exports.updtItemStats = async (guildID, name, itemInfo) => {
      return await mongo().then(async (mongoose) => {
        try {
          const attack = itemInfo.attack
          const defence = itemInfo.defence
          const result = await itemSchema.findOneAndUpdate(
            {
              guildID,
              name,
            },
            {
              guildID,
              name,
              attack,
              defence,
            },
            {
              upsert: true,
              new: true,
            }
          )
          attackCache[`${guildID}-${name}`] = result.attack
          defenceCache[`${guildID}-${name}`] = result.defence
        } finally {
          mongoose.connection.close()
        }
      })
    }

  // Set a users health - UNUSED CURRENTLY, WILL BE ADDING FUNCTIONALITY TO GIVE USERS TO MORE HEALTH BASED ON BATTLES
    module.exports.updtHealth = async (guildID, userID, health) => {
      return await mongo().then(async (mongoose) => {
        try {
          const result = await profileSchema.findOneAndUpdate(
            {
              guildID,
              userID,
            },
            {
              guildID,
              userID,
              health,
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

  // Update a battle from the attackers side
    module.exports.updtBattleAtk = async (guildID, name, atkHealth, atkDmg, atkArmor) => {
      return await mongo().then(async (mongoose) => {
        try {
          var result = await battleSchema.findOne({
            guildID,
            name,
          })
          if (result) {
            atkHealth = result.atkHealth + atkHealth
            atkDmg = result.atkDmg + atkDmg
            atkArmor = result.atkArmor + atkArmor
            await console.log(`updated attacker`)
          } else {
            console.log('No battle found')
          }
          await battleSchema.findOneAndUpdate(
            {
              guildID,
              name,
            },
            {
              guildID,
              name,
              atkHealth,
              atkDmg,
              atkArmor,
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

  // Update a battle from the defenders side
    module.exports.updtBattleDef = async (guildID, name, defHealth, defDmg, defArmor, users) => {
      return await mongo().then(async (mongoose) => {
        try {
          var result = await battleSchema.findOne({
            guildID,
            name,
          })
          console.log(result)
          console.log(guildID, name, defHealth, defDmg, defArmor)
          if (result) {
            defHealth = result.defHealth + defHealth
            defDmg = result.defDmg + defDmg
            defArmor = result.defArmor + defArmor
            await console.log(`updated defenders`)
          } else {
            console.log('No battle found')
          }
          console.log(guildID, name, defHealth, defDmg, defArmor)
          await battleSchema.findOneAndUpdate(
            {
              guildID,
              name,
            },
            {
              guildID,
              name,
              defHealth,
              defDmg,
              defArmor,
              $push: {
                users,
              },
            },
            {
              upsert: true,
              new: true,
            }
          )
          console.log(result)
        } finally {
          mongoose.connection.close()
        }
      })
    }

  // Update a battle from the attackers side
    module.exports.updtTrainingAtk = async (guildID, name, atkAttack, atkDefence, atkDmg) => {
      return await mongo().then(async (mongoose) => {
        try {
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
    module.exports.endTraining = async (guildID, name) => {
      return await mongo().then(async (mongoose) => {
        try {
          const result = await battleSchema.findOneAndDelete(
            {
              guildID,
              name,
            }
          )
        } finally {
          mongoose.connection.close()
        }
      })
    }
