// external imports
const express = require('express'); 
const path = require('path');
const methodOverride = require('method-override');

// internal imports
const db = require('./models');
const controllers = require('./controllers');

const PORT = process.env.PORT || 4000;
const app = express();


/* Configuration */

app.set('view engine', 'ejs'); 


/* Middleware */
app.use(express.static(path.join(__dirname, "public")));


/* Routes */

// Views routes
app.get('/', function (req, res) {
    res.render('index');
});


// User routes
app.get('/users', (req, res) => {
    db.User.find({}, (error, foundUsers) => {
        if (error) return res.send(error);

        const context = {
            users : foundUsers
        }

        res.render('user/index', context)
    })
})





/* Server Listener */
app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});
