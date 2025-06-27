const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: String,
  dosage: String,
  frequency: String,
  duration: String,
  instructions: String,
});

const prescriptionSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  doctorName: { type: String, required: true },
  department: String,
  date: { type: Date, default: Date.now },
  notes: String,
  medicines: [medicineSchema],
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
