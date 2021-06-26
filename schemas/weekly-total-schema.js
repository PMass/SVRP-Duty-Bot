const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const weeklyTotalSchema = mongoose.Schema({
  hexID: reqString,
  userid: reqString,
  name: reqString,
  totalHour: reqString,
})

module.exports = mongoose.model('weekly-total', weeklyTotalSchema)