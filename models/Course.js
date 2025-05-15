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
  ]
}, {
  timestamps: true
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
