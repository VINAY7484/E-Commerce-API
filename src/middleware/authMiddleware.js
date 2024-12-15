import { verifyToken } from '../utils/auth.js';
import { ApiError } from '../utils/errorHandler.js';
import Vendor from '../models/vendorModel.js';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new ApiError(401, 'Authentication required');
    }

    const decoded = verifyToken(token);
    const vendor = await Vendor.findById(decoded.id);

    if (!vendor) {
      throw new ApiError(401, 'Invalid authentication');
    }

    req.vendor = vendor;
    next();
  } catch (error) {
    next(error);
  }
};