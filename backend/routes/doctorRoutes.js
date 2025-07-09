require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const docModel = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMidd = require('../midd/authMiddleware')
const auth = require('../midd/authorize')

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const doctor = await docModel.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: doctor._id, role: 'doctor' }, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.json({
      message: 'Login successful',
      token,
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        department: doctor.department,
        fees: doctor.fees,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
  }
});


router.get('/dashboard/:doctorId', authMidd, auth('doctor'), async (req, res) => {
  try {
    const doctorId = req.params.doctorId;

    const doctor = await docModel.findById(doctorId);
    if (!doctor) {
      console.log("Doctor not found in DB");
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const today = new Date().toISOString().split('T')[0]; // e.g., '2025-06-28'


    const upcomingAppointments = await Appointment.countDocuments({
      doctor: doctor.name,
      status: 'Confirmed',
      date: { $gte: today }
    });


    const patientsTreated = await Appointment.countDocuments({
      doctor: doctor.name,
      status: 'Confirmed'
    });

    res.json({
      name: doctor.name,
      specialization: doctor.department,
      upcomingAppointments,
      patientsTreated
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: 'Error loading dashboard data' });
  }
});



module.exports = router;
