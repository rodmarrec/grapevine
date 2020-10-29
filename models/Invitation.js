const mongoose = require('mongoose');

const inviteSchema = new mongoose.Schema(
    {
        introduction: { type: String, required: false },       
    },
    {
        timestamps: true,
        createdAt: 'sentOn',
    }
);


const Invite = mongoose.model('Invite', inviteSchema);

module.exports = Invite;