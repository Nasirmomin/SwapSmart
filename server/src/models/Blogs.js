import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConnection.js';

const Blog = sequelize.define('Blog', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [5, 255] // Title must be between 5 and 255 characters
        }
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    image: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true // Ensure the image field contains a valid URL
        }
    },
    status: {
        type: DataTypes.ENUM('draft', 'published'),
        defaultValue: 'draft'
    },
    meta_description: {
        type: DataTypes.TEXT,
        validate: {
            len: [0, 500] // Optional, but max 500 characters
        }
    },
    tags: {
        type: DataTypes.JSON, // JSON works better for array-like structures in MySQL
        defaultValue: [] // Ensures tags is always an array
    },
    views_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            min: 0 // Ensure views count is never negative
        }
    }
}, {
    timestamps: true
});

export default Blog;
