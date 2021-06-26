const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const docnSchema = mongoose.Schema({
  guildID: reqString,  
  userID: reqString,
})

module.exports = mongoose.model('doc-on', docnSchema)