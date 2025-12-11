const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');

router.post('/create', communityController.createPost);
router.get('/', communityController.getAllPosts);
router.get('/:country', communityController.getPostsByCountry);
router.put('/like/:id', communityController.likePost);

module.exports = router;
