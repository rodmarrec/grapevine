const express = require('express');
const router = express.Router();

const { profile } = require('../controllers')

router.get('/', profile.index)

module.exports = router