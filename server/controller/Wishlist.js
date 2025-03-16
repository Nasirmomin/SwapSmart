import Wishlist from "../models/Wishlist.js";
import User from "../models/Users.js";
import Product from "../models/Products.js";

// Add a product to the wishlist
export const addToWishlist = async (req, res) => {
    try {
        const { user_id, product_id, created_by } = req.body;

        // Check if the user and product exist
        const user = await User.findByPk(user_id);
        const product = await Product.findByPk(product_id);

        if (!user || !product) {
            return res.status(404).json({ success: false, message: "User or Product not found" });
        }

        // Check if the product is already in the wishlist
        const existingWishlistItem = await Wishlist.findOne({ where: { user_id, product_id } });
        if (existingWishlistItem) {
            return res.status(400).json({ success: false, message: "Product already in wishlist" });
        }

        const wishlistItem = await Wishlist.create({
            user_id,
            product_id,
            created_by,
            updated_by: created_by,
        });

        res.status(201).json({ success: true, message: "Product added to wishlist", wishlistItem });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding to wishlist", error: error.message });
    }
};

// Get all wishlist items for a user
export const getUserWishlist = async (req, res) => {
    try {
        const { user_id } = req.params;

        const wishlistItems = await Wishlist.findAll({
            where: { user_id },
            include: [{ model: Product, as: "product" }]
        });

        res.status(200).json({ success: true, wishlistItems });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching wishlist", error: error.message });
    }
};

// Remove a product from the wishlist
export const removeFromWishlist = async (req, res) => {
    try {
        const { user_id, product_id } = req.body;

        const wishlistItem = await Wishlist.findOne({ where: { user_id, product_id } });

        if (!wishlistItem) {
            return res.status(404).json({ success: false, message: "Wishlist item not found" });
        }

        await wishlistItem.destroy();
        res.status(200).json({ success: true, message: "Product removed from wishlist" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error removing from wishlist", error: error.message });
    }
};