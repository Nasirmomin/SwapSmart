import express from 'express';
import { addSubscriber, getSubscribers, deleteSubscriber } from '../controller/Subscriber.js';

const Subscriberrouter = express.Router();

Subscriberrouter.post('/subscribers', addSubscriber);       // Add subscriber
Subscriberrouter.get('/subscribers', getSubscribers);       // Get all subscribers
Subscriberrouter.delete('/subscribers/:id', deleteSubscriber); // Delete subscriber by ID

export default Subscriberrouter;
