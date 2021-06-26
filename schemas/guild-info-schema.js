const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const guildInfoSchema = mongoose.Schema({
  guildID: reqString,
  botID: reqString,
  dutyID: reqString,
  queueID: reqString,
  clockID: reqString,
  logID: reqString,
  errorID: reqString,
  spamID: reqString,
  spamID2: reqString,
  embOn: reqString,
  embQueue: reqString,
  embDOC: reqString,
})

module.exports = mongoose.model('guild-info', guildInfoSchema)