const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');

const Favorite = sequelize.define('Favorite', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
}, { timestamps: true });

// Associations
Favorite.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Favorite.belongsTo(Product, { foreignKey: 'product_id', onDelete: 'CASCADE' });

module.exports = Favorite;
