const mongoose = require("mongoose");

const submessageSchema = new mongoose.Schema(
    {
        subcontent: { type: String, required: true, minlength: 2, maxlength: 300},
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    },
    {
        timestamps: true,
        createdAt: "PostedOn",
    }  
);

const SubMessage = mongoose.model("SubMessage", submessageSchema);

module.exports = SubMessage;