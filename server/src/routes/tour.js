const express = require('express');
const router = express.Router();
const tourController = require('../controller/TourController');

router.post('/', tourController.create);
router.get('/search/', tourController.search);
router.get('/date-desc', tourController.allToursByDateDesc);
router.get('/price-desc', tourController.allToursByPriceDesc);
router.get('/price-asc', tourController.allToursByPriceAsc);
router.get('/:id', tourController.show);
router.get('/', tourController.index);
router.get('/edit/:id', tourController.edit);
router.patch('/:id', tourController.update);
router.delete('/:id', tourController.delete);


module.exports = router;
