import express from 'express';
import { body } from 'express-validator';
import { auth } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import * as productController from '../controllers/productController.js';

const router = express.Router();

router.use(auth);

router.post('/',
  [
    body('name').trim().notEmpty().withMessage('Product name is required'),
    body('price').isFloat({ min: 0 }).withMessage('Valid price is required'),
    body('stock').isInt({ min: 0 }).withMessage('Valid stock quantity is required')
  ],
  validate,
  productController.createProduct
);

router.get('/', productController.getProducts);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;