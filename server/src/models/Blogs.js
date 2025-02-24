
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Blog = sequelize.define('Blog', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    image: { type: DataTypes.STRING },
    status: { type: DataTypes.ENUM('draft', 'published'), defaultValue: 'draft' },
    meta_description: { type: DataTypes.TEXT },
    tags: { type: DataTypes.ARRAY(DataTypes.STRING) },
    views_count: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { timestamps: true });

module.exports = Blog;

