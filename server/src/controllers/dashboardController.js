const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private (Admin & Farmer)
const getDashboardStats = async (req, res, next) => {
  try {
    const isFarmer = req.user.role === 'farmer';
    const isBuyer = req.user.role === 'buyer'; // Check for buyer
    const userId = req.user._id;

    // 1. Build Query Filters
    let orderFilter = {};
    let productFilter = {};

    if (isFarmer) {
      orderFilter = { 'items.farmerId': userId };
      productFilter = { farmerId: userId };
    } else if (isBuyer) {
      orderFilter = { buyerId: userId };
      // Buyers don't have "their own" products to count, maybe we can count products in their "watchlist" later
      // For now, productFilter remains empty or we can just not query products for them
    }

    // 2. Run Counts
    // If buyer, productCount is not really relevant unless we mean "unique products bought". 
    // Let's count unique products bought for buyers.
    let productCountPromise;
    if (isBuyer) {
      productCountPromise = Order.distinct('items.productId', orderFilter).then(ids => ids.length);
    } else {
      productCountPromise = Product.countDocuments(productFilter);
    }

    const [productCount, orderCount, userCount] = await Promise.all([
      productCountPromise,
      Order.countDocuments(orderFilter),
      (isFarmer || isBuyer) ? Promise.resolve(0) : User.countDocuments(),
    ]);

    // 3. Calculate Revenue / Spending (Aggregation)
    let revenuePipeline = [];

    if (isFarmer) {
      revenuePipeline = [
        { $match: { ...orderFilter, status: { $ne: 'cancelled' } } },
        { $unwind: '$items' },
        { $match: { 'items.farmerId': userId } },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
          },
        },
      ];
    } else {
      // Admin (Total Revenue) & Buyer (Total Spent) use the same logic: sum of order totals
      revenuePipeline = [
        { $match: { ...orderFilter, status: { $ne: 'cancelled' } } },
        { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } },
      ];
    }

    const revenueResult = await Order.aggregate(revenuePipeline);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    // 4. Monthly Revenue / Spending (Chart)
    let chartPipeline = [];
    if (isFarmer) {
      chartPipeline = [
        { $match: { ...orderFilter, status: { $ne: 'cancelled' } } },
        { $unwind: '$items' },
        { $match: { 'items.farmerId': userId } },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
            },
            revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
            orders: { $addToSet: '$_id' },
          },
        },
        {
          $project: {
            _id: 1,
            revenue: 1,
            orders: { $size: '$orders' }
          }
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
        { $limit: 6 }
      ];
    } else {
      // Admin & Buyer (Total Order Value per month)
      chartPipeline = [
        { $match: { ...orderFilter, status: { $ne: 'cancelled' } } },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
            },
            revenue: { $sum: '$totalPrice' }, // For buyer, this is "spending"
            orders: { $sum: 1 },
          },
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
        { $limit: 6 }
      ];
    }

    const monthlyRevenue = await Order.aggregate(chartPipeline);

    const chartData = monthlyRevenue.map(item => {
      const date = new Date(item._id.year, item._id.month - 1);
      return {
        month: date.toLocaleString('default', { month: 'short' }),
        revenue: item.revenue,
        orders: item.orders
      };
    });

    // 5. Recent Orders
    const recentOrders = await Order.find(orderFilter)
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('buyerId', 'name email');

    res.status(200).json({
      counts: {
        products: productCount,
        orders: orderCount,
        users: userCount,
      },
      totalRevenue,
      chartData,
      recentOrders,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
};
