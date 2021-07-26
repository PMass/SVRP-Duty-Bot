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

const profileSchema = mongoose.Schema({
  guildID: reqString,
  userID: reqString,
  coins: reqNum,
  items: reqObject,
  health: reqNum,
  wins: reqNum,
  loses: reqNum,
})

module.exports = mongoose.model('profiles', profileSchema)