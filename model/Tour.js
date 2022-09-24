const mongoose = require("mongoose");

const tourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [100, "Name is too large"],
    },
    img: {
      type: String,
      require: true,
      trim: true,
      unique: [true, "Image link must be unique"],
    },
    price: {
      type: Number,
      require: true,
      min: [0, "Price can't negative"],
      trim: true,
    },
    description: {
      type: String,
      require: true,
      trim: true,
    },
    views: {
      type: Number,
      require: true,
      trim:true,
      min:0
    },
  },
  {
    timestamps: true,
  }
);

const Tour = new mongoose.model("Tour", tourSchema);

module.exports = Tour;
