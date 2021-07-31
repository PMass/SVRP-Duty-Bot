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

const trainingSchema = mongoose.Schema({
  guildID: reqString,
  name: reqString,
  level: reqNum,
  damage: reqNum,
})


module.exports = mongoose.model('training', trainingSchema)