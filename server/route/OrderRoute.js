import express from 'express';
import { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } from '../controller/Order.js';

const Orderrouter = express.Router();

Orderrouter.get('/', getAllOrders);
Orderrouter.get('/:id', getOrderById);
Orderrouter.post('/', createOrder);
Orderrouter.put('/:id', updateOrder);
Orderrouter.delete('/:id', deleteOrder);

export default Orderrouter;
