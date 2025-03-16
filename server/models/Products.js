import { Sequelize, DataTypes } from 'sequelize';
import {sequelize} from '../config/dbConnection.js';
import User from './Users.js';
import Category from './Categories.js';
import Review from './Reviews.js';
import Order from './Orders.js';

const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    condition: { type: DataTypes.ENUM('New', 'Like New', 'Used', 'Refurbished'), allowNull: false },
    location: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    status: { type: DataTypes.ENUM('Available', 'Sold', 'Pending'), defaultValue: 'Available' },
    featured: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { timestamps: true });

// Associations
// Product.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
// Product.belongsTo(Category, { foreignKey: 'category_id', onDelete: 'CASCADE' });
// Product.hasMany(Review, { foreignKey: 'product_id', onDelete: 'CASCADE' });
// Product.belongsToMany(User, { through: 'Favorites', foreignKey: 'product_id', onDelete: 'CASCADE' });
// Product.belongsToMany(Order, { through: 'Orders', foreignKey: 'product_id', onDelete: 'CASCADE' });

export default Product;
