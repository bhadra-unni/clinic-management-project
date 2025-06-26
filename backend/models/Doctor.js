//2
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  department: String,
  fees: Number,
});

 var doctorModel = mongoose.model('Doctor', doctorSchema);

module.exports = doctorModel