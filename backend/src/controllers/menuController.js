import MenuItem from '../models/MenuItem.js';

// Get all menu items
export const getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ message: 'Error fetching menu items', error: error.message });
  }
};

// Get menu items by category
export const getMenuByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const items = await MenuItem.find({ category }).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    console.error('Error fetching category menu:', error);
    res.status(500).json({ message: 'Error fetching menu', error: error.message });
  }
};

// Get single menu item
export const getMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    console.error('Error fetching menu item:', error);
    res.status(500).json({ message: 'Error fetching item', error: error.message });
  }
};

// Create menu item (Admin)
export const createMenuItem = async (req, res) => {
  try {
    if (!req.body.name || !req.body.price || !req.body.category) {
      return res.status(400).json({ message: 'Missing required fields: name, price, category' });
    }
    
    const item = new MenuItem(req.body);
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating menu item:', error);
    res.status(400).json({ message: 'Error creating item', error: error.message });
  }
};

// Update menu item (Admin)
export const updateMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    
    Object.assign(item, req.body);
    const updated = await item.save();
    res.json(updated);
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(400).json({ message: 'Error updating item', error: error.message });
  }
};

// Delete menu item (Admin)
export const deleteMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted successfully', id: req.params.id });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({ message: 'Error deleting item', error: error.message });
  }
};
