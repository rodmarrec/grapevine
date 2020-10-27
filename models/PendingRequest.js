const mongoose = require('mongoose');

const pendingRequestSchema = new mongoose.Schema(
    {
        introduction: { type: String, required: false },       
    },
    {
        timestamps: true,
        createdAt: 'sentOn',
    }
);


const PendingRequest = mongoose.model('PendingRequest', pendingRequestSchema);

module.exports = PendingRequest;