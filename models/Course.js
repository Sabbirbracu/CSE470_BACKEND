const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['quiz', 'midterm', 'exam', 'project'], default: 'lecture' }
});

const WeekSchema = new mongoose.Schema({
  week: { type: Number, required: true },
  topics: [TopicSchema]
});

const InstructorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String }, // Optional image URL
  bio: { type: String }
});

const CourseSchema = new mongoose.Schema({
  courseId: { type: String, required: true, unique: true },
  courseName: { type: String, required: true },
  instructor: InstructorSchema,
  weeks: [WeekSchema]
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);
