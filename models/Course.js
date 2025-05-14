const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Teacher
    required: true
  },
  outline: {
    type: String // Course outline document
  },
  sections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CourseSection'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', courseSchema);
