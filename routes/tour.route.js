const express = require("express");
const tourControllers = require("../controllers/tour.controllers");
const router = express.Router();

router.route("/").get(tourControllers.getTour).post(tourControllers.saveTour);

module.exports = router;
