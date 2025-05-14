const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CourseSection',
    required: true
  },
  type: {
    type: String,
    enum: ['Video', 'Lecture Note', 'Practice Sheet', 'Assignment'],
    required: true
  },
  content: {
    type: String // File URL or content
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Material', materialSchema);
