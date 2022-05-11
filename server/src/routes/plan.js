const express = require('express');
const router = express.Router();
const planController = require('../controller/PlanController');

router.post('/', planController.create);
router.get('/:id', planController.show);
router.get('/', planController.index);
router.get('/edit/:id', planController.edit);
router.patch('/:id', planController.update);
router.delete('/:id', planController.deletePlan);
router.delete('/dayPlan/:id', planController.deleteDayPlan);

module.exports = router;
