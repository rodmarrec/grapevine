const mongoose = require("mongoose");

// require("dotenv").config();
const connectionString = "mongodb://localhost:27017/messages-db";

// to fix all deprecation warnings in the MongoDB Node.js driver
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

mongoose.connection.on("connected", () => {
    console.log(`Mongoose connected to ${connectionString}`);
});

    mongoose.connection.on("disconnected", () => {
        console.log("Mongoose is disconnected");
    });

    mongoose.connection.on("error", (err) => {
        console.log(`Mongoose error: ${err}`);
    });

module.exports = {
    User: require("./User"),
    Message: require("./Message"),
    SubMessage: require("./SubMessage"),
}