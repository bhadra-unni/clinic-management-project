const express = require('express');  //import express   1
const app = express();  //initialise   1

const mongoose = require('mongoose');  // 1
const cors = require('cors');   //1

const doctorRoutes = require('./routes/doctorRoutes');

// Connect MongoDB
require('./connection');  //1



// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {   // 1
  res.send('Hello world') // 1
})// 1


// Routes
app.use('/doctors', doctorRoutes);

// Start server
app.listen(3000, () => {   // 1
  console.log(`🚀 Server running`);  // 1
});  // 1
