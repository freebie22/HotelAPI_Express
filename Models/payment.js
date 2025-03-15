const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    clientId: { type: mongoose.Schema.Types.ObjectId, required: true },
    bookingId: { type: mongoose.Schema.Types.ObjectId, required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    currency: { type: String, required: true },
    status: { type: String, required: true },
    createdAt: {
      type: Date,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { versionKey: false }
);

const Transaction = mongoose.model("transactions", TransactionSchema);

module.exports = Transaction;
