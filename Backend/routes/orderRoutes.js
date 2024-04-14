const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/orders', authMiddleware, orderController.placeOrder);
router.get('/orders', authMiddleware, orderController.getUserOrders);
router.delete('/orders/:id', authMiddleware, orderController.cancelOrder);

module.exports = router;
