const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const clockLogSchema = mongoose.Schema({
  hexID: reqString,
  name: reqString,
  department: String,
  time:{
    type: Date,
    required: true,
  },
  status:{
    type: Boolean,
    required: true,    
  },
})

module.exports = mongoose.model('time-clock-log', clockLogSchema)