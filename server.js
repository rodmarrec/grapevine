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
console.log(process.env);
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
        return res.redirect("/landing");
    }
    next();
};


//// routes
// views 
app.get("/", function (req, res) {
    res.render("landing",{ user: req.session.currentUser });
});

// auth
app.use("/", controllers.auth);

//invitation auth routes
app.use("/invitations", authRequried, controllers.invitation);

// profile routes
app.use("/profiles", authRequried, controllers.profile);



// server listener
app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});
