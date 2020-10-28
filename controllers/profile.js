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

//new
const create = (req, res) => {
    db.Profile.find({}, (error, foundProfile) => {
        if (error) return res.send(error);

        const context = {
            profile: foundProfile,
        };
        res.render("profile/new", context);
    });
};

//show
const show = (req,res) =>{
    return res.send('profile show')  
}

//create
router.post('/', function(req,res){
	return res.send('profile create') 
	return res.send({route: "Create", body: req.body}) 
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