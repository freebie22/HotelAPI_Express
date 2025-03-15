require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const HttpError = require("./models/http-error");

const hotelUserRoutes = require("./routes/hotel_users-route");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/hotelAPI/hotelUsers", hotelUserRoutes);

app.use((req, res, next) => {
  const error = new HttpError("No routes were found", 500);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.HeaderSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An Unknown Error Occured" });
});

mongoose
  .connect(process.env.DATABASE_CONNECTION)
  .then(() => {
    console.log("Successfull connection to DB");
    app.listen(5000);
    console.log("Server runs on 5000");
  })
  .catch((error) => {
    console.log(error);
  });
