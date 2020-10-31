const express = require("express");
const router = express.Router();

const db = require("../models")
const { findByIdAndUpdate } =  require("../models/message");

// base route is /messages


// index
const index = (req, res) => {
    db.message.find({}, (error, foundmessages) => {
        if (error) {
            console.log("Error in message#index:", error);
        }
        if(!foundmessages.length) {
            console.log("message: No messages found");
            return res.send("message: No messages found");
        }
        const context = {
            messages: foundmessages,
        };

        res.render("messages/mailbox", context);
    });
};


//show
const show = (req, res) => {
        db.message.findById(req.params.id, (error, foundmessage) => {
        if (error) {
            console.log("Error in message#show:", error);
            return res.send("Error in message#show:", error);
        }
        const context = { 
            message: foundmessage 
        };

        res.render(`messages/mailbox/${foundmessage._id}`, context);
    });
};


// create
const create = (req, res) => {
    console.log(req.body);
    db.message.create(req.body, (error, createdmessage) => {
        if (error) {
            console.log("Error in message#create:", error);
            return res.send("Error in message#create:", error);
        }
        db.Profile.findById(req.body.profile, function (error, foundProfile) {
            if (error) {
                console.log("Error in message-Profile#create:", error);
                return res.send("Error in message-Profile#create:", error);
            }
            console.log("profile found:", foundProfile);
            foundProfile.messages.push(createdmessage);
            foundProfile.save();
    
            res.redirect("messages/mailbox");
        });
    });
};


// update
const update = (req, res) => {
    db.message.findByIdAndUpdate(req.params.id, req.body, { new: true }, (
        error, updatedmessage) => {
        if (error) {
            console.log("Error in message#update:", error);
            return res.send("Error in message#update:", error);
        }

        res.redirect(`/messages/${updatedmessage._id}`);
    });
};


// delete
const destroy = (req, res) => {
    db.message.findByIdAndDelete(req.params.id, (error, deletedmessage)=> {
        if (error) {
            console.log("Error in message#destroy:", error);
            return res.send("Error in message#destroy:", error);
        }
    
        db.Profile.findById(deletedmessage.profile, function (error, foundProfile) {
            if (error) {
                console.log("Error in message-Profile#destroy:", error);
                return res.send("Error in message-Profile#destroy:", error);
            }
            
            console.log("profile found:", foundProfile);
            foundProfile.messages.remove(deletedmessage);
            foundProfile.save();
    
            res.redirect(`/messages/${deletedmessage.profile}`);
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