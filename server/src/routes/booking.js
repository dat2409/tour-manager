const express = require('express');
const router = express.Router();
const bookingController = require('../controller/BookingController');

router.post('/:tourId', bookingController.create);

module.exports = router;
