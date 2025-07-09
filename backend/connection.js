var mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        console.log('MongoDB connected')
    } )
    .catch((err) =>{
        console.error(err)
    } );