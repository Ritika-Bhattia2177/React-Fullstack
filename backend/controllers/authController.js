const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already in use.' });
    }
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ success: true, message: 'User registered successfully.', user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('registerUser error:', err.message);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    // Log request body to confirm login payload received
    console.log('Login request body:', req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password.' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password.' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    // Return an explicit success message plus token and user
    res.json({ success: true, message: 'Login successful', token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('loginUser error:', err.message);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// Development helper: list users (email + name only)
exports.listUsers = async (req, res) => {
  try {
    const users = await User.find().select('name email');
    res.json(users);
  } catch (err) {
    console.error('listUsers error:', err.message);
    res.status(500).json({ message: 'Server error.' });
  }
};
