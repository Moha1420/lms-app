const express = require('express');
const Course = require('../models/Course');
const router = express.Router();
const auth = require('../middlewares/auth');

// Middleware to check if the user is an instructor
const isInstructor = (req, res, next) => {
  if (req.user.role !== 'instructor') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  next();
};

// Get all courses
router.get('/', auth, async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'name');
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get a specific course
router.get('/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name');
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create a new course
router.post('/', auth, isInstructor, async (req, res) => {
  const { title, description, content } = req.body;
  try {
    const course = new Course({
      title,
      description,
      content,
      instructor: req.user.id
    });
    await course.save();
    res.status(201).json({ msg: 'Course created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a course
router.put('/:id', auth, isInstructor, async (req, res) => {
  const { title, description, content } = req.body;
  try {
    let course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }
    course.title = title || course.title;
    course.description = description || course.description;
    course.content = content || course.content;
    await course.save();
    res.json({ msg: 'Course updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a course
router.delete('/:id', auth, isInstructor, async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Course deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
