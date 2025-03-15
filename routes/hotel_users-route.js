const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const hotelUsersController = require("../controllers/hotel_users-controller");

router.get("/", hotelUsersController.getAllUsers);

router.post("/searchForUser", hotelUsersController.searchForUser);

router.post("/signUpHotelUser", hotelUsersController.signUpHotelUser);

router.post("/loginUser", hotelUsersController.loginUser);

module.exports = router;
