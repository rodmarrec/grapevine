const express = require("express");
const router = express.Router();

const db = require("../models")
const { findByIdAndUpdate } =  require("../models/Profile");

// base route is /profile


// index
router.get("/", (req, res) => {
    // db.Profile.find({}, (error, foundProfiles) => {
    //     if (error) {
    //         console.log("Error in profile#index:", error);
    //     }
    //     const context = {
    //         profiles: foundProfiles,
    //     };

        res.render("profile-pages/index");
    // });
});


// new route
router.get("/new", (req, res) => {
    res.render("profile-pages/index");
});

//create
const create = (req, res) => {
    db.Profile.find({}, (error, newProfile) => {
        if (error) {
            console.log("Error in profile#create:", error);
            return res.send("Error in profile#create:", error);
        }
        const context = {
            profile: newProfile,
        };

        res.render("profile-pages/index", context);
    });
};


//show
router.get("/:id", (req, res) => {
    db.Profile.findById(req.params.id)
    .populate("messages")
    .exec((error, foundProfile) => {
        if (error) {
            console.log("Error in profile#show:", error);
            return res.send("Error in profile#show:", error);
        }
    const context = { 
        Profile: foundProfile 
    };

    res.render("profile-pages/index", context);
});
});


// edit route
router.get("/:id/edit", (req, res) => {
    db.Profile.findById(req.params.id, (error, foundProfile) => {
        if(error) {
            console.log("error in profile#edit:", error);
        } else {
            res.render("profile-pages/edit", {
                foundProfile: foundProfile
            });
        }
    });
});

// update
router.put("/:id", (req, res) => {
        db.Profile.findByIdAndUpdate (req.params.id, req.body, { new: true }, ( 
            error, updatedProfile) => {
            if (error) {
                console.log("Error in profile#update:", error);
                return res.send("Error in profile#update:", error);
            }
    
            res.redirect("profile-pages/index");
        }
    );
});


// delete
router.delete("/:id", (req, res) => {
    db.Profile.findByIdAndDelete(req.params.id, (error, deletedProfile) => {
        if (error) {
            console.log("Error in profile#destroy:", error);
            return res.send("Error in profile#destroy:", error);
        }
        db.message.deleteOne({ profile: deletedProfile._id }, (error, removedmessages) => {
            if (error) {
                console.log("Error in profile-message#destroy:", error);
                return res.send("Error in profile-message#destroy:", error);
            }

            res.redirect("profile-pages/index");
        });
    });
});


module.exports = router;