const Tour = require("../model/Tour");

exports.getTourService = async (queries) => {
  const tours = await Tour.find({})
    .skip(queries.skip)
    .limit(queries.limit)
    .sort(queries.sortBy)
    .select(queries.fields);
  return tours;
};

exports.saveProductService = async (data) => {
  const tour = await Tour.create(data);
  console.log(tour);
  return tour;
};
exports.updateProductByIdService = async (productID, data) => {
  const result = await Tour.updateOne(
    { _id: productID },
    { $set: data },
    { runValidators: true }
  );
  return result;
};

exports.getProductByIdService = async (id) => {
  const tour = await Tour.findById({ _id: id });
  return tour;
};
