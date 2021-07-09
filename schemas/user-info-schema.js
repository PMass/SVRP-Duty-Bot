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

const userInfoSchema = mongoose.Schema({
  guildID: reqString,  
  userID: reqString,
  hexID: reqString,
  name: reqString,
  department: reqString,
  hired: reqDate,
  promo: reqDate,
  time: reqString,
  cadet: reqBoolean,
  doc: reqBoolean,
  rank: reqString,
  badge: reqString,
  phone: reqString,
  region: reqString,
  strikes: reqString,
  photo: reqString,
  certs: reqObject,
  color: reqString,
  title: reqString,
  other1: reqString,
  other2: reqString,
})

module.exports = mongoose.model('users-info', userInfoSchema)