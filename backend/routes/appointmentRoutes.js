// routes/appointments.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const authMidd = require('../midd/authMiddleware')
const auth = require('../midd/authorize')

// ✅ Book an appointment (by patient)
// ✅ Book an appointment (by patient)
router.post('/', authMidd, auth('patient'), async (req, res) => {
  try {
    const { doctor, department, date, patientName } = req.body;

    const dayOfWeek = new Date(date).getDay(); // 0 = Sunday
    if (dayOfWeek === 0) {
      return res.status(400).json({ error: 'Appointments cannot be booked on Sundays.' });
    }

    // Convert to same-day range (00:00 to 23:59) for filtering
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // Check how many appointments the doctor already has on that day
    const existingAppointments = await Appointment.countDocuments({
      doctor,
      date: { $gte: startOfDay, $lte: endOfDay },
      status: { $ne: 'Cancelled' } // Exclude cancelled appointments
    });

    const MAX_APPOINTMENTS_PER_DAY = 20;

    if (existingAppointments >= MAX_APPOINTMENTS_PER_DAY) {
      return res.status(400).json({ error: `Doctor is fully booked on ${date}` });
    }

    // If below max, proceed to save
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
router.get('/', authMidd, auth('admin'), async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get appointments for a doctor
router.get('/doctor/:name', authMidd, auth('doctor'), async (req, res) => {
  try {
    const doctorAppointments = await Appointment.find({ doctor: req.params.name }).sort({ date: 1 });
    res.json(doctorAppointments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch doctor appointments' });
  }
});

// ✅ Get appointments for a patient
router.get('/patient/:name', authMidd, auth('patient'), async (req, res) => {
  try {
    const patientAppointments = await Appointment.find({ patientName: req.params.name }).sort({ date: 1 });
    res.json(patientAppointments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch patient appointments' });
  }
});

// ✅ Cancel an appointment (admin/patient/doctor)
router.put('/cancel/:id', authMidd, auth('patient', 'doctor'), async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    if (appointment.status === 'Cancelled') {
      return res.status(400).json({ error: 'Appointment is already cancelled' });
    }

    const appointmentTime = new Date(appointment.date);
    const currentTime = new Date();

    const timeDifference = appointmentTime.getTime() - currentTime.getTime(); // in milliseconds

    if (timeDifference <= 24 * 60 * 60 * 1000) {
      return res.status(400).json({
        error: 'Appointments can only be cancelled at least 24 hours in advance',
      });
    }

    appointment.status = 'Cancelled';
    appointment.cancelledAt = new Date(); // (Optional) Track cancellation time
    await appointment.save();

    res.status(200).json({ message: 'Appointment cancelled successfully' });
  } catch (err) {
    console.error('Cancel error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
