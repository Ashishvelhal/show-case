const express = require('express');
const router = express.Router();
const { getItems, createItem } = require('../controllers/itemController');

// @route   GET /api/items
// @desc    Get all items
// @access  Public
router.route('/').get(getItems).post(createItem);

module.exports = router;
