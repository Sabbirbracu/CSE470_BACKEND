const mongoose = require('mongoose');

const courseSectionSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  sectionName: {
    type: String,
    required: true
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Student
  }],
  materials: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Material'
  }],
  announcements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Announcement'
  }],
  chatroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chatroom'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CourseSection', courseSectionSchema);
