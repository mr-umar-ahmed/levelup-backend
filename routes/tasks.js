const express = require('express');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware'); // Import auth middleware
const router = express.Router();

// Protect all task routes
router.use(authMiddleware);

// Create a new task
router.post('/', async (req, res) => {
  try {
    const { title, description, type } = req.body;

    // Attach the authenticated user's Firebase UID as the userId
    const task = new Task({
      title,
      description,
      type,
      userId: req.user.uid, // Extracted from the decoded token in authMiddleware
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all tasks for the authenticated user
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.uid }); // Only fetch tasks for the authenticated user
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    // Find and update the task
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { completed },
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ error: 'Task not found' });

    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;