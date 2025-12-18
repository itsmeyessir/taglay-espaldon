const Order = require('../models/Order');
const Product = require('../models/Product'); // Import Product model
const { orderSchema } = require('../utils/validation');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private (Buyer)
const addOrderItems = async (req, res, next) => {
  try {
    // 1. Validate Input
    const validation = orderSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400);
      throw new Error(validation.error.errors[0].message);
    }

    const {
      items,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = validation.data;

    // 2. Create Order
    const order = new Order({
      buyerId: req.user._id,
      items,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'buyerId',
      'name email'
    );

    if (order) {
      // Check permission: Buyer, Admin, or the Farmer involved in the order
      // Complex check for farmer: needs to see if they own any product in the order
      let isAuthorized = false;

      if (req.user.role === 'admin') isAuthorized = true;
      if (order.buyerId._id.toString() === req.user._id.toString()) isAuthorized = true;

      if (!isAuthorized && req.user.role === 'farmer') {
        // Check if farmer owns any product in the order
        // This is an expensive check for every view, but safe for prototype
        const productIds = order.items.map(item => item.productId);
        const farmerProducts = await Product.countDocuments({
          _id: { $in: productIds },
          farmerId: req.user._id
        });
        if (farmerProducts > 0) isAuthorized = true;
      }

      if (!isAuthorized) {
        res.status(403);
        throw new Error('Not authorized to view this order');
      }
      res.json(order);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ buyerId: req.user._id });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// @desc    Get orders containing logged-in farmer's products
// @route   GET /api/orders/farmer
// @access  Private (Farmer)
const getFarmerOrders = async (req, res, next) => {
  try {
    // 1. Find all products belonging to this farmer
    const products = await Product.find({ farmerId: req.user._id }).select('_id');
    const productIds = products.map(p => p._id);

    // 2. Find orders that contain any of these product IDs
    const orders = await Order.find({
      'items.productId': { $in: productIds }
    }).populate('buyerId', 'name email');

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (Admin/Farmer)
const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
      // If farmer, verify they are part of this order
      if (req.user.role === 'farmer') {
         // Re-verify ownership logic or trust getOrderById check if reused? 
         // Let's do a quick check here
         const productIds = order.items.map(item => item.productId);
         const count = await Product.countDocuments({
           _id: { $in: productIds },
           farmerId: req.user._id
         });
         if (count === 0) {
           res.status(403);
           throw new Error('Not authorized to manage this order');
         }
      }

      order.status = status;
      if (status === 'delivered') {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
      }

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getFarmerOrders,
  updateOrderToPaid,
  updateOrderStatus,
};