const mongoose = require('mongoose');


const profileSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: [true, 'You must enter a full name' ] },
        email: { type: String, required: [true, 'You must enter an email'] },
        password: { type: String, required: [true, 'You must enter a password' ] },
        jobTitle: { type: String, default: 'open to work' },
        company: { type: String, default: 'n/a' },
        photo: { type: Buffer, default: 'https://imgur.com/7OXMxkE' },
        summary: { type: String },
        profileType: { type: String },
        connections: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Invitation'
            },
        ],
        invitation: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Profile'
            },
        ],
    }
);


const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;