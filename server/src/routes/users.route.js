import express from 'express';
import User from '../models/user.model.js';

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ fullName: name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user' });
  }
});

export default router;
