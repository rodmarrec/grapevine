const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const db = require("../models");

// base path /

// register form
router.get("/register", (req, res) => {
    res.render("auth/register");
});