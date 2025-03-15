const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    roomNumber: { type: Number, required: true, unique: true },
    roomType: { type: String, required: true },
    price: { type: Number, required: true },
    isAvaliable: { type: Number, required: true },
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
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

const Room = mongoose.model("rooms", RoomSchema);

module.exports = Room;
