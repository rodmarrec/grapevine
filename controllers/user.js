const express = require("express");
const router = express.Router();

const db = require("../models");


// base route is /user


// STUB index user route
router.get("/", async (req, res) => {
    try { 
        const foundUser = await db.User.find({});
        const context = {
            users: foundUser,
            // user: req.session.currentUser,
        }
        res.render("user-pages/index", context);
    } catch (error) {
        console.log("error in user#index:", error);
        // req.flash("error:", error);
    return res.redirect("/");
    }
});


// STUB  new user route
router.get("/login", (req, res) => {
    res.render("user-pages/login")
});

// STUB  create user route
router.post("/register", (req, res) => {
    db.User.create(req.body, (error, createdUser) => {
        if(error) {
            console.log("error in user#create:", error);
            return res.send(error)
        }
        res.redirect("/user/login")
    });
});


// STUB  login user route
router.post("/login", async (req, res) => {
    try {
        const foundUser = await db.User.findOne({ email: req.body.email });

        if(!foundUser){                                                                     
            console.log("User does not exist");
            return res.redirect("/user/login");
        }

        res.redirect(`/user/${foundUser._id}`)
    } catch(error) {
        console.log("error in user#login:", error);
    return res.redirect("/");
    }
})



// STUB show user route
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
            res.render("user-pages/index", context)
    });
});


// STUB edit user route
router.get("/:id/edit", (req, res) => {
    db.User.findById(req.params.id, (error, foundUser) => {
        if(error){
            console.log("error in user#edit:", error);
            return res.send(error);
        }
        const context = { 
            foundUser: foundUser 
        };
        res.render("user-pages/edit", context)
    });
});

// STUB update user route
router.put("/:id", (req, res) => {
    // console.log(req.params, req.body)
    db.User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedUser) => {
        if(error){
            console.log("error in user#update:", error);
            return res.send(error);
        }
        res.redirect(`${updatedUser._id}`);
    });
});


// STUB delete user route
router.delete("/:id", (req, res) => {
    db.User.findByIdAndDelete(req.params.id, (error, deletedUser) => {                                
        // remove posts after user is deleted, remove user's SubMessages
        if(error){
            console.log("error in user#delete:", error);
            return res.send(error);
        }
        // db.SubMessage.remove({user: deletedUser._id}, (error, removedSubMessages) => {
        //     if(error){
        //         console.log("error in user-Messages#delete", error);
        //         return res.send(error);
        //     }
        //     req.session.destroy();
                res.redirect("/")
        // });
    });
});

module.exports = router;