const Product = require('../models/Product');
const { productSchema, productUpdateSchema } = require('../utils/validation');

// @desc    Get all products (with filtering and pagination)
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    const { category, keyword, page = 1, limit = 50 } = req.query;

    // Build query object
    let query = {};

    if (category) {
      query.category = category;
    }

    if (keyword) {
      query.title = { $regex: keyword, $options: 'i' }; // Case-insensitive search
    }

    // Pagination logic
    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .limit(Number(limit))
      .skip(skip)
      .populate('farmerId', 'name email'); // Populate farmer details

    const total = await Product.countDocuments(query);

    res.status(200).json({
      products,
      page: Number(page),
      pages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('farmerId', 'name email');

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in farmer's products
// @route   GET /api/products/myproducts
// @access  Private (Farmer)
const getMyProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ farmerId: req.user._id });
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private (Farmer/Admin)
const createProduct = async (req, res, next) => {
  try {
    // 1. Validate Input
    const validation = productSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400);
      throw new Error(validation.error.errors[0].message);
    }

    // 2. Create Product
    const product = await Product.create({
      ...validation.data,
      farmerId: req.user._id, // Set from auth middleware
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private (Farmer/Admin)
const updateProduct = async (req, res, next) => {
  try {
    // 1. Find Product
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    // 2. Check Ownership (unless Admin)
    if (product.farmerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('User not authorized to update this product');
    }

    // 3. Validate Update Data
    const validation = productUpdateSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400);
      throw new Error(validation.error.errors[0].message);
    }

    // 4. Update
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      validation.data,
      { new: true, runValidators: true } // Return new doc
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private (Farmer/Admin)
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    // Check Ownership
    if (product.farmerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('User not authorized to delete this product');
    }

    await product.deleteOne();

    res.status(200).json({ message: 'Product removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  getMyProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
