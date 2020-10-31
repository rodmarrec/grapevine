const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
        content: { type: String, required: 
            [true, "You must enter message. 200 characters max"] },       
    },
    {
        timestamps: true,
        createdAt: "sentOn",
    },
);


const Message = mongoose.model("Message", messageSchema);

module.exports = Message;