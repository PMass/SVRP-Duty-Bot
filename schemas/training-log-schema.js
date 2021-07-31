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

const trainingLogSchema = mongoose.Schema({
  guildID: reqString,
  name: reqString,
  active: reqBoolean,
  payout: reqNum,
  attacker: reqObject,
  atkStatus: reqArray,
  defender: reqObject,
  atkStatus: reqArray,
  winner: reqString,
  date: reqDate,
})


module.exports = mongoose.model('training-log', trainingLogSchema)