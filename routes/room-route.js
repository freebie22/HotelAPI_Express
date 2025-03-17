const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/booking-controller");

router.get("/", bookingController.getAllBookings);

router.get("/getBooking/:id", bookingController.getBookingById);

router.post("/createBooking", bookingController.createBooking);

router.patch("/updateBooking/:id", bookingController.updateBooking);

router.delete("/deleteBooking", bookingController.deleteBooking);

module.exports = router;
