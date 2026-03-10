import express from 'express';
import {
  getMenuItems,
  getMenuByCategory,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from '../controllers/menuController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getMenuItems);
router.get('/category/:category', getMenuByCategory);
router.get('/:id', getMenuItem);

// Admin routes
router.post('/', authenticateToken, createMenuItem);
router.put('/:id', authenticateToken, updateMenuItem);
router.delete('/:id', authenticateToken, deleteMenuItem);

export default router;
