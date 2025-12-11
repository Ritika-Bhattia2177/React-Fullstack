const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const User = require(path.join(__dirname, '..', 'models', 'User'));

const [,, email, newPassword] = process.argv;
if (!email || !newPassword) {
  console.error('Usage: node resetPassword.js <email> <newPassword>');
  process.exit(1);
}

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
    const user = await User.findOne({ email });
    if (!user) {
      console.error('User not found:', email);
      process.exit(2);
    }
    // Set the plain password; UserSchema.pre('save') will hash it
    user.password = newPassword;
    await user.save();
    console.log('Password updated for', email);
    process.exit(0);
  } catch (err) {
    console.error('Error updating password:', err.message);
    process.exit(3);
  }
}

run();
