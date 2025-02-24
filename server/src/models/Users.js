const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');
const Order = require('./Order');
const Review = require('./Review');
const Message = require('./Message');
const Blog = require('./Blog');
const Notification = require('./Notification');

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    product_id:{ type: DataTypes.INTEGER, foreingKey: true, autoIncrement: true },
    full_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING },
    address: { type: DataTypes.TEXT },
    city: { type: DataTypes.STRING },
    state: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING },
    zip_code: { type: DataTypes.STRING },
    profile_picture: { type: DataTypes.STRING },
    is_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { timestamps: true });

User.hasMany(Product, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(Order, { foreignKey: 'buyer_id', onDelete: 'CASCADE' });
User.hasMany(Order, { foreignKey: 'seller_id', onDelete: 'CASCADE' });
User.hasMany(Review, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(Message, { foreignKey: 'sender_id', onDelete: 'CASCADE' });
User.hasMany(Message, { foreignKey: 'receiver_id', onDelete: 'CASCADE' });
User.hasMany(Blog, { foreignKey: 'author_id', onDelete: 'CASCADE' });
User.hasMany(Notification, { foreignKey: 'user_id', onDelete: 'CASCADE' });

User.belongsToMany(Product, { through: 'Favorites', foreignKey: 'user_id', onDelete: 'CASCADE' });
User.belongsToMany(Product, { through: 'Orders', foreignKey: 'buyer_id', onDelete: 'CASCADE' });


module.exports = User;

