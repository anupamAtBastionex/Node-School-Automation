const mongoose = require('mongoose');

// Define a schema for your data
const StaffTypeSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, unique: true },
  status: { type: Number, default: 1 },
  remarks: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default:null }
});

// Create a model based on the schema
const StaffType= mongoose.model('staff_type', StaffTypeSchema);
module.exports = StaffType;