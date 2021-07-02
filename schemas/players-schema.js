const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const playersSchema = mongoose.Schema({
  hexID: reqString,
  name: reqString,
})

module.exports = mongoose.model('players', playersSchema)