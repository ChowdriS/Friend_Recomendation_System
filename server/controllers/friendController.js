// server/controllers/friendController.js
const User = require('../models/User');

exports.searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } }
      ]
    }).select('-password');
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.sendFriendRequest = async (req, res) => {
  try {
    const { friendId } = req.body;
    const user = await User.findById(req.userId);
    const friend = await User.findById(friendId);

    if (!friend) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (friend.friendRequests.includes(req.userId)) {
      return res.status(400).json({ message: 'Friend request already sent' });
    }

    friend.friendRequests.push(req.userId);
    await friend.save();

    res.json({ message: 'Friend request sent successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.acceptFriendRequest = async (req, res) => {
  try {
    const { friendId } = req.body;
    const user = await User.findById(req.userId);
    const friend = await User.findById(friendId);

    if (!friend) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.friends.push(friendId);
    friend.friends.push(req.userId);
    user.friendRequests = user.friendRequests.filter(id => id.toString() !== friendId);

    await user.save();
    await friend.save();

    res.json({ message: 'Friend request accepted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('friends', 'username email');
    res.json(user.friends);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getFriendRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('friends');
    const friendIds = user.friends.map(friend => friend._id);
    
    const recommendations = await User.aggregate([
      { $match: { _id: { $nin: [...friendIds, user._id] } } },
      { $lookup: {
          from: 'users',
          localField: 'friends',
          foreignField: '_id',
          as: 'mutualFriends'
      } },
      { $project: {
          username: 1,
          email: 1,
          mutualFriendsCount: {
            $size: {
              $filter: {
                input: '$mutualFriends',
                as: 'friend',
                cond: { $in: ['$$friend._id', friendIds] }
              }
            }
          }
      } },
      { $sort: { mutualFriendsCount: -1 } },
      { $limit: 5 }
    ]);

    res.json(recommendations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};