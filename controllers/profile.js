const express = require("express");
const router = express.Router();

const db = require("../models")

// base route is /profile


// index
const index = (req, res) => {
    db.Profile.find({}, (error, foundProfiles) => {
        if (error) return res.send(error);
    
        const context = {
            profiles: foundProfiles,
        };
        res.render("profiles/show-all", context);
    });
};


//show
const show = (req, res) => {
        db.Profile.findById(req.params.id)
        .populate("invitations")
        .exec((error, foundProfile) => {
            if (error) {
                console.log(error);
                return res.send(error);
            }
    
        const context = { 
            Profile: foundProfile 
        };
        res.render(`profile/home/${foundProfile._id}`, context);
    });
};


//create
const create = (req, res) => {
    db.Profile.find({}, (error, newProfile) => {
        if (error) return res.send(error);

        const context = {
            profile: newProfile,
        };
        res.render(`profile/home/${newProfile._id}`, context);
    });
};


// update
const update = (req, res) => {
        db.Profile.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (error, updatedProfile) => {
            if (error) {
            console.log(error);
            return res.send(error);
            }
    
            res.redirect(`/profile/home/${updatedProfile._id}`);
        }
    );
};


// delete
const destroy = (req, res) => {
    db.Profile.findByIdAndDelete(req.params.id, (error, deletedProfile) => {
        if (error) {
            console.log(error);
            return res.send(error);
        }
    
        db.Invitation.deleteOne({ profile: deletedProfile._id }, (
            error,
            removedInvitations
        ) => {
            if (error) {
            console.log(error);
            return res.send(error);
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