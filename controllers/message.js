const express = require("express");
const router = express.Router();
const db = require("../models");



/*  ANCHOR
jobRole routes 
(Message model prop) 
route is "messages/c"
*/
router.get("/c", async (req, res) => {
    try {
        const foundJobPosts = await db.Message.find({ jobRole: req.params.jobRole });
        const allJobRoles = await db.Message.distinct( "jobRole" );
        const context = {
            jobPosts: foundJobPosts,
            jobCategories: allJobRoles,
        };
        res.render("jobcategory-pages/index", context);
    } catch (error) {
        // req.flash("error:", error);
        return res.redirect("/messages");
    }
});





/* ANCHOR
message routes
(Message model)
route is /messages
*/

// message index route
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
        return
    });
});


// new message route
router.get("/new", (req, res) => {
    res.render("message-pages/new");
});

// create message route
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


// // create message route
// router.post("/", async (req, res) => {
//     try {
//         const foundUser = await db.User.findById(req.body.user);
//             console.log("message#create foundUser:", foundUser)

//         // const username = foundUser.username;
//         // req.body.username = username;
//         //     console.log("message#create username:", req.body.username)

//         const createdMessage = await db.Message.create(req.body);
            
//         // foundUser.messages.push(createdMessage);
//         // await foundUser.messages.save();
//         //     console.log("created message in user[]:", foundUser.messages)
        
//         res.redirect("/messages");
//     } catch (error) {
//         console.log("error in message#create:", error);
//             return res.send(error);
//     }
// })


// show message route
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


// edit message route
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

// update message route
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


// delete message route
router.delete("/:id", (req, res) => {
    db.Message.findByIdAndDelete(req.params.id, (error, deletedMessage) => {
        console.log(deletedMessage)
        if(error) {
            console.log("error in message#delete:", error);
        } 
        res.redirect("/messages");
    });
});


module.exports = router;
