const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware'); // Import auth middleware
const router = express.Router();

// Protect all user routes
router.use(authMiddleware);

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User({
      name,
      email,
      uid: req.user.uid, // Associate user with Firebase UID
    });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;