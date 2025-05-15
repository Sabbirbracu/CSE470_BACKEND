const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseId: { type: String, required: true, unique: true },
  courseName: { type: String, required: true },
  instructor: {
    name: String,
    img: String,
    bio: String
  },
  instructorRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  weeks: [
    {
      week: Number,
      topics: [
        {
          title: String,
          type: {
            type: String,
            enum: ['quiz', 'midterm'],
            default: undefined
          }
        }
      ]
    }
  ],
  // NEW: Students who requested to enroll but are waiting for teacher approval
  pendingEnrollments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  // NEW: Students who are enrolled after teacher approval
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
