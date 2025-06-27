const express = require('express');
const router = express.Router();
const Prescription = require('../models/Prescription');

// POST: Add a prescription (used by doctor)
router.post('/', async (req, res) => {
  try {
    const newPrescription = new Prescription(req.body);
    const saved = await newPrescription.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Error saving prescription', error: err.message });
  }
});

// GET: Fetch prescriptions for a patient
router.get('/', async (req, res) => {
  const { patientName } = req.query;
  try {
    if (!patientName) return res.status(400).json({ message: 'Patient name is required' });
    const prescriptions = await Prescription.find({ patientName });
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching prescriptions', error: err.message });
  }
});

module.exports = router;
