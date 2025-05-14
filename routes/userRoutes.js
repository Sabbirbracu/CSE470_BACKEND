const express = require('express');
const { createUser, getUserById, getAllUsers } = require('../controllers/userController');
const router = express.Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:uid', getUserById);

module.exports = router;
