const ObjectId = require("mongoose").Types.ObjectId;
const {
  getTourService,
  getTourByIdService,
  updateTourByIdService,
  saveTourService,
  getThreeTour,
} = require("../services/Tour.service");

exports.getTour = async (req, res, next) => {
  try {
    const queries = {};

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }

    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * Number(limit);
      queries.skip = skip;
      queries.limit = Number(limit);
    }

    const tours = await getTourService(queries);

    res.send(tours);
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Data can't get.Something went wrong",
      error: error.message,
    });
  }
};

exports.saveTour = async (req, res, next) => {
  try {
    const tour = await saveTourService(req.body);
    await tour.save();
    res.status(200).send({
      status: true,
      message: "Tour save successfully",
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Data can't inserted",
      error: error.message,
    });
  }
};

exports.updateProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: `Not a valid the id:${id}` });
    }

    const result = await updateTourByIdService(id, req.body);

    if (!result.modifiedCount) {
      return res
        .status(400)
        .json({ success: false, error: `Could not update the Data` });
    }

    if (!result.matchedCount) {
      return res
        .status(400)
        .json({ success: false, error: `Could not find the Data` });
    }

    res.status(200).json({
      status: true,
      message: "Data can be updated",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Data can't inserted",
      error: error.message,
    });
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      res.status(400).send({
        success: false,
        error: `Not a valid the id: ${id}`,
      });
    }

    const tour = await getTourByIdService(id);

    // view count
    tour.views = (await tour.views) + 1;
    const result = await updateTourByIdService(id, tour);

    res.status(200).json({
      status: true,
      message: `Find the product by ${id}`,
      data: tour,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Data is not found",
      error: error.message,
    });
  }
};

exports.getTopThreeViewedTour = async (req, res, next) => {
  try {
    const queries = {};
    queries.sortBy = "-views";
    queries.limit = 3;

    const tour = await getThreeTour(queries);
    res.json(tour);

  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Data is not found",
      error: error.message,
    });
  }
};

exports.getTopThreeCheapestTour = async (req, res, next) => {
  try {
    const queries = {};
    queries.sortBy = "price";
    queries.limit = 3;

    const tour = await getThreeTour(queries);
    res.json(tour);
    
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Data is not found",
      error: error.message,
    });
  }
};
