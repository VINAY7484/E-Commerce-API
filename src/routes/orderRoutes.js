import express from 'express';
import { auth } from '../middleware/authMiddleware.js';
import * as orderController from '../controllers/orderController.js';

const router = express.Router();

router.use(auth);

router.get('/', orderController.getOrders);
router.put('/:id', orderController.updateOrderStatus);

export default router;