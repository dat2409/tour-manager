const express = require('express');
const router = express.Router();
const reviewController = require('../controller/ReviewController');

router.post('/', reviewController.create);
router.get('/:tourId', reviewController.showReviewsByTour);

module.exports = router;
