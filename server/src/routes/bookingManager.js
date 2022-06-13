const express = require('express');
const router = express.Router();
const bookingManagerController = require('../controller/BookingManagerController');

router.post('/invoices/:orderId', bookingManagerController.createInvoice);
router.get('/invoices/:invoiceId', bookingManagerController.showInvoice);
router.get('/invoices', bookingManagerController.allInvoices);
router.get('/orders/:orderId', bookingManagerController.showOrder);
router.get('/orders', bookingManagerController.allOrders);
router.get('/invoices/edit/:invoiceId', bookingManagerController.editInvoice);
router.patch('/invoices/:invoiceId', bookingManagerController.updateInvoice);
router.delete('/orders/:orderId', bookingManagerController.deleteOrder);
router.post('/sendEmail', bookingManagerController.sendEmail);
module.exports = router;
