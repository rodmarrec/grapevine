const mongoose = require("mongoose");

// connection string
// require("dotenv").config();
const connectionString =
    process.env.MONGODB_URI || "mongodb://localhost:27017/grapevine";
const configOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
};

mongoose
  .connect(connectionString, configOptions)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));

  mongoose.connection.on('disconnected', (event) => {
    console.log('Mongodb disconnected', event);
  });


module.exports = {
    Profile: require("./Profile"),
    Invitation: require("./Invitation"),
};