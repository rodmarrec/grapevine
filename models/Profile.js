const mongoose = require("mongoose");


const profileSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: 
            [true, "You must enter your First and Last Name" ] },
        jobTitle: { type: String, default: "open to work" },
        company: { type: String, default: "n/a" },
        location: { type: String, default: "n/a" },
        photo: { type: Buffer, default: "https://imgur.com/7OXMxkE" },
        summary: { type: String },
        profileType: { type: String },
        
        network: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Invitation"
            },
        ],
        invitationIn: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Profile"
            },
        ],
        invitationOut: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Profile"
            },
        ],
    }
);


const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;