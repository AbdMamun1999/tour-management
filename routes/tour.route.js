const express = require("express");
const tourControllers = require("../controllers/tour.controllers");
const router = express.Router();

router.route("/").get(tourControllers.getTour).post(tourControllers.saveTour);

router
  .route("/:id")
  .get(tourControllers.getProductById)
  .patch(tourControllers.updateProductById);

module.exports = router;
