const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    loyaltyStatus: {
      type: String,
    },
    createdAt: {
      type: Date,
    },
  },
  { versionKey: false }
);

const Client = mongoose.model("clients", ClientSchema);

module.exports = Client;
