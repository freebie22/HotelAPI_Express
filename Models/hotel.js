const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    map: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    createdAt: {
      type: Date,
    },
  },
  { versionKey: false }
);

const Hotel = mongoose.model("hotels", HotelSchema);

module.exports = Hotel;
