const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    name: { type: String, required: 'user name is required', trim: true },
    password: {
        type: String, required: 'password is required'
    }
}, { timestamps: true })
module.exports = mongoose.model('users', authorSchema)



