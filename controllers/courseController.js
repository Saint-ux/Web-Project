const { Course, User } = require('../models');

// 1. Get all available courses
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.findAll();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving courses', error: error.message });
    }
};

// 2. Create a new course (ADMIN ONLY - Role-based authorization check)
exports.createCourse = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied: Requires administrator role' });
        }

        const { title, description, instructor } = req.body;
        const newCourse = await Course.create({ title, description, instructor });
        
        res.status(201).json({ message: 'Course created successfully', course: newCourse });
    } catch (error) {
        res.status(500).json({ message: 'Error creating course', error: error.message });
    }
};

// 3. Enroll a student into a course
exports.enrollInCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.userId; // Securely pulled from verified JWT token payload

        const user = await User.findByPk(userId);
        const course = await Course.findByPk(courseId);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Relational connection using Sequelize's automatic mixin method
        await user.addCourse(course);

        res.json({ message: `Successfully enrolled in ${course.title}` });
    } catch (error) {
        res.status(500).json({ message: 'Enrollment processing failed', error: error.message });
    }
};