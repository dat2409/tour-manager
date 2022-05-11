const express = require('express');
const testController = require('../controller/TestController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/all', auth.requireAuth,testController.all);
router.get('/staff', [auth.requireAuth, auth.isStaff] ,testController.staff);
router.get('/manager', [auth.requireAuth, auth.isManager] ,testController.manager);

module.exports = router;
