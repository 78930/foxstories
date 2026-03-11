import express from 'express';
import { adminLogin, createAdmin, getDashboardSummary } from '../controllers/adminController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', adminLogin);
router.post('/create', createAdmin); // For initial setup only
router.get('/dashboard-summary', authenticateToken, getDashboardSummary);

export default router;
