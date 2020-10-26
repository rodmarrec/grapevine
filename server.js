/* External Modules */
const express = require('express'); 
const app = express();

const path = require('path');
const methodOverride = require('method-override');


/* Internal Modules */
// const db = require('./models');
const controllers = require('./controllers');


/* Configuration */
const PORT = 4000
app.set('view engine', 'ejs'); 


/* Routes */
// Views routes
app.get('/', function (req, res) {
    res.render('index');
});





/* Server Listener */
app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});
