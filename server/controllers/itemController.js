const Item = require('../models/Item');

// @desc    Get all items
// @route   GET /api/items
// @access  Public
const getItems = async (req, res) => {
  try {
    const items = await Item.find({});
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create an item
// @route   POST /api/items
// @access  Private/Admin
const createItem = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newItem = new Item({
      name,
      description,
    });

    const item = await newItem.save();
    res.status(201).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getItems,
  createItem,
};
