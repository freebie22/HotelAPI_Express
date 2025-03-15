require("dotenv").config();
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const Booking = require("../models/booking");

const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({});
    if (!bookings) {
      throw new HttpError("No bookings were found in DB", 404);
    }
    res.status(200).json({ status: true, bookings: bookings });
  } catch (error) {
    return next(error);
  }
};

const getBookingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) {
      throw new HttpError("Booking not found", 404);
    }
    res.status(200).json({ status: true, booking: booking });
  } catch (error) {
    return next(error);
  }
};

const createBooking = async (req, res, next) => {
  try {
    const { clientId, roomId, bookingStart, bookingEnd, totalPrice, status } =
      req.body;

    const newBooking = await Booking.create({
      clientId,
      roomId,
      bookingStart,
      bookingEnd,
      totalPrice,
      status,
      createdAt: new Date(),
    });

    res.status(201).json({
      status: true,
      booking: newBooking,
      message: "Booking was created successfully",
    });
  } catch (error) {
    return next(error);
  }
};

const updateBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { bookingStart, bookingEnd, totalPrice, status } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { bookingStart, bookingEnd, totalPrice, status },
      { new: true }
    );

    if (!updatedBooking) {
      throw new HttpError("Booking not found", 404);
    }

    res.status(200).json({
      status: true,
      booking: updatedBooking,
      message: "Booking was updated successfully",
    });
  } catch (error) {
    return next(error);
  }
};

const deleteBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      throw new HttpError("Booking not found", 404);
    }
    res.status(200).json({
      status: true,
      message: "Booking was deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
};
