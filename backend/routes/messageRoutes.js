const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// POST: Send a message
router.post('/send', async (req, res) => {
  try {
    console.log(' Incoming message data:', req.body); // ✅ Add this line to debug

    const { name, email, message } = req.body;

    // Check if any field is missing
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required.' });
    }

    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (err) {
    console.error(' Error while saving message:', err); // ✅ Add this for better error tracing
    res.status(500).json({ success: false, error: 'Failed to send message' });
  }
});

// GET: Admin fetch all messages
router.get('/all', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error(' Error while fetching messages:', err); // ✅ Add this too
    res.status(500).json({ success: false, error: 'Failed to fetch messages' });
  }
});

module.exports = router;
