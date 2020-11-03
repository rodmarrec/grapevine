//Message is a Job Post

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        jobRole: { type: String, required: true, minlength: 2, maxlength: 50 },
        company: { type: String, required: true, minlength: 2, maxlength: 40 },
        location: { type: String, required: true, minlength: 2, maxlength: 50},
        link: { type: String, required: true, unique: 
            [true, "Post for this job already exists"] 
        },
        content: { type: String, required: false, minlength: 2, maxlength: 300 },       
    },
    {
        timestamps: true,
        createdAt: "PostedOn"
    },
);


const Message = mongoose.model("Message", messageSchema);

module.exports = Message;