const { saveProductService } = require("../services/Tour.service");

exports.getTour = async (req, res, next) => {
  console.log("get all tour");
  res.send("this is get all tour");
};

exports.saveTour = async (req, res, next) => {
    console.log(req.body)
  try {
    const tour =await saveProductService(req.body);
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
