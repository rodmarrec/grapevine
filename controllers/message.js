const express = require("express");
const router = express.Router();
const db = require("../models");

// starting route is /messages

// index route
router.get("/", (req, res) => {
    db.Message.find({}, (error, allMessagesFromDB) => {
        if(error) {
            console.log("error in message#index:", error);
        } else {
            res.render("message-pages/index", {
                allMessages: allMessagesFromDB
            });
        }
    });
});


// new route
router.get("/new", (req, res) => {
    res.render("message-pages/new");
});

// create route
router.post("/", (req, res) => {
    db.Message.create(req.body, (error, createdMessageInDB) => {
        if(error) {
            console.log("error in message#create:", error);
        } else {
            console.log(req.body)
            console.lof(createdMessageInDB);
            res.redirect("/messages")
        }
    });
});


// show route
router.get("/:id", (req, res) => {
    db.Message.findById(req.params.id, (error, foundMessage) => {
        if(error) {
            console.log("error in message#show:", error);
        } else {
            res.render("message-pages/show", {
                foundMessage: foundMessage
            });
        }
    });
});


// edit route
router.get("/:id/edit", (req, res) => {
    db.Message.findById(req.params.id, (error, foundMessage) => {
        if(error) {
            console.log("error in message#edit:", error);
        } else {
            res.render("message-pages/edit", {
                foundMessage: foundMessage
            });
        }
    });
});

// update route



module.exports = router;
