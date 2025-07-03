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
    type: Date, 
    required: true,
  },
  status: {
    type: String,
    enum: ['Confirmed', 'Cancelled'],
    default: 'Confirmed',
  },
  cancelledAt: {
    type: Date, // ✅ Optional timestamp when appointment was cancelled
    default: null,
  },
}, { timestamps: true }); 

module.exports = mongoose.model('Appointment', appointmentSchema);
