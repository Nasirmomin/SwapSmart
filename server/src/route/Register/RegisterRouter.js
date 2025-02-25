import express from 'express';
import { registerUser, loginUser } from '../../controller/Register/Register.js';

const Registerrouter = express.Router();

Registerrouter.post('/register', registerUser);
Registerrouter.post('/login', loginUser);

export default Registerrouter;
