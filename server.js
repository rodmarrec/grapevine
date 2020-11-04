// External
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
// const session = require("express-session");
// const MongoStore = require("connect-mongo")(session);
// const flash = require("req-flash");



// Internal
const db = require("./models")
const messageController = require("./controllers/message");
const userController = require("./controllers/user");
// const authController = require("./controllers/auth")


// Instanced
const app = express();


// configuration
// require("dotenv").config();
const PORT = 4000
app.set("view engine", "ejs");



// Middleware
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
})
app.locals.moment = require("moment");

// app.use(express.session({
//     resave: false,
//     saveUninitialized: false,
//     secret: "grapes",
//     store: new MongoStore({
//         url:
//         process.env.MONGODB_URI || "mongodb://localhost:27017/gv-sessions"
//     }),
//     cookie: {
//         maxAge: 1000 * 60 * 24 * 7 * 2,
//     },
// }));

// app.use(flash());

// auth Required
// const authRequried = function (req, res, next) {
//     if (!req.session.currentUser) {
//         return res.redirect("/");
//     }
//     next();
// };


// view routes
app.get("/", (req, res) => {
    res.render("landing-page");
})

// auth routes
// app.use("/auth", authController);

// message routes
app.use("/messages", messageController);

// user routes
app.use("/user", userController );


// Server Listener
app.listen(PORT, () => {
    console.log(`Listening for client request on ${PORT}`);
})