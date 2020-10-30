const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const db = require("../models");

// base path /

// // register form
// router.get("/register", (req, res) => {
//     res.render("auth/register");
// });


// POST register route
const register = async (req, res) => {
try {
    const foundUser = await db.User.findOne({ email: req.body.email });
    if (foundUser) {
        return res.send({ message: "Account is already registered" });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
    await db.User.create(req.body);
    res.redirect("/login");
} catch (error) {
    res.send({ message: "Error inside the server:", err: error });
}
};


// // login form
// router.get("/login", (req, res) => {
// res.render("auth/login");
// });


// POST login route
const login = async (req, res) => {
    try {
        const foundUser = await db.User.findOne({ email: req.body.email });
        if (!foundUser) {
            return res.send({ message: "Email or Password incorrect" });
        }
        const match = await bcrypt.compare(req.body.password, foundUser.password);
        if (!match) {
            return res.send({ message: "Email or Password incorrect" });
        }
        req.session.currentUser = {
            username: foundUser.username,
            id: foundUser._id,
        }; 
        res.redirect("/breweries");
    } catch (error) {
        console.log(error);
        res.send({ message: "Error inside the server", err: error });
    }
};


// logout
const logout = async (req, res) => {
    req.session.destroy();
    res.redirect("/login");
};

module.exports = {
    register,
    login,
    logout,
}