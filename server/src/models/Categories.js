const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');

const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.TEXT },
    image: { type: DataTypes.STRING },
    parent_category_id: { type: DataTypes.INTEGER, allowNull: true },
}, { timestamps: true });

Category.hasMany(Product, { foreignKey: 'category_id', onDelete: 'CASCADE' });
Category.belongsTo(Category, { foreignKey: 'parent_category_id', as: 'ParentCategory', onDelete: 'CASCADE' });

module.exports = Category;


