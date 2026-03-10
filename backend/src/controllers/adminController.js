import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';

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
