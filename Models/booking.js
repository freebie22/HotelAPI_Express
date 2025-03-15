const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    clientId: { type: mongoose.Schema.Types.ObjectId, required: true },
    roomId: { type: mongoose.Schema.Types.ObjectId, required: true },
    bookingStart: { type: Date, required: true },
    bookingEnd: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true },
    createdAt: {
      type: Date,
    },
  },
  { versionKey: false }
);

const Booking = mongoose.model("bookings", BookingSchema);

module.exports = Booking;
