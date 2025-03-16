import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConnection.js';
import User from './Users.js';
import Product from './Products.js';

const Review = sequelize.define(
    'Review',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title: { type: DataTypes.STRING, allowNull: true }, // Summary of the review
        user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Users', key: 'id' } },
        product_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Products', key: 'id' } },
        rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
        comment: { type: DataTypes.TEXT, allowNull: true },
        verified_purchase: { type: DataTypes.BOOLEAN, defaultValue: false }, // Ensures reviewer bought the product
        helpful_votes: { type: DataTypes.INTEGER, defaultValue: 0 }, // Upvotes for helpfulness
        is_active: { type: DataTypes.BOOLEAN, defaultValue: true }, // Soft delete functionality
        created_by: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Users', key: 'id' } },
        updated_by: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'Users', key: 'id' } },
    },
    { timestamps: true }
);


export default Review;
