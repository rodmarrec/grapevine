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

        res.render('profile/profile', context)
    });
};

//new
router.get("/new", function (req, res) {
    db.Profile.find({}, function (error, foundProfiles) {
        if (error) return res.send(error);
        const context = {
        profiles: foundProfiles,
        };
        res.render("profile/new", context);
    });
});

//create
router.post('/', function(req,res){
	return res.send('profile create') 
	return res.send({route: "Create", body: req.body}) 
})

//show
router.get('/:id', function(req,res){
	return res.send('profile show')  
})

//edit
router.get('/:id/edit', function(req,res){
	return res.send('profile edit')  
})

//update
router.put('/:id', function(req,res){
	return res.send('profile update')  
})

//delete
router.delete('/:id', function(req,res){
	return res.send('profile delete')  
})

module.exports = {
    index,
}