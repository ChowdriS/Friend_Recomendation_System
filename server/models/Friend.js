// server/models/Friend.js
import mongoose from 'mongoose';

const friendSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  friend: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

// Compound index to ensure uniqueness of friendships
friendSchema.index({ user: 1, friend: 1 }, { unique: true });

const Friend = mongoose.model('Friend', friendSchema);

export default Friend;