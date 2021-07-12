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

const itemSchema = mongoose.Schema({
  guildID: reqString,
  name: reqString,
  attack: reqNum,
  defence: reqNum,
})

module.exports = mongoose.model('item', itemSchema)