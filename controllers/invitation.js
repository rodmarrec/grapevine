const express = require("express");
const router = express.Router();

const db = require("../models")
const { findByIdAndUpdate } =  require("../models/Invitation");

// base route is /invitations


// index
const index = (req, res) => {
    db.Invitation.find({}, (error, foundInvitations) => {
        if (error) {
            console.log("Error in invitation#index:", error);
        }
        if(!foundInvitations.length) {
            console.log("message: No invitations found");
            return res.send("message: No invitations found");
        }
        const context = {
            invitations: foundInvitations,
        };

        res.render("invitations/mailbox", context);
    });
};


//show
const show = (req, res) => {
        db.Invitation.findById(req.params.id, (error, foundInvitation) => {
        if (error) {
            console.log("Error in invitation#show:", error);
            return res.send("Error in invitation#show:", error);
        }
        const context = { 
            invitation: foundInvitation 
        };

        res.render(`invitations/mailbox/${foundInvitation._id}`, context);
    });
};


// create
const create = (req, res) => {
    console.log(req.body);
    db.Invitation.create(req.body, (error, createdInvitation) => {
        if (error) {
            console.log("Error in invitation#create:", error);
            return res.send("Error in invitation#create:", error);
        }
        db.Profile.findById(req.body.profile, function (error, foundProfile) {
            if (error) {
                console.log("Error in Invitation-Profile#create:", error);
                return res.send("Error in Invitation-Profile#create:", error);
            }
            console.log("profile found:", foundProfile);
            foundProfile.Invitations.push(createdInvitation);
            foundProfile.save();
    
            res.redirect("invitations/mailbox");
        });
    });
};


// update
const update = (req, res) => {
    db.Invitation.findByIdAndUpdate(req.params.id, req.body, { new: true }, (
        error, updatedInvitation) => {
        if (error) {
            console.log("Error in invitation#update:", error);
            return res.send("Error in invitation#update:", error);
        }

        res.redirect(`/invitations/${updatedInvitation._id}`);
    });
};


// delete
const destroy = (req, res) => {
    db.Invitation.findByIdAndDelete(req.params.id, (error, deletedInvitation)=> {
        if (error) {
            console.log("Error in invitation#destroy:", error);
            return res.send("Error in invitation#destroy:", error);
        }
    
        db.Profile.findById(deletedInvitation.profile, function (error, foundProfile) {
            if (error) {
                console.log("Error in invitation-Profile#destroy:", error);
                return res.send("Error in invitation-Profile#destroy:", error);
            }
            
            console.log("profile found:", foundProfile);
            foundProfile.invitations.remove(deletedInvitation);
            foundProfile.save();
    
            res.redirect(`/invitations/${deletedInvitation.profile}`);
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