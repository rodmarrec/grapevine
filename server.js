// external imports
const express = require('express'); 
const path = require('path');
const methodOverride = require('method-override');

// internal imports
const db = require('./models');
const routes = require('./routes');

const PORT = process.env.PORT || 4000;
const app = express();


/* Configuration */

app.set('view engine', 'ejs'); 


/* Middleware */
app.use(express.static(path.join(__dirname, "public")));


/* Routes */

// Views routes
app.get('/', function (req, res) {
    res.render('landing');
});

app.use('/profile', routes.profile)







/* Server Listener */
app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});
