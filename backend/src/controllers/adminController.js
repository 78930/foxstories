import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import Order from '../models/Order.js';
import Reservation from '../models/Reservation.js';

// Admin login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }
    
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
    
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });
    
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET || 'your_jwt_secret_key_change_this_in_production',
      { expiresIn: '24h' }
    );
    
    res.json({ 
      token, 
      admin: { 
        id: admin._id, 
        email: admin.email, 
        username: admin.username 
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

// Create admin (for initial setup)
export const createAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password required' });
    }
    
    const existingAdmin = await Admin.findOne({});
    if (existingAdmin) return res.status(400).json({ message: 'Admin already exists' });
    
    const admin = new Admin({ username, email, password });
    await admin.save();
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(400).json({ message: 'Error creating admin', error: error.message });
  }
};

const countByStatus = (items) =>
  items.reduce((acc, item) => {
    const key = item?.status || 'unknown';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

export const getDashboardSummary = async (req, res) => {
  try {
    const [orders, reservations] = await Promise.all([
      Order.find().sort({ createdAt: -1 }).limit(10),
      Reservation.find().sort({ date: 1 }).limit(10),
    ]);

    const allOrders = await Order.find({}, { status: 1, totalAmount: 1 });
    const allReservations = await Reservation.find({}, { status: 1 });

    const orderCounts = countByStatus(allOrders);
    const reservationCounts = countByStatus(allReservations);

    const now = new Date();
    const title = `Fox Stories Dashboard (${now.toLocaleString()})`;

    const lines = [
      `*${title}*`,
      ``,
      `*Orders*`,
      `Total: ${allOrders.length}`,
      `Pending: ${orderCounts.pending || 0} | Confirmed: ${orderCounts.confirmed || 0} | Preparing: ${orderCounts.preparing || 0} | Ready: ${orderCounts.ready || 0} | Delivered: ${orderCounts.delivered || 0} | Cancelled: ${orderCounts.cancelled || 0}`,
      ``,
      `Latest Orders:`,
      ...(orders.length
        ? orders.map((o) => {
            const amt = typeof o.totalAmount === 'number' ? `₹${o.totalAmount.toFixed(2)}` : '';
            const type = o.orderType ? ` (${o.orderType})` : '';
            return `- ${o.customerName || 'Customer'}${type}: ${amt} • ${o.status || 'pending'}`;
          })
        : [`- None`]),
      ``,
      `*Reservations*`,
      `Total: ${allReservations.length}`,
      `Pending: ${reservationCounts.pending || 0} | Confirmed: ${reservationCounts.confirmed || 0} | Cancelled: ${reservationCounts.cancelled || 0}`,
      ``,
      `Upcoming Reservations:`,
      ...(reservations.length
        ? reservations.map((r) => {
            const d = r.date ? new Date(r.date).toLocaleDateString() : '';
            const t = r.time ? ` ${r.time}` : '';
            const g = r.guests ? ` (${r.guests} guests)` : '';
            return `- ${r.name || 'Guest'}: ${d}${t}${g} • ${r.status || 'pending'}`;
          })
        : [`- None`]),
    ];

    const text = lines.join('\n');

    res.json({
      text,
      stats: {
        orders: { total: allOrders.length, byStatus: orderCounts },
        reservations: { total: allReservations.length, byStatus: reservationCounts },
      },
      latest: { orders, reservations },
    });
  } catch (error) {
    console.error('Dashboard summary error:', error);
    res.status(500).json({ message: 'Failed to build dashboard summary', error: error.message });
  }
};
