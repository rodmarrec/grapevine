const mongoose = require('mongoose');

const PendingRequest = new mongoose.Schema(
    {
        introduction: { type: String, required: false },       
    },
    {
        timestamps: true,
    }
);


const PendingRequest = mongoose.model('PendingRequest', PendingRequest);

module.exports = PendingRequest;