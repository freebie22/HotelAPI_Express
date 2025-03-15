const mongoose = require("mongoose");

const HotelUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    isFired: {
      type: Boolean,
    },
    isActive: {
      type: Boolean,
    },
    noActivityReason: {
      type: String,
    },
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    createdAt: {
      type: Date,
    },
  },
  { versionKey: false }
);

const HotelUser = mongoose.model("hotel_users", HotelUserSchema);

module.exports = HotelUser;
