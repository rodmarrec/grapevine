const express = require("express");
const router = express.Router();

const db = require("../models");


// base route is /user


// index route
router.get("/", async (req, res) => {
    try { 
        const foundUser = await db.User.find({});
        const context = {
            users: foundUser,
            // user: req.session.currentUser,
        }
        res.render("user-pages/profile", context);
    } catch (error) {
        console.log("error in user#index:", error);
        // req.flash("error:", error);
    return res.redirect("/");
    }
});


// new route
router.get("/new", (req, res) => {
    res.render("user/new")
});

// create route
router.post("/", (req, res) => {
    db.User.create(req.body, (error, createdUser) => {
        if(error) {
            console.log("error in user#create:", error);
            return res.send(error)
        }
        res.redirect("/")
    });
});


// show route
router.get("/:id", (req, res) => {
    db.User.findById(req.params.id).populate("messages").exec( (error, foundUser) => {
        //linking messages to user
            if(error) {
                console.log("error in user#show:", error);
                return res.send(error);
            }
            const context = {
                thisUser: foundUser,
                // user: req.session.currentUser
            };
            res.render("user-pages/profile", context)
    });
});


// edit route
router.get("/:id/edit", (req, res) => {
    db.User.findById(req.params.id, (error, foundUser) => {
        if(error){
            console.log("error in user#edit:", error);
            return res.send(error);
        }
        const context = { 
            user: foundUser 
        };
        res.render("user-pages/edit", context)
    });
});

// update route
router.put("/:id", (req, res) => {
    db.User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedUser) => {
        if(error){
            console.log("error in user#update:", error);
            return res.send(error);
        }
        res.redirect(`${updatedUser._id}`);
    });
});


//  delete route
router.delete("/:id", (req, res) => {
    db.User.findByIdAndDelete(req.params.id, (error, deletedUser) => {                                // remove posts after user is deleted, remove user's SubMessages
        if(error){
            console.log("error in user#delete:", error);
            return res.send(error);
        }
        db.SubMessage.remove({user: deletedUser._id}, (error, removedSubMessages) => {
            if(error){
                console.log("error in user-Messages#delete", error);
                return res.send(error);
            }
            req.session.destroy();
            res.redirect("/")
        });
    });
});

module.exports = router;