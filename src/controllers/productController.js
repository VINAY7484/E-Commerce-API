import { catchAsync } from '../utils/errorHandler.js';
import { ApiError } from '../utils/errorHandler.js';
import { getPaginationOptions, getPaginationData } from '../utils/pagination.js';
import Product from '../models/productModel.js';

export const createProduct = catchAsync(async (req, res) => {
  const product = await Product.create({
    ...req.body,
    vendor: req.vendor._id
  });
  res.status(201).json(product);
});

export const getProducts = catchAsync(async (req, res) => {
  const { page, limit, skip } = getPaginationOptions(req.query);

  const [products, total] = await Promise.all([
    Product.find({ vendor: req.vendor._id })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    Product.countDocuments({ vendor: req.vendor._id })
  ]);

  res.json({
    products,
    ...getPaginationData(total, page, limit)
  });
});

export const updateProduct = catchAsync(async (req, res) => {
  const product = await Product.findOneAndUpdate(
    { _id: req.params.id, vendor: req.vendor._id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  res.json(product);
});

export const deleteProduct = catchAsync(async (req, res) => {
  const product = await Product.findOneAndDelete({
    _id: req.params.id,
    vendor: req.vendor._id
  });

  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  res.json({ message: 'Product deleted successfully' });
});