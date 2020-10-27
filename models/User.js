const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        jobTitle: { type: String, default: 'open to work' },
        company: { type: String, default: 'n/a' },
        photo: { type: Buffer, default: 'https://imgur.com/7OXMxkE' },
        summary: { type: String },
        userType: { type: String },
        connections: [],
        pendingRequest: [],
    }
);


const User = mongoose.model('User', userSchema);

module.exports = User;