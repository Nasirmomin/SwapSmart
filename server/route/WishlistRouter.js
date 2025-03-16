import express from "express";
import {
    addToWishlist,
    getUserWishlist,
    removeFromWishlist
} from "../controller/Wishlist.js";

const Wishlistrouter = express.Router();

Wishlistrouter.post("/", addToWishlist);
Wishlistrouter.get("/:user_id", getUserWishlist);
Wishlistrouter.delete("/", removeFromWishlist);

export default Wishlistrouter;