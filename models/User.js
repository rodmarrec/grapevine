const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

        username: {type: String, required: [true, 'you must provide a username.'], minlength: 4, maxlength: 20, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profilePic:  { type: String, default: "/public/assets/flaticon/user.svg"  },
        jobRole: { type: String, required: false },
        company: { type: String, required: false },
        location: { type: String, required: false },
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
    { timestamps: true, createdAt: "createdOn" }
);


const User = mongoose.model("User", userSchema);

module.exports = User;

