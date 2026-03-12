import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MenuItem from './models/MenuItem.js';
import sampleMenuItems from '../sampleData.js';

dotenv.config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/foxstories';

async function seed() {
  await mongoose.connect(mongoURI, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  });

  const existingCount = await MenuItem.countDocuments();
  if (existingCount > 0) {
    console.log(`Menu already has ${existingCount} items. Skipping seed.`);
    return;
  }

  const inserted = await MenuItem.insertMany(sampleMenuItems);
  console.log(`Seeded ${inserted.length} menu items.`);
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  });

