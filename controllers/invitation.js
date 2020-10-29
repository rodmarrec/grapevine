const express = require("express");
const router = express.Router();

const db = require("../models")
const { findByIdAndUpdate } =  require("../models/Invitation");

// base route is /invitations


// index
const index = (req, res) => {
    db.Invitation.find({}, (error, foundInvitations) => {
        if (error) return res.send(error);
    
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
            console.log(error);
            return res.send(error);
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
            console.log(error);
            return res.send(error);
        }
        db.Profile.findById(req.body.profile, function (error, foundProfile) {
            if (error) {
            console.log(error);
            return res.send(error);
            }
    
            console.log(foundProfile);
            foundBrewery.Invitations.push(createdInvitation);
            foundBrewery.save();
    
            res.redirect("invitations/mailbox");
        });
    });
};


// update
const update = (req, res) => {
    db.Invitation.findByIdAndUpdate(req.params.id, req.body, { new: true }, (
        error,
        updatedInvitation
        ) => {
        if (error) {
            console.log(error);
            return res.send(error);
        }
        res.redirect(`/invitations/${updatedInvitation._id}`);
    });
};


// delete
const destroy = (req, res) => {
    db.Invitation.findByIdAndDelete(req.params.id, (error, deletedInvitation)=> {
        if (error) {
            console.log(error);
            return res.send(error);
        }
    
        db.Profile.findById(deletedInvitation.profile, function (error, foundProfile) {
            if (error) {
            console.log(error);
            return res.send(error);
            }
    
            foundProfile.invitations.remove(deletedInvitation);
            foundProfile.save();
    
            res.redirect(`/breweries/${deletedInvitation.profile}`);
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