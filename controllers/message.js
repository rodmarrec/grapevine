const express = require("express");
const router = express.Router();
const db = require("../models");

// starting route is /messages

// index route
router.get("/", (req, res) => {
    db.Message.find({}, (error, allMessagesFromDB) => {
        if(error) {
            console.log("error:", error);
        } else {
            res.render("message-pages/index", {
                allMessages: allMessagesFromDB
            });
        }
    });
});


// new route
router.get("/newMessage", (req, res) => {
    res.render("message-pages/new");
});


module.exports = router;
