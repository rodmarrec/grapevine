const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
        content: { type: String},       
    },
    {
        timestamps: true,
        // createdAt: "sentOn",
    },
);


const Message = mongoose.model("Message", messageSchema);

module.exports = Message;