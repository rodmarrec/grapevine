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
        console.log(error);
        // req.flash("error:", error);
    return res.redirect("/");
    }
})



// new route


// create route



// show route



// edit route


// update route



//  delete route


module.exports = router;