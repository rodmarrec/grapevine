/* External Modules */
const express = require('express'); 
const path = require('path');
const methodOverride = require('method-override');


/* Internal Modules */
const db = require('./models');
const controllers = require('./controllers');

/* Instanced Modules */
const app = express();


/* Configuration */
const PORT = 4000
app.set('view engine', 'ejs'); 


/* Middleware */
app.use(express.static(path.join(__dirname, "public")));


/* Routes */

// Views routes
app.get('/', function (req, res) {
    res.render('index');
});





/* Server Listener */
app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});
