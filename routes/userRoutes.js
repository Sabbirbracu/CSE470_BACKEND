const express = require('express');
const router = express.Router();
const {
  createOrUpdateUser,
  getUserByUID,
  updateUser,
  getUsersByRole,
  deleteUser
} = require('../controllers/userController');

router.post('/', createOrUpdateUser);
router.get('/:uid', getUserByUID);
router.put('/:uid', updateUser);
router.get('/role/:role', getUsersByRole);
router.delete('/:uid', deleteUser); // Optional

module.exports = router;
