const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const authMidd = require('../midd/authMiddleware')
const auth = require('../midd/authorize')


// POST: Send a message
router.post('/send', async (req, res) => {
  try {
    console.log(' Incoming message data:', req.body);

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required.' });
    }

    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (err) {
    console.error(' Error while saving message:', err);
    res.status(500).json({ success: false, error: 'Failed to send message' });
  }
});

// GET: Admin fetch all messages
router.get('/all', authMidd, auth('admin'), async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error(' Error while fetching messages:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch messages' });
  }
});

// ✅ DELETE: Delete a message by ID
router.delete('/:id', authMidd, auth('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMessage = await Message.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({ success: false, error: 'Message not found.' });
    }

    res.status(200).json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    console.error(' Error while deleting message:', error);
    res.status(500).json({ success: false, error: 'Failed to delete message' });
  }
});

module.exports = router;
