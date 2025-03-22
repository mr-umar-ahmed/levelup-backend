const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Routes
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users'); // Import user routes
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes); // Add user routes

// Basic Route
app.get('/', (req, res) => {
  res.send('LevelUp Backend is running!');
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const Task = require('./models/Task');

// Temporary test to check if Task.find works
(async () => {
  try {
    const tasks = await Task.find();
    console.log('Tasks:', tasks);
  } catch (err) {
    console.error('Error testing Task.find:', err.message);
  }
})();