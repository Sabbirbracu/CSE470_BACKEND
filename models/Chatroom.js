const mongoose = require('mongoose');

const chatroomSchema = new mongoose.Schema({
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CourseSection',
    required: true
  },
  messages: [{
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    content: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Chatroom', chatroomSchema);
