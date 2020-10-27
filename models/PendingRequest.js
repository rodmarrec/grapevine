const mongoose = require('mongoose');

const pendingRequestSchema = new mongoose.Schema(
    {
        introduction: { type: String, required: false },       
    },
    {
        timestamps: true,
    }
);


const PendingRequest = mongoose.model('PendingRequest', pendingRequestSchema);

module.exports = pendingRequest;