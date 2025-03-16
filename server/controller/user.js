import User from '../models/Users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new user
export const registerUser = async (req, res) => {
    const { full_name, email, password, phone, address, city, state, country, zip_code, profile_picture } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            full_name, email, password: hashedPassword, phone, address, city, state, country, zip_code, profile_picture
        });
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// Login user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// Update user
export const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.update(req.body, { where: { id } });
        if (user[0] === 0) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.destroy({ where: { id } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};
