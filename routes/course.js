const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/auth');

// Protect all course routes with JWT middleware
router.use(authMiddleware);

router.get('/', courseController.getAllCourses);
router.post('/create', courseController.createCourse);
router.post('/enroll', courseController.enrollInCourse);

module.exports = router;