const {
  saveProductService,
  getTourService,
  updateProductByIdService,
  getProductByIdService,
} = require("../services/Tour.service");

exports.getTour = async (req, res, next) => {
  try {
    console.log(req.query);
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
    const tour = await saveProductService(req.body);
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
    const result = await updateProductByIdService(id, req.body);
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
