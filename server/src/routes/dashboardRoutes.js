const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/dashboardController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Only Admins and Farmers can view the dashboard stats (with logic to filter data)
router.get('/stats', protect, authorizeRoles('admin', 'farmer'), getDashboardStats);

module.exports = router;
