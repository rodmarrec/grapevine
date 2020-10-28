//  imports
const express = require('express');
const router = express.Router();
const { profile } = require('../controllers')

//  routes
router.get( '/', profile.index );
router.get( './new', profile.new );
router.get( '/:id', profile.show );


//  exports
module.exports = router