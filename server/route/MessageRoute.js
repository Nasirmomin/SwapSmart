import express from 'express';
import { getAllMessages, getMessagesBetweenUsers, sendMessage, markAsRead, deleteMessage } from '../controller/Message.js';

const Messagerouter = express.Router();

Messagerouter.get('/', getAllMessages);
Messagerouter.get('/:sender_id/:receiver_id', getMessagesBetweenUsers);
Messagerouter.post('/', sendMessage);
Messagerouter.put('/:id/read', markAsRead);
Messagerouter.delete('/:id', deleteMessage);

export default Messagerouter;
