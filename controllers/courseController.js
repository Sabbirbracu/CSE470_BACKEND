const Course = require('../models/Course');
const mongoose = require('mongoose');

// @desc    Create a new course (teacher only)
const createCourse = async (req, res) => {
  try {
    const { courseId, courseName, weeks, instructorBio } = req.body;
    const user = req.user; // Populated by isTeacher middleware

    // ✅ Check for missing fields
    if (!courseId || !courseName) {
      return res.status(400).json({ message: 'courseId and courseName are required' });
    }

    // ✅ Check for duplicate courseId
    const exists = await Course.findOne({ courseId });
    if (exists) {
      return res.status(400).json({ message: 'Course ID already exists' });
    }

    // ✅ Create and save new course
    const newCourse = new Course({
      courseId,
      courseName,
      instructor: {
        name: user.name,
        img: user.photoURL,
        bio: instructorBio || ''
      },
      instructorRef: user._id, // ✅ Link teacher's ObjectId
      weeks: weeks || []
    });

    await newCourse.save();
    res.status(201).json({ message: "Course created successfully", course: newCourse });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while creating course" });
  }
};

// @desc    Get all courses
const getAllCourses = async (req, res) => {
  try {
    // ✅ Populate instructorRef with minimal info
    const courses = await Course.find().populate('instructorRef', 'name email photoURL');
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get course by ID
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructorRef', 'name email photoURL');

    if (!course) return res.status(404).json({ message: 'Course not found' });

    res.status(200).json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update course by ID (only owner teacher)
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) return res.status(404).json({ message: 'Course not found' });

    // ✅ Only course creator can update
    if (course.instructorRef.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only update your own courses' });
    }

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(updatedCourse);
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete course by ID (only owner teacher)
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) return res.status(404).json({ message: 'Course not found' });

    // ✅ Only course creator can delete
    if (course.instructorRef.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only delete your own courses' });
    }

    await course.deleteOne();
    res.status(200).json({ message: 'Course deleted successfully' });

  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse
};