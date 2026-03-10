import Reservation from '../models/Reservation.js';

// Get all reservations (Admin)
export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ date: 1 });
    res.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ message: 'Error fetching reservations', error: error.message });
  }
};

// Get single reservation
export const getReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
    res.json(reservation);
  } catch (error) {
    console.error('Error fetching reservation:', error);
    res.status(500).json({ message: 'Error fetching reservation', error: error.message });
  }
};

// Create reservation
export const createReservation = async (req, res) => {
  try {
    const { name, email, phone, guests, date, time } = req.body;
    
    if (!name || !email || !phone || !guests || !date || !time) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    const reservation = new Reservation(req.body);
    const newReservation = await reservation.save();
    res.status(201).json(newReservation);
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(400).json({ message: 'Error creating reservation', error: error.message });
  }
};

// Update reservation status (Admin)
export const updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
    
    Object.assign(reservation, req.body);
    const updated = await reservation.save();
    res.json(updated);
  } catch (error) {
    console.error('Error updating reservation:', error);
    res.status(400).json({ message: 'Error updating reservation', error: error.message });
  }
};

// Cancel reservation
export const cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
    
    reservation.status = 'cancelled';
    const updated = await reservation.save();
    res.json(updated);
  } catch (error) {
    console.error('Error cancelling reservation:', error);
    res.status(500).json({ message: 'Error cancelling reservation', error: error.message });
  }
};
