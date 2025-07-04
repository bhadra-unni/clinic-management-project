const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: { type: String, unique: true },
  password: String,
  gender: String,
});

module.exports = mongoose.model('Patient', patientSchema);
