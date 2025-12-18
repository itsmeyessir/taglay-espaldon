const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  getMyProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getProducts);

// Protected routes (Farmers & Admins only)
router.get('/myproducts', protect, authorizeRoles('farmer', 'admin'), getMyProducts);
router.post('/', protect, authorizeRoles('farmer', 'admin'), createProduct);
router.put('/:id', protect, authorizeRoles('farmer', 'admin'), updateProduct);
router.delete('/:id', protect, authorizeRoles('farmer', 'admin'), deleteProduct);

// Get single product (Must be last get route)
router.get('/:id', getProductById);

module.exports = router;
