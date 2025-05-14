const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  courseSection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CourseSection',
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Teacher/Admin
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Announcement', announcementSchema);
