const express = require('express');
const router = express.Router();

const db = require('../models')

// base route is /profile


//index
const index = (req, res) => {
    db.Profile.find({}, (error, foundProfiles) => {
        if (error) return res.send(error);

        const context = {
            profiles: foundProfiles
        };
        res.render('profile/index', context)
    });
};

//show
const show = (req, res) => {
        db.Profile.findById(req.params.id)
        .populate("profile")
        .exec((error, foundProfile) => {
            if (error) {
                console.log(error);
                return res.send(error);
            }
    
        const context = { 
            Profile: foundProfile 
        };
        res.render("profile/show", context);
    });
};


//create
const create = (req, res) => {
    db.Profile.find({}, (error, foundProfile) => {
        if (error) return res.send(error);

        const context = {
            profile: foundProfile,
        };
        res.render("profile/new", context);
    });
};


// update
const update = (req, res) => {
        db.Brewery.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (error, updatedBrewery) => {
            if (error) {
            console.log(error);
            return res.send(error);
            }
    
            res.redirect(`/breweries/${updatedBrewery._id}`);
        }
        );
    };




module.exports = {
    index,
    show,
    create,
    update,
    destroy,
}