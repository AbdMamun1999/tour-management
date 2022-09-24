const Tour = require("../model/Tour");

exports.getTourService = async (queries) => {
  const tours = await Tour.find({})
    .skip(queries.skip)
    .limit(queries.limit)
    .sort(queries.sortBy)
    .select(queries.fields);
  return tours;
};

exports.saveTourService = async (data) => {
  const tour = await Tour.create(data);
  return tour;
};
exports.updateTourByIdService = async (tourId, data) => {
  const result = await Tour.updateOne(
    { _id: tourId },
    { $set: data },
    { runValidators: true }
  );
  return result;
};

exports.getTourByIdService = async (id) => {
  const tour = await Tour.findById(id);
  return tour;
};

exports.getThreeTour = async (queries) => {
  const tours = await Tour.find({}).sort(queries.sortBy).limit(queries.limit);
  return tours;
};
