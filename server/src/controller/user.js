import User from "../models/Users.js";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user" });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  const { full_name, email, password, phone, address, city, state, country, zip_code, profile_picture, is_verified } = req.body;
  try {
    const newUser = await User.create({
      full_name,
      email,
      password,
      phone,
      address,
      city,
      state,
      country,
      zip_code,
      profile_picture,
      is_verified
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
};

// Update user by ID
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { full_name, email, password, phone, address, city, state, country, zip_code, profile_picture, is_verified } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.update({ full_name, email, password, phone, address, city, state, country, zip_code, profile_picture, is_verified });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};

// Delete user by ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user" });
  }
};
