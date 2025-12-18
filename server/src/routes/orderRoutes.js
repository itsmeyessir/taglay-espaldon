const express = require('express');
const router = express.Router();
const {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getFarmerOrders,
  updateOrderToPaid,
  updateOrderStatus,
} = require('../controllers/orderController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', protect, addOrderItems);
router.get('/myorders', protect, getMyOrders);
router.get('/farmer', protect, authorizeRoles('farmer'), getFarmerOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);
router.put('/:id/status', protect, authorizeRoles('admin', 'farmer'), updateOrderStatus);

module.exports = router;
