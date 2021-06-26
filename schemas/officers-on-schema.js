const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const officersOnSchema = mongoose.Schema({
  guildID: reqString,  
  userID: reqString,
  time: reqString,
  code: reqString,
  placeholder: reqString,
})

module.exports = mongoose.model('officers-on', officersOnSchema)