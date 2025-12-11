const mongoose = require('mongoose');
require('dotenv').config();

module.exports = async () => {
  const connectWithRetry = async (retries = 5, delay = 5000) => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB Connected');
    } catch (err) {
      console.error('Connection Error:', err.message);
      if (retries > 0) {
        console.log(`Retrying connection in ${delay / 1000}s... (${retries} retries left)`);
        setTimeout(() => connectWithRetry(retries - 1, delay * 1.5), delay);
      } else {
        console.error('Could not connect to MongoDB after multiple attempts. Continuing without DB connection.');
        // Do not exit process so the API can still respond (useful for local dev). Routes that require DB will return errors.
      }
    }
  };

  connectWithRetry();
};
