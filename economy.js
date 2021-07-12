const mongo = require('./mongo')
const profileSchema = require('./schemas/profile-schema')
const storeSchema = require('./schemas/store-schema')
const itemSchema = require('./schemas/item-schema')

const coinsCache = {} // { 'guildID-userID': coins }
const costCache = {} // { 'guildID-name': cost }
const stockCache = {} // { 'guildID-name': stock }
const attackCache = {} // { 'guildID-name': cost }
const defenceCache = {} // { 'guildID-name': stock }

module.exports = (client) => {}

// Adding coins to a user
  module.exports.addCoins = async (guildID, userID, coins) => {
    return await mongo().then(async (mongoose) => {
      try {
        const items = {}
        const result = await profileSchema.findOneAndUpdate(
          {
            guildID,
            userID,
          },
          {
            guildID,
            userID,
            $inc: {
              coins,
            },
          },
          {
            upsert: true,
            new: true,
          }
        )
        coinsCache[`${guildID}-${userID}`] = result.coins
        return result.coins
      } finally {
        mongoose.connection.close()
      }
    })
  }

// Getting the users current coins
  module.exports.getCoins = async (guildID, userID) => {
    const cachedValue = coinsCache[`${guildID}-${userID}`]
    if (cachedValue) {
      return cachedValue
    }
    return await mongo().then(async (mongoose) => {
      try {
        const result = await profileSchema.findOne({
          guildID,
          userID,
        })
        let coins = 0
        if (result) {
          coins = result.coins
        } else {
        console.log('Inserting a document')
        await new profileSchema({
          guildId,
          userId,
          coins,
        }).save()
      }
        coinsCache[`${guildID}-${userID}`] = coins
        return coins
      } finally {
        mongoose.connection.close()
      }
    })
  }

// Adding an item to the store
  module.exports.addItemStore = async (guildID, name, cost, stock) => {
    return await mongo().then(async (mongoose) => {
      const other = {}
      try {
        const result = await storeSchema.findOneAndUpdate(
          {
            guildID,
            name,
          },
          {
            guildID,
            name,
            cost,
            stock,
          },
          {
            upsert: true,
            new: true,
          }
        )
        costCache[`${guildID}-${name}`] = result.cost
        stockCache[`${guildID}-${name}`] = result.stock
      } finally {
        mongoose.connection.close()
      }
    })
  }

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
        attackCache[`${guildID}-${name}`] = result.attack
        defenceCache[`${guildID}-${name}`] = result.defence
      } finally {
        mongoose.connection.close()
      }
    })
  }

// Getting the items cost
  module.exports.getCost = async (guildID, name) => {
    const cachedValue = costCache[`${guildID}-${name}`]
    if (cachedValue) {
      return cachedValue
    }
    return await mongo().then(async (mongoose) => {
      try {
        const result = await storeSchema.findOne({
          guildID,
          name,
        })
        let cost = 0
        if (result) {
          cost = result.cost
        } else {
          console.log('No item found')
        }
        costCache[`${guildID}-${name}`] = cost
        return cost
      } finally {
        mongoose.connection.close()
      }
    })
  }

// Getting the items current Stock Levels
  module.exports.getStock = async (guildID, name) => {
    const cachedValue = stockCache[`${guildID}-${name}`]
    if (cachedValue) {
      return cachedValue
    }
    return await mongo().then(async (mongoose) => {
      try {
        const result = await storeSchema.findOne({
          guildID,
          name,
        })
        let stock = 0
        if (result) {
          stock = result.stock
        } else {
          console.log('No item found')
        }
        stockCache[`${guildID}-${name}`] = stock
        return stock
      } finally {
        mongoose.connection.close()
      }
    })
  }

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

// Adding an item in the store
  module.exports.updtItemStore = async (guildID, name, itemInfo) => {
    return await mongo().then(async (mongoose) => {
      try {
        const cost = itemInfo.cost
        const stock = itemInfo.stock
        const result = await storeSchema.findOneAndUpdate(
          {
            guildID,
            name,
          },
          {
            guildID,
            name,
            cost,
            stock,
          },
          {
            upsert: true,
            new: true,
          }
        )
        costCache[`${guildID}-${name}`] = result.cost
        stockCache[`${guildID}-${name}`] = result.stock
      } finally {
        mongoose.connection.close()
      }
    })
  }

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

// Get all the Items in the store
  module.exports.getAll = async (guildID) => {
    return await mongo().then(async (mongoose) => {
      try {
        const result = await storeSchema.find({
          guildID,
        })
        let items = {}
        if (result) {
          items = result
        } else {
          console.log('No item found')
        }
        return items
      } finally {
        mongoose.connection.close()
      }
    })
  }

// Update the Stock of an item
  module.exports.updtStock = async (guildID, name, stock) => {
    return await mongo().then(async (mongoose) => {
      try {
        const result = await storeSchema.findOneAndUpdate(
          {
            guildID,
            name,
          },
          {
            guildID,
            name,
            stock,
          },
          {
            upsert: true,
            new: true,
          }
        )
        stockCache[`${guildID}-${name}`] = result.stock
      } finally {
        mongoose.connection.close()
      }
    })
  }

// Update the balance of a person to a specific number
  module.exports.updtBal = async (guildID, userID, coins) => {
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
            coins,
          },
          {
            upsert: true,
            new: true,
          }
        )
        coinsCache[`${guildID}-${userID}`] = result.coins
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
          console.log('No user found')
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

// Give an item to a user
  module.exports.giveItem = async (guildID, userID, items) => {
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

