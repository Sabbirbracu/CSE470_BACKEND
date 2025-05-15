const express = require('express');
const router = express.Router();
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getPendingEnrollments
} = require('../controllers/courseController');

const { isTeacher } = require('../middleware/authMiddleware');
const verifyToken = require('../middleware/verifyToken');

// Protected route: only verified teachers can create courses
router.post('/', verifyToken, isTeacher, createCourse);

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.put('/:id', updateCourse); // You might want to protect this as well
router.delete('/:id', deleteCourse);
router.get('/:courseId/pending-enrollments', verifyToken, isTeacher, getPendingEnrollments);

module.exports = router;
