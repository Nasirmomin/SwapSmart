import { Sequelize, DataTypes } from 'sequelize';
import {sequelize} from '../config/dbConnection.js';
import User from './Users.js';
import Product from './Products.js';

const Favorite = sequelize.define('Favorite', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
}, { timestamps: true });

// Associations
// Favorite.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
// Favorite.belongsTo(Product, { foreignKey: 'product_id', onDelete: 'CASCADE' });

export default Favorite;
