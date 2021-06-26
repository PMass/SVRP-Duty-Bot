const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}
const reqBoolean = {
  type: Boolean,
  required: true,
}

const userInfoSchema = mongoose.Schema({
  guildID: reqString,  
  userID: reqString,
  hexID: reqString,
  name: reqString,
  department: reqString,
  hired:{
    type: Date,
    required: true,
  },
  time: reqString,
  cadet: reqBoolean,
  rank: reqString,
  badge: reqString,
  phone: reqString,
  region: reqString,
  strikes: reqString,
  FTO: reqBoolean,
  AR: reqBoolean,
  ASU: reqBoolean,
  mustang: reqBoolean,
  bike: reqBoolean,
  SWAT: reqBoolean,
  K9: reqBoolean,
  CERT: reqBoolean,
  ISU: reqBoolean,
  CMU: reqBoolean,
  other1: reqString,
  other2: reqString,
  other3: reqString,
  other4: reqString,
  otherCert1: reqBoolean,
  otherCert2: reqBoolean,
  otherCert3: reqBoolean,
  otherCert4: reqBoolean,
})

module.exports = mongoose.model('users-info', userInfoSchema)