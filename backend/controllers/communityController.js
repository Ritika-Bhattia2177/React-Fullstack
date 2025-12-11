
const CommunityPost = require('../models/CommunityPost');

// Create a new community post
exports.createPost = async (req, res) => {
  try {
    const { title, description, destination, imageUrl, createdBy } = req.body;
    if (!title || !description || !destination) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    // Allow anonymous posts when createdBy is not provided
    const post = new CommunityPost({ title, description, destination, imageUrl, createdBy: createdBy || undefined });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error('createPost error:', err.message);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Get all community posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await CommunityPost.find().populate('createdBy', 'name email');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// Get posts filtered by country (destination, regex)
exports.getPostsByCountry = async (req, res) => {
  try {
    const country = req.params.country;
    const regex = new RegExp(country, 'i');
    const posts = await CommunityPost.find({ destination: { $regex: regex } }).populate('createdBy', 'name email');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// Increment likes
exports.likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await CommunityPost.findByIdAndUpdate(postId, { $inc: { likes: 1 } }, { new: true });
    if (!post) return res.status(404).json({ message: 'Post not found.' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};
