const mongoose = require('mongoose');

// Define a schema for your data
const AttendanceSchema = new mongoose.Schema({
  student_id: { type: String, required: true },
  attendance_date: { type: String, required: true },
  attendance_status: { type: String, required: true },
  attendance_remarks: { type: String },
  attendance_marked_by: { type: String },
  annual_year: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null }
});

// Create a model based on the schema
const Attendance= mongoose.model('attendance', AttendanceSchema);
module.exports = Attendance;