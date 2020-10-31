const express = require("express");
const router = express.Router();

const db = require("../models")
const { findByIdAndUpdate } =  require("../models/Profile");

// base route is /profile


// index
const index = (req, res) => {
    db.Profile.find({}, (error, foundProfiles) => {
        if (error) {
            console.log("Error in profile#index:", error);
        }
        const context = {
            profiles: foundProfiles,
        };

        res.render("profile/show-all", context);
    });
};


//show
const show = (req, res) => {
        db.Profile.findById(req.params.id)
        .populate("invitations")
        .exec((error, foundProfile) => {
            if (error) {
                console.log("Error in profile#show:", error);
                return res.send("Error in profile#show:", error);
            }
        const context = { 
            Profile: foundProfile 
        };

        res.render("profile/home", context);
    });
};


//create
const create = (req, res) => {
    db.Profile.find({}, (error, newProfile) => {
        if (error) {
            console.log("Error in profile#create:", error);
            return res.send("Error in profile#create:", error);
        }
        const context = {
            profile: newProfile,
        };

        res.render("profile/home", context);
    });
};


// update
const update = (req, res) => {
        db.Profile.findByIdAndUpdate (req.params.id, req.body, { new: true }, ( 
            error, updatedProfile) => {
            if (error) {
                console.log("Error in profile#update:", error);
                return res.send("Error in profile#update:", error);
            }
    
            res.redirect(`/profile/home/${updatedProfile._id}`);
        }
    );
};


// delete
const destroy = (req, res) => {
    db.Profile.findByIdAndDelete(req.params.id, (error, deletedProfile) => {
        if (error) {
            console.log("Error in profile#destroy:", error);
            return res.send("Error in profile#destroy:", error);
        }
        db.Invitation.deleteOne({ profile: deletedProfile._id }, (error, removedInvitations) => {
            if (error) {
                console.log("Error in profile-Invitation#destroy:", error);
                return res.send("Error in profile-Invitation#destroy:", error);
            }

            res.redirect("/landing");
        });
    });
};


module.exports = {
    index,
    show,
    create,
    update,
    destroy,
}