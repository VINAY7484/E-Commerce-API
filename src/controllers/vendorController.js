import { generateToken } from '../utils/auth.js';
import { catchAsync } from '../utils/errorHandler.js';
import { ApiError } from '../utils/errorHandler.js';
import Vendor from '../models/vendorModel.js';

export const register = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  const existingVendor = await Vendor.findOne({ email });
  if (existingVendor) {
    throw new ApiError(400, 'Email already registered');
  }

  const vendor = await Vendor.create({ name, email, password });
  const token = generateToken(vendor._id);

  res.status(201).json({ token });
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const vendor = await Vendor.findOne({ email });
  if (!vendor) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const isMatch = await vendor.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const token = generateToken(vendor._id);
  res.json({ token });
});