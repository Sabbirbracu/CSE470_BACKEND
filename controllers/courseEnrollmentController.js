const Course = require('../models/Course');
const User = require('../models/User');

// ✅ Student requests enrollment
exports.requestEnrollment = async (req, res) => {
  try {
    const { courseId } = req.body;
    const student = req.user; // populated by isStudent middleware

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Check if already enrolled
    if (course.enrolledStudents.includes(student._id)) {
      return res.status(400).json({ message: 'Already enrolled' });
    }

    // Check if already requested
    if (course.pendingEnrollments.includes(student._id)) {
      return res.status(400).json({ message: 'Already requested' });
    }

    course.pendingEnrollments.push(student._id);
    await course.save();

    res.status(200).json({ message: 'Enrollment request submitted' });
  } catch (error) {
    console.error('Enrollment request failed:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Teacher approves enrollment
exports.approveEnrollment = async (req, res) => {
  try {
    const { courseId, studentId } = req.body;
    const teacher = req.user; // populated by isTeacher middleware

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Only the instructor can approve
    if (!course.instructorRef.equals(teacher._id)) {
      return res.status(403).json({ message: 'Not authorized to approve' });
    }

    // Check if student actually requested
    if (!course.pendingEnrollments.includes(studentId)) {
      return res.status(400).json({ message: 'No such pending request' });
    }

    // Remove from pending, add to enrolled
    course.pendingEnrollments = course.pendingEnrollments.filter(
      id => id.toString() !== studentId
    );
    course.enrolledStudents.push(studentId);
    await course.save();

    // Also update student's enrolledCourses list
    await User.findByIdAndUpdate(studentId, {
      $addToSet: { enrolledCourses: course._id }
    });

    res.status(200).json({ message: 'Enrollment approved' });
  } catch (error) {
    console.error('Approve failed:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Teacher declines enrollment
exports.declineEnrollment = async (req, res) => {
  try {
    const { courseId, studentId } = req.body;
    const teacher = req.user;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Only the instructor can decline
    if (!course.instructorRef.equals(teacher._id)) {
      return res.status(403).json({ message: 'Not authorized to decline' });
    }

    // Check if student is in pending list
    if (!course.pendingEnrollments.includes(studentId)) {
      return res.status(400).json({ message: 'No such pending request' });
    }

    // Remove from pending list
    course.pendingEnrollments = course.pendingEnrollments.filter(
      id => id.toString() !== studentId
    );
    await course.save();

    res.status(200).json({ message: 'Enrollment request declined' });
  } catch (error) {
    console.error('Decline failed:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
