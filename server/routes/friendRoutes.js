// server/routes/friendRoutes.js
const express = require('express');
const { 
  searchUsers, 
  sendFriendRequest, 
  acceptFriendRequest, 
  getFriends,
  getFriendRecommendations
} = require('../controllers/friendController');
// const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/search', searchUsers);
router.post('/request', sendFriendRequest);
router.post('/accept', acceptFriendRequest);
router.get('/list', getFriends);
router.get('/recommendations', getFriendRecommendations);

module.exports = router;