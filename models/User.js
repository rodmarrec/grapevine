const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: [true, "You must enter a username"], unique: true },
        email: { type: String, required: [true, "You must enter an email"], unique: true },
        password: { type: String, required: [true, "You must enter a password" ] },
        profilePic:  { type: String, default: "/public/assets/flaticon/user.svg"  },
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Message"
            },
        ],
        subMessages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "SubMessage"
            },
        ],
    },
    { 
        timestamps: true,
        createdAt: "createdAt"
    }
);


const User = mongoose.model("User", userSchema);

module.exports = User;