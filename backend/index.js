require('dotenv').config(); 
const express = require('express');
const app = express();


const mongoose = require('mongoose');
const cors = require('cors');

const admindocRoute1 = require('./routes/admindocRoute1');
const appointmentRoutes = require('./routes/appointmentRoutes');
const patientRoutes = require('./routes/PatientRoutes');
const adminRoutes = require('./routes/adminRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const prescriptionRoutes = require('./routes/prescriptions');
const messageRoutes = require('./routes/messageRoutes');

require('./connection');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use('/doctors', admindocRoute1);
app.use('/appointments', appointmentRoutes);
app.use('/patients', patientRoutes);
app.use('/admins', adminRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/prescriptions', prescriptionRoutes);
app.use('/messages', messageRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
