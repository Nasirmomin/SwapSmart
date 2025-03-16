import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConnection.js';
import User from './Users.js';
import Category from './Categories.js';
import Review from './Reviews.js';
import Order from './Orders.js';

const Product = sequelize.define(
    'Product',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT },
        price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        discount_price: { type: DataTypes.DECIMAL(10, 2), allowNull: true }, // Discounted price
        condition: { 
            type: DataTypes.ENUM('New', 'Like New', 'Used', 'Refurbished'), 
            allowNull: false 
        },
        location: { type: DataTypes.STRING },
        quantity: { type: DataTypes.INTEGER, defaultValue: 1 }, // Multiple items
        tags: { 
            type: DataTypes.JSON, // Using JSON datatype instead of ARRAY
            defaultValue: []
        },
        brand: { type: DataTypes.STRING, allowNull: true }, // Brand name
        warranty_info: { type: DataTypes.STRING, allowNull: true }, // Warranty details
        image: { type: DataTypes.STRING }, // Store image URL
        status: { 
            type: DataTypes.ENUM('Available', 'Sold', 'Pending'), 
            defaultValue: 'Available' 
        },
        is_verified: { type: DataTypes.BOOLEAN, defaultValue: false }, // Verification flag
        is_featured: { type: DataTypes.BOOLEAN, defaultValue: false }, // Highlighted product
        views_count: { type: DataTypes.INTEGER, defaultValue: 0 }, // Track views
        negotiable: { type: DataTypes.BOOLEAN, defaultValue: true }, // Price negotiation
        is_active: { type: DataTypes.BOOLEAN, defaultValue: true }, // Soft delete functionality
        created_by: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Users', key: 'id' } },
        updated_by: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'Users', key: 'id' } },
    },
    { timestamps: true }
);


export default Product;