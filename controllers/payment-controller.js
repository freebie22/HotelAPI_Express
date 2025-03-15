require("dotenv").config();
const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const Transaction = require("../models/payment");
const Booking = require("../models/booking");
const Client = require("../models/client");

const processPayment = async (req, res, next) => {
  try {
    const { clientId, bookingId, amount, paymentMethod, currency, createdBy } =
      req.body;

    const client = await Client.findById(clientId);
    if (!client) {
      throw new HttpError("Client not found", 404);
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      throw new HttpError("Booking not found", 404);
    }

    if (booking.totalPrice !== amount) {
      throw new HttpError("Payment amount does not match booking price", 400);
    }

    const newTransaction = await Transaction.create({
      clientId,
      bookingId,
      amount,
      paymentMethod,
      currency,
      status: "pending",
      createdAt: new Date(),
      createdBy,
    });

    res.status(201).json({
      status: true,
      message: "Payment initiated successfully",
      transactionId: newTransaction._id,
    });
  } catch (error) {
    return next(error);
  }
};

const confirmPayment = async (req, res, next) => {
  try {
    const { transactionId } = req.params;

    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      throw new HttpError("Transaction not found", 404);
    }

    if (transaction.status !== "pending") {
      throw new HttpError("Transaction cannot be confirmed", 400);
    }

    transaction.status = "completed";
    await transaction.save();

    res.status(200).json({
      status: true,
      message: "Payment confirmed successfully",
    });
  } catch (error) {
    return next(error);
  }
};

const cancelPayment = async (req, res, next) => {
  try {
    const { transactionId } = req.params;

    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      throw new HttpError("Transaction not found", 404);
    }

    if (transaction.status !== "pending") {
      throw new HttpError("Transaction cannot be canceled", 400);
    }

    transaction.status = "canceled";
    await transaction.save();

    res.status(200).json({
      status: true,
      message: "Payment canceled successfully",
    });
  } catch (error) {
    return next(error);
  }
};

const getClientTransactions = async (req, res, next) => {
  try {
    const { clientId } = req.params;

    const transactions = await Transaction.find({ clientId }).sort({
      createdAt: -1,
    });
    if (!transactions.length) {
      throw new HttpError("No transactions found for this client", 404);
    }

    res.status(200).json({ status: true, transactions });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  processPayment,
  confirmPayment,
  cancelPayment,
  getClientTransactions,
};
