const express = require('express');
const router = express.Router();

const db = require('../models')

// base route is /profile


//index
app.get('/', (req, res) => {
    db.Profile.find({}, (error, foundProfiles) => {
        if (error) return res.send(error);

        const context = {
            profiles : foundProfiles
        }

        res.render('profile/index', context)
    })
})