const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        jobTitle: { type: String, required: true },
        company: { type: String, required: true },
        location: { type: String, required: true},
        link: { type: String, required: true },
        content: { type: String, required: false },       
    },
    {
        timestamps: true,
        // createdAt: "sentOn",
    },
);


const Message = mongoose.model("Message", messageSchema);

module.exports = Message;