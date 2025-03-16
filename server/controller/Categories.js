import Category from '../models/Categories.js';

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching categories' });
  }
};

// Get category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching category' });
  }
};

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating category', error: error.message });
  }
};

// Update category by ID
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    const updatedCategory = await category.update(req.body);
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating category', error: error.message });
  }
};

// Delete category by ID
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    await category.destroy();
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting category' });
  }
};
