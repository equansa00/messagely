const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const { ensureLoggedIn, ensureCorrectUser } = require('../middleware/auth');

// GET /:id - get detail of message
router.get('/:id', ensureLoggedIn, async (req, res, next) => {
  try {
    const message = await Message.get(req.params.id);
    // Add logic to ensure the logged-in user is either the sender or recipient
    return res.json({ message });
  } catch (err) {
    return next(err);
  }
});

// POST / - post message
router.post('/', ensureLoggedIn, async (req, res, next) => {
  try {
    const { to_username, body } = req.body;
    const from_username = req.user.username; // Assuming req.user is set by middleware
    const message = await Message.create({ from_username, to_username, body });
    return res.status(201).json({ message });
  } catch (err) {
    return next(err);
  }
});

// POST/:id/read - mark message as read
router.post('/:id/read', ensureLoggedIn, async (req, res, next) => {
  try {
    const message = await Message.markRead(req.params.id);
    // Add logic to ensure only the intended recipient can mark as read
    return res.json({ message });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
