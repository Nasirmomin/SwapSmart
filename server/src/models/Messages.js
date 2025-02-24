const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Message = sequelize.define('Message', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sender_id: { type: DataTypes.INTEGER, allowNull: false },
    receiver_id: { type: DataTypes.INTEGER, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
    is_read: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { timestamps: true });

// Associations
Message.belongsTo(User, { foreignKey: 'sender_id', onDelete: 'CASCADE' });
Message.belongsTo(User, { foreignKey: 'receiver_id', onDelete: 'CASCADE' });

module.exports = Message;

