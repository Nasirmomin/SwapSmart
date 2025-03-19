import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConnection.js';
import User from './Users.js'; // Assuming user management is available

const Subscriber = sequelize.define(
    'Subscriber',
    {
       id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        email: { type: DataTypes.STRING, unique: true, allowNull: false },
        subscription_status: { 
            type: DataTypes.ENUM('Subscribed', 'Unsubscribed', 'Pending'), 
            defaultValue: 'Subscribed' 
        },
        is_active: { type: DataTypes.BOOLEAN, defaultValue: true }, // Soft delete functionality
        subscribed_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        unsubscribed_at: { type: DataTypes.DATE, allowNull: true },
        created_by: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'Users', key: 'id' } },
        updated_by: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'Users', key: 'id' } },
    },
    { timestamps: true }
);


export default Subscriber;
