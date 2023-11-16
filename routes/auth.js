const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Import User model
const User = require('../models/user');
const ExpressError = require('../expressError'); // Import ExpressError for error handling

// Route for user registration
router.post('/register', async (req, res, next) => {
  console.log('POST request data register:', req.body);
  try {
    const { username, password, first_name, last_name, phone } = req.body;
    const newUser = await User.register({ username, password, first_name, last_name, phone });

    // Generate a token for the new user
    const token = jwt.sign({ username }, process.env.SECRET_KEY);
    return res.status(201).json({ token }); // Respond with the JWT token
  } catch (err) {
    return next(err);
  }
});

// Route for user login
router.post('/login', async (req, res, next) => {
  console.log('POST request data login:', req.body);
  try {
    const { username, password } = req.body;
    const user = await User.authenticate(username, password);

    if (user) {
      // Generate a token for the logged-in user
      const token = jwt.sign({ username }, process.env.SECRET_KEY);
      return res.json({ token }); // Respond with the JWT token
    } else {
      // Throw an error if authentication fails
      throw new ExpressError("Invalid username/password", 400);
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
