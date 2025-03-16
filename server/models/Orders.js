import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConnection.js';
import User from './Users.js';
import Product from './Products.js';

const Order = sequelize.define('Order', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    buyer_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    seller_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    product_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: 'Products',
            key: 'id'
        }
    },
    total_amount: { 
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false 
    },
    is_negotiated_price: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false,
        comment: 'Indicates if the price was negotiated'
    },
    status: { 
        type: DataTypes.ENUM('Pending', 'Completed', 'Cancelled'), 
        defaultValue: 'Pending' 
    },
    payment_method: { 
        type: DataTypes.STRING 
    },
    payment_status: { 
        type: DataTypes.ENUM('Paid', 'Pending', 'Failed'), 
        defaultValue: 'Pending' 
    },
    tracking_number: { 
        type: DataTypes.STRING 
    },
    shipping_address: { 
        type: DataTypes.TEXT 
    },
    expected_delivery_date: { 
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'Estimated delivery date'
    },
    order_notes: { 
        type: DataTypes.TEXT 
    },
    delivery_status: { 
        type: DataTypes.ENUM('Processing', 'Shipped', 'Delivered', 'Returned'), 
        defaultValue: 'Processing' 
    },
    return_reason: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'Reason for returning the product'
    },
    cancellation_reason: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'Reason for order cancellation'
    },
    coupon_code: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'Applied discount code'
    },
    discount_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.00,
        comment: 'Discount amount applied to the order'
    },
    buyer_rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: 'Buyer rating for the seller after order completion'
    },
    seller_rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: 'Seller rating for the buyer after order completion'
    },
    is_active: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: true,
        comment: 'Indicates if the order is active'
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'User ID who created the order'
    },
    updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: 'User ID who last updated the order'
    }
}, { 
    timestamps: true,
    indexes: [
        { name: 'order_buyer_index', fields: ['buyer_id'] },
        { name: 'order_seller_index', fields: ['seller_id'] },
        { name: 'order_status_index', fields: ['status'] }
    ]
});



export default Order;
