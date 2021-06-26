const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const onDutySchema = mongoose.Schema({
  userID: reqString,
  department: reqString,
  time: reqString,
  status:{
    type: Boolean,
    required: true,
  },
})

module.exports = mongoose.model('on-duty-log', onDutySchema)