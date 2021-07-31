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
  attacker: reqObject,
  atkHealth: reqNum,
  atkAttack: reqNum,
  atkDefence: reqNum,
  atkDmg: reqNum,
  atkArmor: reqNum,
  atkStatus: reqBoolean,
  atkType: reqString,
  defender: reqObject,  
  defHealth: reqNum,
  defAttack: reqNum,
  defDefence: reqNum,
  defDmg: reqNum,
  defArmor: reqNum,
  defStatus: reqBoolean,
  defType: reqString,
  users: reqArray,
  training: reqNum,
})


module.exports = mongoose.model('battle', battleSchema)