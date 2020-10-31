// external imports
const express = require("express"); 
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);


// internal imports
const db = require("./models");
const routes = require("./routes");


// instanced modules
const app = express();


// configuration
require("dotenv").config();
// console.log(process.env);
const PORT = process.env.PORT || 4000;
app.set("view engine", "ejs"); 


// middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: "grapes",
        store: new MongoStore({
            url:
                process.env.MONGODB_URI || "mongodb://localhost:27017/grapevine",
        }),
        cookie: {
            maxAge: 1000 * 60 * 24 * 7 * 2,
        },
    })
);

const authRequried = function (req, res, next) {
    if (!req.session.currentUser) {
        return res.redirect("/login");
    }
    next();
};


//// views routes

// home (landing-page) page route
app.get("/", (req, res) => {
    res.render("landing-page",{ user: req.session.currentUser });
});

// profile page route
app.get("/profile", (req, res) => {
    res.render("index.ejs",{ user: req.session.currentUser });
});

// search all profiles route
app.get("/search", (req, res) => {
    res.render("profile/show-all",{ user: req.session.currentUser });
});

// mailbox page route
app.get("/mailbox", (req, res) => {
    res.render("message/mailbox",{ user: req.session.currentUser });
});



//// auth routes
app.use("/", routes.auth);

//message auth routes
app.use("/messages", routes.message);

// profile routes - base url for profile resource
app.use("/profile", routes.profile);



// server listener
app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});
