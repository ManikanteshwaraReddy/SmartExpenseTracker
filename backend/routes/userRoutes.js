const express = require('express');
const router = express.Router();

// Middleware specific to user routes
router.use((req, res, next) => {
  console.log('User route accessed at:', Date.now());
  next();
});

// GET route for user home
router.get('/', (req, res) => {
  res.send('User Home Page');
});

// GET route for user profile
router.get('/profile', (req, res) => {
  res.send('User Profile Page');
});

// GET route with parameter for specific user
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  res.send(`User ID: ${userId}`);
});

// POST route for user registration
router.post('/register', (req, res) => {
  res.send('User Registration');
});

// POST route for user login
router.post('/login', (req, res) => {
  res.send('User Login');
});

module.exports = router;
