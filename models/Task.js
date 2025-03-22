const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: String, required: true }, // Firebase UID of the user
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);