const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Book appointment
router.post('/', async (req, res) => {
  try {
    const { doctor, department, date, patientName } = req.body;

    const newAppt = new Appointment({
      doctor,
      department,
      date, // Expected format: 'YYYY-MM-DD'
      patientName,
      status: 'Confirmed',
    });

    await newAppt.save();
    res.status(201).json({ message: 'Appointment booked successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cancel appointment (only if at least 24 hours before)
router.put('/cancel/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    if (appointment.status === 'Cancelled') {
      return res.status(400).json({ error: 'Appointment is already cancelled' });
    }

    // Compare with current time
    const appointmentDate = new Date(appointment.date); // appointment.date is in YYYY-MM-DD
    const now = new Date();

    const diffInMs = appointmentDate - now;
    const diffInHours = diffInMs / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return res.status(400).json({
        error: 'Appointments can only be cancelled at least 1 day (24 hours) in advance',
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
