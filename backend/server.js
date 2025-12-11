require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
// Allow frontend origin(s). In development allow any origin but reflect it back so cookies/credentials work.
// Using origin: true will set Access-Control-Allow-Origin to the request origin.
app.use(cors({ origin: true, credentials: true }));

// DB Connection
require('./config/db')();

// Import routes
const tripRoutes = require('./routes/tripRoutes');
const authRoutes = require('./routes/auth');
const communityRoutes = require('./routes/communityRoutes');

// Sample test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API Working ✅' });
});


// Use routes under /api prefix
app.use('/api/trips', tripRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/community', communityRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
