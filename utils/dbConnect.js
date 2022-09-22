const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
dotenv.config();

const dbConnection = () => {
  mongoose
    .connect(process.env.DATABASE_LOCAL)
    .then(() => console.log("Database connection is successful".yellow.bold))
    .catch((err) => console.log(err));
};

module.exports = dbConnection;
