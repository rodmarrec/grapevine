const express = require("express");
const router = express.Router();
const db = require("../models");

// starting route is /grapevine

// route for index
router.get("/")