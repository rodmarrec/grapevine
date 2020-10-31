// External
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");


// Internal
const messageController = require("./controllers/message");


// Instanced
const app = express();


// configuration
const PORT = 4000;
app.set("view engine", "ejs");


// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
})


// view routes
app.get("/", (req, res) => {
    res.render("landing-page");
})


// message routes
app.use("/messages", messageController);


// Server Listener
app.listen(PORT, () => {
    console.log(`Listening for client request on ${PORT}`);
})