require("dotenv").config();
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Hotel = require("../models/hotel");

const getAllHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find({});
    if (!hotels) {
      throw new HttpError("No hotels were found in DB", 404);
    }
    res.status(200).json({ status: true, hotels: hotels });
  } catch (error) {
    return next(error);
  }
};

const getHotelById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      throw new HttpError("Hotel not found", 404);
    }
    res.status(200).json({ status: true, hotel: hotel });
  } catch (error) {
    return next(error);
  }
};

const createHotel = async (req, res, next) => {
  try {
    const { name, address, map, description, image } = req.body;

    const newHotel = await Hotel.create({
      name,
      address,
      map,
      description,
      image,
      createdAt: new Date(),
    });

    res.status(201).json({
      status: true,
      hotel: newHotel,
      message: "Hotel was created successfully",
    });
  } catch (error) {
    return next(error);
  }
};

const updateHotel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, address, map, description, image } = req.body;

    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      { name, address, map, description, image },
      { new: true }
    );

    if (!updatedHotel) {
      throw new HttpError("Hotel not found", 404);
    }

    res.status(200).json({
      status: true,
      hotel: updatedHotel,
      message: "Hotel was updated successfully",
    });
  } catch (error) {
    return next(error);
  }
};

const deleteHotel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedHotel = await Hotel.findByIdAndDelete(id);
    if (!deletedHotel) {
      throw new HttpError("Hotel not found", 404);
    }
    res.status(200).json({
      status: true,
      message: "Hotel was deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel,
};
