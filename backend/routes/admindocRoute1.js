const express = require('express');
const router = express.Router();
const docModel = require('../models/Doctor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const authMidd = require('../midd/authMiddleware')
const auth = require('../midd/authorize')

// Add doctor (Admin only) - with hashed password
router.post('/', authMidd, auth('admin'), async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await docModel({ ...req.body, password: hashedPassword }).save();
    res.send({ message: 'Doctor added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to add doctor' });
  }
});

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await docModel.find().select('-password');
    res.send(doctors);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Delete doctor
router.delete('/:id', authMidd, auth('admin'), async (req, res) => {
  try {
    await docModel.findByIdAndDelete(req.params.id);
    res.send({ message: 'Doctor deleted' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Update doctor
router.put('/:id', authMidd, auth('admin'), async (req, res) => {
  try {
    await docModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Doctor updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating doctor', error: err.message });
  }
});

router.put('/:id/reset-password', authMidd, auth('admin'), async (req, res) => {
  const { newPassword } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await docModel.findByIdAndUpdate(req.params.id, { password: hashedPassword });
    res.send({ message: 'Password reset successfully' });
  } catch (err) {
    res.status(500).send({ error: 'Failed to reset password' });
  }
});



module.exports = router;
