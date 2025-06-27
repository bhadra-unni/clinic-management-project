const express = require('express');  //import express   1
const app = express();  //initialise   1

const mongoose = require('mongoose');  // 1
const cors = require('cors');   //1

const admindocRoute1 = require('./routes/admindocRoute1');
const appointmentRoutes = require('./routes/appointmentRoutes');
const adminRoutes = require('./routes/adminRoutes');



// Connect MongoDB
require('./connection');  //1



// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {   // 1
  res.send('Hello world') // 1
})// 1


// Routes
app.use('/doctors', admindocRoute1);
app.use('/appointments', appointmentRoutes);
app.use('/admins', adminRoutes);


// Start server
app.listen(3000, () => {   // 1
  console.log(`🚀 Server running`);  // 1
});  // 1
