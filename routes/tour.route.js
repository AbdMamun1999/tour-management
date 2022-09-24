const express = require("express");
const tourControllers = require("../controllers/tour.controllers");
const viewCount = require("../middlewares/viewCount");
const router = express.Router();

router.route("/").get(tourControllers.getTour).post(tourControllers.saveTour);
router.route("/trending").get(tourControllers.getTopThreeViewedTour)
router.route("/cheapest").get(tourControllers.getTopThreeCheapestTour)

router
  .route("/:id")
  .get(tourControllers.getProductById)
  .patch(tourControllers.updateProductById);

module.exports = router;
