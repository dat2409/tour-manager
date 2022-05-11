const express = require('express');
const router = express.Router();
const serviceController = require('../controller/ServiceController');

router.post('/', serviceController.create);
router.get('/:id', serviceController.show);
router.get('/', serviceController.index);
router.get('/edit/:id', serviceController.edit);
router.patch('/:id', serviceController.update);
router.delete('/:id', serviceController.delete);

module.exports = router;
