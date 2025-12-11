const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register a new user
router.post('/register', authController.registerUser);

// Login existing user
router.post('/login', authController.loginUser);

// Dev: list users
router.get('/users', authController.listUsers);

module.exports = router;
