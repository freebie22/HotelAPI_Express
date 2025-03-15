require("dotenv").config();
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const HotelUser = require("../models/hotel_user");
const { default: mongoose } = require("mongoose");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await HotelUser.find({}).select("-password");
    if (!users) {
      throw new HttpError("No users were found in DB", 404);
    }
    res.status(200).json({ status: true, users: users });
  } catch (error) {
    return next(err);
  }
};

const searchForUser = async (req, res, next) => {
  try {
    const { _id, name, email } = req.body;

    let filter = {
      ...(_id ? { _id: new mongoose.Types.ObjectId(_id) } : {}),
      ...(name ? { name: name } : {}),
      ...(email ? { email: email } : {}),
    };

    const user = await HotelUser.find(filter).select("-password");

    if (!user) {
      throw new HttpError("No users were found by your request", 404);
    }

    res.status(200).json({ status: true, user: user });
  } catch (error) {
    return next(error);
  }
};

const signUpHotelUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const searchByEmail = await HotelUser.findOne({ email: email });

    if (searchByEmail) {
      throw new HttpError("User with this email already exists.", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await HotelUser.create({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
      isActive: false,
      noActivityReason: "Created but not logged in",
      createdAt: new Date(),
    });

    res.status(201).json({
      status: true,
      name: newUser.name,
      email: newUser.email,
      message: "User was created created successfully",
    });
  } catch (error) {
    return next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await HotelUser.findOne({
      $or: [{ name: name }, { email: email }],
    });

    if (!user) {
      throw new HttpError("No user were found by this login", 404);
    }

    let passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      throw new HttpError("Password is not correct", 404);
    }

    let token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_TOKEN,
      { expiresIn: "30m" }
    );

    if (!token) {
      throw new HttpError("Error while token creation", 500);
    }

    res.status(200).json({ status: true, token: token });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getAllUsers, searchForUser, signUpHotelUser, loginUser };
