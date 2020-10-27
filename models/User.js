const mongoose = require('mongoose');


const userSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: [true, 'You must enter a full name' ] },
        email: { type: String, required: [true, 'You must enter an email'] },
        password: { type: String, required: [true, 'You must enter a password' ] },
        jobTitle: { type: String, default: 'open to work' },
        company: { type: String, default: 'n/a' },
        photo: { type: Buffer, default: 'https://imgur.com/7OXMxkE' },
        summary: { type: String },
        userType: { type: String },
        connections: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'PendingRequest'
            },
        ],
        pendingRequest: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
        ],
    }
);


const User = mongoose.model('User', userSchema);

module.exports = User;