const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: String,
  doctor: String,
  department: String,
  date: String,
  status: {
    type: String,
    enum: ['Confirmed', 'Cancelled'],
    default: 'Confirmed'
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
