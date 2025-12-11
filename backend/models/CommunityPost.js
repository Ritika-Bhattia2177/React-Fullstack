const mongoose = require('mongoose');

const CommunityPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  destination: { type: String, required: true },
  imageUrl: { type: String },
  // createdBy is optional so guests can post; if present it should be a User ObjectId
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  likes: { type: Number, default: 0 },
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CommunityPost', CommunityPostSchema);
