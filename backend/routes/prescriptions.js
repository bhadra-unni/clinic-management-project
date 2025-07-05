// routes/prescriptions.js
const express = require('express');
const router = express.Router();
const Prescription = require('../models/Prescription');
const Appointment = require('../models/Appointment');

// ✅ Add prescription (doctor) — only for today & confirmed appointment
// ✅ Add prescription (doctor) — only for today & confirmed appointment
router.post('/', async (req, res) => {
  const { patientName, doctorName, date, specialization } = req.body;

  try {
    const existing = await Prescription.findOne({
      patientName,
      doctorName,
      date: new Date(date),
    });

    if (existing) {
      return res.status(400).json({ error: 'Prescription already exists for this appointment.' });
    }

    // Save the new prescription
    const prescription = new Prescription(req.body);
    await prescription.save();

    // ✅ Update matching appointment to status "Completed"
    await Appointment.findOneAndUpdate(
  {
    patientName,
    doctor: doctorName,
    department: specialization,
    date: new Date(date),
    status: 'Confirmed',
  },
  { $set: { status: 'Completed' } }
);


    res.status(201).json({ message: 'Prescription saved and appointment marked as completed' });
  } catch (err) {
    console.error('Error saving prescription:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// ✅ Get prescriptions for a patient
router.get('/', async (req, res) => {
  const { patientName } = req.query;
  try {
    if (!patientName) {
      return res.status(400).json({ message: 'Patient name is required' });
    }
    const prescriptions = await Prescription.find({ patientName });
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching prescriptions', error: err.message });
  }
});


// OLD - only today's prescriptions
router.get('/doctor/:doctorName', async (req, res) => {
  try {
    const prescriptions = await Prescription.find({
      doctorName: req.params.doctorName
    });

    res.json(prescriptions);
  } catch (err) {
    console.error('Error fetching prescriptions:', err);
    res.status(500).json({ error: 'Failed to fetch prescriptions' });
  }
});


module.exports = router;
