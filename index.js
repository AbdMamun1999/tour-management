const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnection = require("./utils/dbConnect");
const colors = require("colors");
const errorHandler = require("./middlewares/errorHandlers");

// express app initializtion
const app = express();
dotenv.config();

// Server
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// db connection
dbConnection();

// user route

app.get("/", (req, res) => {
  res.send("Tour management server is working");
});

// Global error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App is running on port ${port}`.red.bold);
});


// Unhandle Rejection handlers
process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});
