const mongoose = require('mongoose');

// Define a schema for your data
const DepartmentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, unique: true },
  status: { type: Number, default: 1 },
  remarks: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null }
});

// Create a model based on the schema
const Department= mongoose.model('department', DepartmentSchema);
module.exports = Department;