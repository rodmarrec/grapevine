const express = require("express");
const router = express.Router();
const db = require("../models");
// const { findByIdAndUpdate } = require("../models/message");

// starting route is /messages


// index route
router.get("/", (req, res) => {
    db.Message.find({}, (error, foundMessages) => {
        if(error) {
            console.log("error in message#index:", error);
            return res.send(error);
        } 
        const context = { 
            allMessages: foundMessages 
        }
        res.render("message-pages/index", context);
    });
});


// new route
router.get("/new", (req, res) => {
    res.render("message-pages/new");
});

// create route
router.post("/", (req, res) => {
    console.log(req)
    db.Message.create(req.body, (error, createdMessage) => {
        if(error) {
            console.log("error in message#create:", error);
            return res.send(error);
        } 
        console.log(req.body);
        console.log(createdMessage);
        res.redirect("/messages");
    });
});


// show route
router.get("/:id", (req, res) => {
    db.Message.findById(req.params.id, (error, foundMessage) => {
        if(error) {
            console.log("error in message#show:", error);
        }
        const context = { 
            foundMessage: foundMessage 
        }
        res.render("message-pages/show", context);
        
    });
});


// edit route
router.get("/:id/edit", (req, res) => {
    db.Message.findById(req.params.id, (error, foundMessage) => {
        if(error) {
            console.log("error in message#edit:", error);
        }
        const context = {
            foundMessage: foundMessage
        }
            res.render("message-pages/edit", context);
    });
});

// update route
router.put("/:id", (req, res) => {
    db.Message.findByIdAndUpdate({ _id: req.params.id }, req.body, 
        { new: true }, (error, updatedMessage) => {
            if(error) {
                console.log("error in message#update:", error);
            } else {
                console.log(updatedMessage);
                res.redirect(`/messages/${ req.params.id }`);
            }
    });
});


// delete route
router.delete("/:id", (req, res) => {
    db.Message.findByIdAndDelete(req.params.id, (error, deletedMessage) => {
        if(error) {
            console.log("error in message#delete:", error);
        } 
        res.redirect("/messages");
    });
});


module.exports = router;
