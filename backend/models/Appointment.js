// models/Appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  doctor: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  date: {
    type: String, // You can change to Date type if needed
    required: true,
  },
  status: {
    type: String,
    enum: ['Confirmed', 'Cancelled'],
    default: 'Confirmed',
  }
}, { timestamps: true }); // Adds createdAt, updatedAt

module.exports = mongoose.model('Appointment', appointmentSchema);
