-- DDL Script for Student Information & Course Management System

-- 1. Users Table (Handles Admins and Students)
CREATE TABLE IF NOT EXISTS `Users` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(255) DEFAULT 'student',
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL
);

-- 2. Courses Table
CREATE TABLE IF NOT EXISTS `Courses` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `instructor` VARCHAR(255),
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL
);

-- 3. Enrollments Join Table (Establishes the Many-to-Many Relationship)
CREATE TABLE IF NOT EXISTS `Enrollments` (
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,
    `UserId` INTEGER REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    `CourseId` INTEGER REFERENCES `Courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (`UserId`, `CourseId`)
);