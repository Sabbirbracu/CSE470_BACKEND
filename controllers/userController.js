const User = require('../models/User');

// Create or Update User
const createOrUpdateUser = async (req, res) => {
  try {
    const { uid, name, email, photoURL, role } = req.body;

    if (!uid || !email || !name || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const updatedUser = await User.findOneAndUpdate(
      { uid },
      { name, email, photoURL, role },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error creating/updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user by UID
const getUserByUID = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await User.findOne({ uid }).populate('enrolledCourses assignedCourses');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user by UID
const updateUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const updates = req.body;

    const user = await User.findOneAndUpdate({ uid }, updates, { new: true });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all users by role
const getUsersByRole = async (req, res) => {
  try {
    const { role } = req.params;
    const users = await User.find({ role });

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users by role:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete user (optional)
const deleteUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const deletedUser = await User.findOneAndDelete({ uid });

    if (!deletedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.export = {
  createOrUpdateUser,
  getUserByUID,
  updateUser,
  getUsersByRole,
  deleteUser
};