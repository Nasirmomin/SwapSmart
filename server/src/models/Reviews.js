const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');

const Review = sequelize.define('Review', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, validate: { min: 1, max: 5 } },
    comment: { type: DataTypes.TEXT },
}, { timestamps: true });

// Associations
Review.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Review.belongsTo(Product, { foreignKey: 'product_id', onDelete: 'CASCADE' });

module.exports = Review;

