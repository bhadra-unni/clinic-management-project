const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/adminModel');

mongoose.connect('mongodb+srv://doctorbooking:doctorbooking@cluster0.oxjgrcl.mongodb.net/Booking?retryWrites=true&w=majority&appName=Cluster0')
  .then(async () => {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await Admin.create({
      email: 'admin@clinic.com',
      password: hashedPassword,
    });
    console.log("✅ Admin created");
    mongoose.disconnect();
  })
  .catch(err => console.log("❌ Error:", err));