const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true }, // Firebase UID
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  photoURL: { type: String },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    required: true
  },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }], // for students
  assignedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }], // for teachers
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
