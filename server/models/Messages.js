import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConnection.js';
import User from './Users.js';

const Message = sequelize.define('Message', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    sender_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    receiver_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'Optional subject for message categorization'
    },
    message: { 
        type: DataTypes.TEXT, 
        allowNull: false 
    },
    attachments: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: 'Stores file attachments as an array of URLs'
    },
    is_read: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
    },
    deleted_by_sender: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: 'Indicates if the sender deleted the message'
    },
    deleted_by_receiver: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: 'Indicates if the receiver deleted the message'
    },
    is_active: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: true,
        comment: 'Indicates if the message is active'
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'User ID who created the message'
    },
    updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: 'User ID who last updated the message'
    }
}, { 
    timestamps: true,
    indexes: [
        { name: 'message_sender_index', fields: ['sender_id'] },
        { name: 'message_receiver_index', fields: ['receiver_id'] }
    ]
});


export default Message;
