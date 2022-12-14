const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnection = require("./utils/dbConnect");
const colors = require("colors");
const errorHandler = require("./middlewares/errorHandlers");
const tourRouter = require("./routes/tour.route");

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
app.use("/tours", tourRouter);

app.get("/", (req, res) => {
  res.send("Tour management server is working");
});

// Global error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App is running on port ${port}`.red.bold);
});
