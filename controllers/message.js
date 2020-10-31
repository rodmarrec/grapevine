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
    })
})


module.exports = router;
