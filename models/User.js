const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: [true, "You must enter an email"] },
        password: { type: String, required: [true, "You must enter a password" ] },
    },
    { timestamps: true }
);


const User = mongoose.model("User", userSchema);

module.exports = User;