// rootRouter.js
const express = require('express');
const router = express.Router();

// Import feature-specific routers
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');

// Mount them under /api
router.use('/api/users', userRoutes);
router.use('/api/courses', courseRoutes);

module.exports = router;
