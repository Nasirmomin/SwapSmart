import express from 'express';
import { registerUser, loginUser, getAllUsers, updateUser, deleteUser } from '../controller/user.js';

const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Get all users route (protected)
router.get('/',  getAllUsers);

// Update user route (protected)
router.put('/:id', updateUser);

// Delete user route (protected)
router.delete('/:id', deleteUser);

export default router;
