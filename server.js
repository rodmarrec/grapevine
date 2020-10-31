// External
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");


// Internal
const messageController = require("method-override");


// Instanced
const app = express();


// configuration
const PORT = 4000;


// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
})

app.use("/message", messageController);


// Server Listener
app.listen(PORT, () => {
    console.log(`Listening for client request on ${PORT}`);
})