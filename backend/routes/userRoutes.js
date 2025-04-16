const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/userController');
const auth = require('../middleware/auth.js');

// Middleware specific to user routes
router.use((req, res, next) => {
  console.log('User route accessed at:', Date.now());
  next();
});

// GET route for user home
router.get('/', (req, res) => {
  res.send('User Home Page');
});

// GET route for user profile, protected by auth middleware
router.get('/profile', auth, getProfile);

// GET route with parameter for specific user
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  res.send(`User ID: ${userId}`);
});

// POST route for user registration
router.post('/register', register);

// POST route for user login
router.post('/login', login);

module.exports = router;
