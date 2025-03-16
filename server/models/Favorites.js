import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConnection.js';
import User from './Users.js';
import Product from './Products.js';

const Favorite = sequelize.define('Favorite', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    user_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    product_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: 'Products',
            key: 'id'
        }
    },
    favorite_type: {
        type: DataTypes.ENUM('wishlist', 'watchlist', 'saved'),
        defaultValue: 'wishlist',
        comment: 'Defines the type of favorite (wishlist, watchlist, etc.)'
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Optional note for why the user favorited this item'
    },
    is_active: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: true,
        comment: 'Indicates if the favorite is active'
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'User ID who created this favorite'
    },
    updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: 'User ID who last updated this favorite'
    }
}, { 
    timestamps: true,
    indexes: [
        { name: 'favorite_user_index', fields: ['user_id'] },
        { name: 'favorite_product_index', fields: ['product_id'] }
    ]
});


export default Favorite;
