const User = require('../models/User');

// Middleware to verify user is a teacher
const isTeacher = async (req, res, next) => {
  try {
    const uid = req.headers['x-user-uid'];
    if (!uid) return res.status(401).json({ message: 'No UID provided in headers' });

    const user = await User.findOne({ uid });

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.role !== 'teacher') {
      return res.status(403).json({ message: 'Access denied. Only teachers can perform this action.' });
    }

    req.user = user; // attach user info for future use
    next();
  } catch (error) {
    console.error('Role check failed:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Middleware to verify user is a student
const isStudent = async (req, res, next) => {
  try {
    const uid = req.headers['x-user-uid'];
    if (!uid) return res.status(401).json({ message: 'No UID provided in headers' });

    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.role !== 'student') {
      return res.status(403).json({ message: 'Access denied. Only students can perform this action.' });
    }

    req.user = user; // Attach user to req
    next();
  } catch (error) {
    console.error('Role check failed:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { isTeacher, isStudent };
