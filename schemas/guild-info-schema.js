const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const reqObject = {
  type: Object,
  required: true,
}

const guildInfoSchema = mongoose.Schema({
  name: reqString,
  guildID: reqString,
  guild: reqObject,
  botID: reqString,
  groups: reqObject,
  certs: reqObject,
  ranks: reqObject,
  channels: reqObject,
  embeds: reqObject,
})

module.exports = mongoose.model('guild-info', guildInfoSchema)