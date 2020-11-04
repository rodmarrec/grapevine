const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

        username: {type: String, required: [true, 'you must provide a username.'], minlength: 4, maxlength: 20, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profilePic:  { type: String, default: "https://upload.wikimedia.org/wikipedia/commons/6/67/User_Avatar.png"  },
        jobRole: { type: String, required: false, default: "" },
        company: { type: String, required: false, default: "" },
        location: { type: String, required: false, default: "" },
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

