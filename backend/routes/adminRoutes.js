require('dotenv').config();
const express = require('express');
const router = express.Router();
const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// Admin login only
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).send("Admin not found");

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).send("Invalid password");

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).send("Login error");
  }
});

module.exports = router;