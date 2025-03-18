import express from 'express';
import { registerUser, loginUser, getAllUsers, updateUser, deleteUser , getCurrentUser , updateCurrentUser } from '../controller/user.js';
import authMiddleware from '../middleware/auth.js';
const router = express.Router();

// Register route
router.post('/sign', registerUser);

// Login route
router.post('/login', loginUser);

// Get all users route (protected)
router.get('/',  getAllUsers);

// Update user route (protected)
router.put('/:id', updateUser);

// Delete user route (protected)
router.delete('/:id', deleteUser);

router.get('/profile', authMiddleware, getCurrentUser);

router.put('/profile', authMiddleware, updateCurrentUser);
export default router;
