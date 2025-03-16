import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConnection.js';

const Category = sequelize.define('Category', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    description: { 
        type: DataTypes.TEXT 
    },
    image: { 
        type: DataTypes.STRING 
    },
    icon: {
        type: DataTypes.STRING,
        comment: 'Icon or small image for category'
    },
    parent_id: { 
        type: DataTypes.INTEGER, 
        allowNull: true,
        references: {
            model: 'Categories',  // Self-reference to the same table
            key: 'id'
        }
    },
    level: { 
        type: DataTypes.INTEGER, 
        defaultValue: 0,
        comment: '0 for main category, 1 for subcategory, 2 for sub-subcategory, etc.' 
    },
    slug: { 
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true 
    },
    meta_description: {
        type: DataTypes.TEXT,
        validate: {
            len: [0, 500] // Maximum 500 characters for SEO description
        }
    },
    is_active: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: true 
    },
    featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: 'Indicates if the category is featured on the homepage'
    },
    display_order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: 'For controlling the display order of categories'
    },
    custom_attributes: {
        type: DataTypes.JSON,
        defaultValue: {},
        comment: 'Custom category-specific attributes'
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'User ID who created this category'
    },
    updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: 'User ID who last updated this category'
    }
}, { 
    timestamps: true,
    indexes: [
        {
            name: 'category_parent_index',
            fields: ['parent_id']
        },
        {
            name: 'category_slug_index',
            fields: ['slug']
        }
    ]
});


export default Category;
