import express from 'express';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controller/Categories.js';

const Categoryrouter = express.Router();

// Routes
Categoryrouter.get('/', getAllCategories);
Categoryrouter.get('/:id', getCategoryById);
Categoryrouter.post('/', createCategory);
Categoryrouter.put('/:id', updateCategory);
Categoryrouter.delete('/:id', deleteCategory);

export default Categoryrouter;
