import express from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controller/Product.js';

const Productrouter = express.Router();

Productrouter.get('/', getAllProducts);
Productrouter.get('/:id', getProductById);
Productrouter.post('/', createProduct);
Productrouter.put('/:id', updateProduct);
Productrouter.delete('/:id', deleteProduct);

export default Productrouter;
