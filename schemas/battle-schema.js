const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}
const reqBoolean = {
  type: Boolean,
  required: true,
}
const reqObject = {
  type: Object,
  required: true,
}
const reqDate = {
  type: Date,
  required: true,
}
const reqNum = {
  type: Number,
  required: true,
}
const reqArray = {
  type: Array,
  required: true,
}


const battleSchema = mongoose.Schema({
  guildID: reqString,
  name: reqString,
  modifier: reqNum,
  payout: reqNum,
  active: reqBoolean,
  attacker: reqNum,
  atkHealth: reqNum,
  atkAttack: reqNum,
  atkDefence: reqNum,
  atkDmg: reqNum,
  atkArmor: reqNum,
  defender: reqNum,  
  defHealth: reqNum,
  defAttack: reqNum,
  defDefence: reqNum,
  defDmg: reqNum,
  defArmor: reqNum,
  users: reqArray,
  training: reqNum,
})


module.exports = mongoose.model('battle', battleSchema)