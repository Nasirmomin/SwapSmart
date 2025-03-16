import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConnection.js';
import User from './Users.js';

const Notification = sequelize.define('Notification', {
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
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Type of notification, e.g., New Message, Order Update'
    },
    message: { 
        type: DataTypes.TEXT, 
        allowNull: false 
    },
    reference_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: 'ID of the referenced entity (e.g., order, message, product)'
    },
    reference_model: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'Model name of the referenced entity (e.g., Order, Message, Product)'
    },
    priority: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        defaultValue: 'medium',
        comment: 'Priority level of the notification'
    },
    is_read: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
    },
    is_active: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: true,
        comment: 'Indicates if the notification is active'
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'User ID who triggered the notification'
    },
    updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: 'User ID who last updated the notification'
    }
}, { 
    timestamps: true,
    indexes: [
        { name: 'notification_user_index', fields: ['user_id'] },
        { name: 'notification_reference_index', fields: ['reference_model', 'reference_id'] }
    ]
});



export default Notification;
