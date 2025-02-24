const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./Users');
const Product = require('./Product');

const Order = sequelize.define('Order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    buyer_id: { type: DataTypes.INTEGER, allowNull: false },
    seller_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    total_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: { type: DataTypes.ENUM('Pending', 'Completed', 'Cancelled'), defaultValue: 'Pending' },
    payment_method: { type: DataTypes.STRING },
    payment_status: { type: DataTypes.ENUM('Paid', 'Pending', 'Failed'), defaultValue: 'Pending' },
    tracking_number: { type: DataTypes.STRING },
    shipping_address: { type: DataTypes.TEXT },
    order_notes: { type: DataTypes.TEXT },
    delivery_status: { type: DataTypes.ENUM('Processing', 'Shipped', 'Delivered', 'Returned'), defaultValue: 'Processing' }
}, { timestamps: true });

Order.belongsTo(User, { foreignKey: 'buyer_id', onDelete: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'seller_id', onDelete: 'CASCADE' });
Order.belongsTo(Product, { foreignKey: 'product_id', onDelete: 'CASCADE' });

module.exports = Order;

