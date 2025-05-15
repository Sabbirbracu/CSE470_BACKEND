const express = require('express');
const router = express.Router();
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');

const { isTeacher } = require('../middleware/authMiddleware');

const courseController = require('../controllers/courseController');
const { isTeacher } = require('../middlewares/authMiddleware');

// Only teachers can create courses
router.post('/', isTeacher, createCourse);

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);
// Route to get pending enrollments for a course (only accessible by the teacher)
router.get('/:courseId/pending-enrollments', isTeacher, courseController.getPendingEnrollments);

module.exports = router;
