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
  attackers: reqArray,
  atkHealth: reqNum,
  atkDmg: reqNum,
  atkArmor: reqNum,
  defenders: reqArray,
  defHealth: reqNum,
  defDmg: reqNum,
  defArmor: reqNum,
})


module.exports = mongoose.model('battle', battleSchema)