const express = require('express');
const router = express.Router();

const { isStudent, isTeacher } = require('../middleware/authMiddleware');
const verifyToken = require('../middleware/verifyToken');

const {
  requestEnrollment,
  approveEnrollment,
  declineEnrollment,
} = require('../controllers/courseEnrollmentController');

// Student submits enrollment request
router.post('/request', verifyToken, isStudent, requestEnrollment);

// Teacher approves enrollment
router.post('/approve', verifyToken, isTeacher, approveEnrollment);

// Teacher declines enrollment
router.post('/decline', verifyToken, isTeacher, declineEnrollment);

module.exports = router;
