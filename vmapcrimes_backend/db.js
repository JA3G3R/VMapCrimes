
require("dotenv").config();
const connString = process.env.DATABASE_URL;
const mongoose = require('mongoose');

function connectToDB() {

        mongoose.connect(connString, () => console.log("Connected to MongoDB"));
}

module.exports = connectToDB;