import express from 'express';
import { addFavorite, getFavorites, removeFavorite } from '../controller/Favorites.js';

const Favoriterouter = express.Router();

Favoriterouter.post('/favorites', addFavorite); // Add favorite
Favoriterouter.get('/favorites', getFavorites); // Get all favorites
Favoriterouter.delete('/favorites/:id', removeFavorite); // Remove favorite by ID

export default Favoriterouter;