const express = require('express');
const { isStudent, isTeacher } = require('../middlewares/authMiddleware');
const {
  requestEnrollment,
  approveEnrollment,
  declineEnrollment, // ✅ NEW
} = require('../controllers/courseEnrollmentController');

const router = express.Router();

// ✅ Student submits enrollment request
router.post('/request', isStudent, requestEnrollment);

// ✅ Teacher approves enrollment request
router.post('/approve', isTeacher, approveEnrollment);

// ✅ Teacher declines enrollment request
router.post('/decline', isTeacher, declineEnrollment);

module.exports = router;
