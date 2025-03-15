const express = require("express");
const router = express.Router();

const hotelController = require("../controllers/hotel-controller");

router.get("/", hotelController.getAllHotels);

router.get("/getHotel/:id", hotelController.getHotelById);

router.post("/createHotel", hotelController.createHotel);

router.patch("/updateHotel/:id", hotelController.updateHotel);

router.delete("/deleteHotel", hotelController.deleteHotel);

module.exports = router;
