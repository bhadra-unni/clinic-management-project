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
  date: { type: Date, required: true }, // or use Date type if you prefer
  specialization: { type: String, required: true },
  notes: { type: String },
  medicines: [
    {
      name: String,
      dosage: String,
      frequency: String,
      duration: String,
      instructions: String,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);