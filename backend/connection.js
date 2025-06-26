var mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://doctorbooking:doctorbooking@cluster0.oxjgrcl.mongodb.net/Booking?retryWrites=true&w=majority&appName=Cluster0')
    .then(() =>{
        console.log('MongoDB connected')
    } )
    .catch((err) =>{
        console.error(err)
    } );