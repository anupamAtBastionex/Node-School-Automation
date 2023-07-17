const mongoose = require('mongoose');

// Define a schema for your data
const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  father_name: { type: String, required: true, trim: true },
  age: { type: Number, required: true, trim: true },
  mobile: {type: String, required: true },
  email: {type: String, required: true, trim:true, default: null },
  admission_date: {type: String, required: true },
  class_name: {type: String, required: true },
  address: {type: String },
  image: { type: String },
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default:null}
});

// Create a model based on the schema
const Student = mongoose.model('students', StudentSchema);

module.exports = Student;