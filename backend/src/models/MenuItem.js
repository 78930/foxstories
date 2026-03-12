import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: [
        'breakfast', 'lunch', 'dinner', 'desserts', 'beverages',
        'chicken', 'seafood', 'veg_starter', 'momos', 'fried_rice', 
        'noodles', 'curry', 'sauces', 'soup', 'rolls', 'sizzlers', 'sushi', 'platters'
      ],
      required: true,
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/300x200?text=No+Image',
    },
    available: {
      type: Boolean,
      default: true,
    },
    vegetarian: {
      type: Boolean,
      default: false,
    },
    'non-vegetarian': {
      type: Boolean,
      default: false,
    },
    spicy: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('MenuItem', menuItemSchema);
