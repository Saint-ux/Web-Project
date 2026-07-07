const sequelize = require('../config/db');
const User = require('./User');
const Course = require('./Course');

User.belongsToMany(Course, { through: 'Enrollments' });
Course.belongsToMany(User, { through: 'Enrollments' });

module.exports = { sequelize, User, Course };