require("dotenv").config();
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const Client = require("../models/client");

const getAllClients = async (req, res, next) => {
  try {
    const clients = await Client.find({}).select("-password");
    if (!clients) {
      throw new HttpError("No clients were found in DB", 404);
    }
    res.status(200).json({ status: true, clients: clients });
  } catch (error) {
    return next(error);
  }
};

const getClientById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id).select("-password");
    if (!client) {
      throw new HttpError("Client not found", 404);
    }
    res.status(200).json({ status: true, client: client });
  } catch (error) {
    return next(error);
  }
};

const signUpClient = async (req, res, next) => {
  try {
    const { name, email, phone, password, image, loyaltyStatus } = req.body;

    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      throw new HttpError("Client with this email already exists.", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newClient = await Client.create({
      name,
      email,
      phone,
      password: hashedPassword,
      image,
      loyaltyStatus,
      createdAt: new Date(),
    });

    res.status(201).json({
      status: true,
      name: newClient.name,
      email: newClient.email,
      message: "Client was created successfully",
    });
  } catch (error) {
    return next(error);
  }
};

const loginClient = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const client = await Client.findOne({ email });
    if (!client) {
      throw new HttpError("No client found with this email", 404);
    }

    const passwordIsValid = await bcrypt.compare(password, client.password);
    if (!passwordIsValid) {
      throw new HttpError("Invalid password", 401);
    }

    const token = jwt.sign(
      { id: client._id, email: client.email },
      process.env.JWT_SECRET,
      { expiresIn: "30m" }
    );

    res.status(200).json({ status: true, token });
  } catch (error) {
    return next(error);
  }
};

const deleteClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedClient = await Client.findByIdAndDelete(id);
    if (!deletedClient) {
      throw new HttpError("Client not found", 404);
    }
    res.status(200).json({
      status: true,
      message: "Client was deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllClients,
  getClientById,
  signUpClient,
  loginClient,
  deleteClient,
};
