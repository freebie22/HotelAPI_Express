const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/payment-controller");

router.post("/processPayment", paymentController.processPayment);

router.post("/confirmPayment/:id", paymentController.confirmPayment);

router.post("/cancelPayment/:id", paymentController.cancelPayment);

router.get(
  "/getTransactions/:clientId",
  paymentController.getClientTransactions
);

module.exports = router;
