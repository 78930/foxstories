import express from 'express';
import {
  getReservations,
  getReservation,
  createReservation,
  updateReservation,
  cancelReservation,
} from '../controllers/reservationController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/', createReservation);
router.get('/:id', getReservation);

// Admin routes
router.get('/', authenticateToken, getReservations);
router.put('/:id', authenticateToken, updateReservation);
router.delete('/:id', authenticateToken, cancelReservation);

export default router;
