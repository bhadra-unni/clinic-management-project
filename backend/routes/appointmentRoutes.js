// routes/appointments.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// ✅ Book an appointment (by patient)
router.post('/', async (req, res) => {
  try {
    const { doctor, department, date, patientName } = req.body;

    const newAppt = new Appointment({
      doctor,
      department,
      date,
      patientName,
      status: 'Confirmed',
    });

    await newAppt.save();
    res.status(201).json({ message: 'Appointment booked successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all appointments (optional admin route)
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get appointments for a doctor
router.get('/doctor/:name', async (req, res) => {
  try {
    const doctorAppointments = await Appointment.find({ doctor: req.params.name }).sort({ date: 1 });
    res.json(doctorAppointments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch doctor appointments' });
  }
});

// ✅ Get appointments for a patient
router.get('/patient/:name', async (req, res) => {
  try {
    const patientAppointments = await Appointment.find({ patientName: req.params.name }).sort({ date: 1 });
    res.json(patientAppointments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch patient appointments' });
  }
});

// ✅ Cancel an appointment (by doctor or patient)
router.put('/cancel/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    if (appointment.status === 'Cancelled') {
      return res.status(400).json({ error: 'Appointment is already cancelled' });
    }

    const appointmentDate = new Date(appointment.date);
    const now = new Date();
    const diffInMs = appointmentDate - now;
    const diffInHours = diffInMs / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return res.status(400).json({
        error: 'Appointments can only be cancelled at least 24 hours in advance',
      });
    }

    appointment.status = 'Cancelled';
    await appointment.save();

    res.json({ message: 'Appointment cancelled successfully' });
  } catch (err) {
    console.error('Cancel error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
