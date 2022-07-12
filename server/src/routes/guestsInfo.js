const express = require('express');
const router = express.Router();
const guestController = require('../controller/GuestsController');

router.post('/', guestController.create);

module.exports = router;
