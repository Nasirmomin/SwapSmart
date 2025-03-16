// Controller (favoriteController.js)
import Favorite from '../models/Favorites.js';

// Add to favorites
export const addFavorite = async (req, res) => {
    const { user_id, product_id } = req.body;
    try {
        const favorite = await Favorite.create({ user_id, product_id });
        res.status(201).json(favorite);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding favorite' });
    }
};

// Get all favorites
export const getFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.findAll();
        res.status(200).json(favorites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching favorites' });
    }
};

// Remove from favorites
export const removeFavorite = async (req, res) => {
    const { id } = req.params;
    try {
        const favorite = await Favorite.findByPk(id);
        if (!favorite) return res.status(404).json({ message: 'Favorite not found' });

        await favorite.destroy();
        res.status(200).json({ message: 'Favorite removed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error removing favorite' });
    }
};
