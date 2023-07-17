const mongoose = require('mongoose');

// Define a schema for your data
const StaffSchema = new mongoose.Schema({
  type: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  mobile: {type: String, required: true, unique: true },
  email: {type: String, required: true, unique: true, trim:true, default: null },
  department: { type: Number, required: true, trim: true },
  joining_date: {type: Date, required: true },
  speciality: {type: String },
  address: {type: String },
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default:null}
});

// Create a model based on the schema
const Staff = mongoose.model('staff', StaffSchema);

module.exports = Staff;