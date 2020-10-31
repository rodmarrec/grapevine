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
            res.render("profile-pages/index.ejs", {
                allMessages: allMessagesFromDB
            });
        }
    });
});


module.exports = router;
