import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

const mongoURI =
  process.env.MONGODB_URI || 'MONGODB_URI=mongodb+srv://nallavikram333779_db_user:Cafe2026Secure@cluster0.6jqitgq.mongodb.net/foxstories?retryWrites=true&w=majority&appName=Cluster0';

async function seedAdmin() {
  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log('✓ MongoDB connected');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({});
    if (existingAdmin) {
      console.log(`✓ Admin already exists: ${existingAdmin.email}`);
      process.exit(0);
    }

    // Create default admin
    const adminData = {
      username: 'admin',
      email: 'admin@foxstories.com',
      password: 'Admin@123',
    };

    const admin = new Admin(adminData);
    await admin.save();

    console.log('✓ Admin created successfully!');
    console.log('  Email: admin@foxstories.com');
    console.log('  Password: Admin@123');
    console.log('\n⚠️  IMPORTANT: Change this password after first login!');
  } catch (error) {
    console.error('✗ Error creating admin:', error.message);
    process.exit(1);
  } finally {
    mongoose.connection.close();
  }
}

seedAdmin();
