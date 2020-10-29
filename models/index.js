const mongoose = require('mongoose');

// connection string
// require("dotenv").config();
const connectionString =
    process.env.MONGODB_URI || 'mongodb://localhost:27017/grapevine';
const configOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose
  .connect(connectionString, configOptions)
  .then(() => console.log("MongoDB successfully connected..."))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));


module.exports = {
    Profile: require('./Profile'),
    // Invitations: require('./Invitation'),
};