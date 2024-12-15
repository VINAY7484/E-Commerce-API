import { catchAsync } from '../utils/errorHandler.js';
import { ApiError } from '../utils/errorHandler.js';
import { getPaginationOptions, getPaginationData } from '../utils/pagination.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

const getVendorProductIds = async (vendorId) => {
  const products = await Product.find({ vendor: vendorId }).select('_id');
  return products.map(p => p._id);
};

export const getOrders = catchAsync(async (req, res) => {
  const { page, limit, skip } = getPaginationOptions(req.query);
  const productIds = await getVendorProductIds(req.vendor._id);

  const [orders, total] = await Promise.all([
    Order.find({ product: { $in: productIds } })
      .populate('product')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    Order.countDocuments({ product: { $in: productIds } })
  ]);

  res.json({
    orders,
    ...getPaginationData(total, page, limit)
  });
});

export const updateOrderStatus = catchAsync(async (req, res) => {
  const productIds = await getVendorProductIds(req.vendor._id);

  const order = await Order.findOneAndUpdate(
    {
      _id: req.params.id,
      product: { $in: productIds }
    },
    { status: 'shipped' },
    { new: true }
  );

  if (!order) {
    throw new ApiError(404, 'Order not found');
  }

  res.json(order);
});