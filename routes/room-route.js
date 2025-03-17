const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/booking-controller');

const roomController = require('../controllers/room-controller');

router.get('/', roomController.getAllRooms);

router.get('/getRoom/:id', roomController.getRoomById);

router.get('/checkAvailability/:roomNumber', roomController.checkAvailability);

router.post('/createRoom', roomController.createRoom);

router.patch('/updateRoom/:id', roomController.updateRoom);

router.delete('/deleteRoom', roomController.deleteRoom);

module.exports = router;
