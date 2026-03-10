import express from 'express';
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
  cancelOrder,
} from '../controllers/orderController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/', createOrder);
router.get('/:id', getOrder);

// Admin routes
router.get('/', authenticateToken, getOrders);
router.put('/:id/status', authenticateToken, updateOrderStatus);
router.delete('/:id', authenticateToken, cancelOrder);

export default router;
