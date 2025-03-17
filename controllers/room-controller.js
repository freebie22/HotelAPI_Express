require("dotenv").config();
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const Room = require("../models/room");

const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find({});
    if (!rooms) {
      throw new HttpError("No rooms were found in DB", 404);
    }
    res.status(200).json({ status: true, rooms: rooms });
  } catch (error) {
    return next(error);
  }
};

const getRoomById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id);
    if (!room) {
      throw new HttpError("Room not found", 404);
    }
    res.status(200).json({ status: true, room: room });
  } catch (error) {
    return next(error);
  }
};

const createRoom = async (req, res, next) => {
  try {
    const { roomNumber, roomType, price, isAvaliable, hotelId, image } =
      req.body;

    const newRoom = await Room.create({
      roomNumber,
      roomType,
      price,
      isAvaliable,
      hotelId,
      image,
      createdAt: new Date(),
    });

    res.status(201).json({
      status: true,
      room: newRoom,
      message: "Room was created successfully",
    });
  } catch (error) {
    return next(error);
  }
};

const updateRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { roomNumber, roomType, price, isAvaliable, image } = req.body;

    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      { roomNumber, roomType, price, isAvaliable, image },
      { new: true }
    );

    if (!updatedRoom) {
      throw new HttpError("Room not found", 404);
    }

    res.status(200).json({
      status: true,
      room: updatedRoom,
      message: "Room was updated successfully",
    });
  } catch (error) {
    return next(error);
  }
};

const deleteRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedRoom = await Room.findByIdAndDelete(id);
    if (!deletedRoom) {
      throw new HttpError("Room not found", 404);
    }
    res.status(200).json({
      status: true,
      message: "Room was deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
};
