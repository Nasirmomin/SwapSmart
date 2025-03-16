import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";
import Product from "./Products.js";
import Order from "./Orders.js";
import Review from "./Reviews.js";
import Message from "./Messages.js";
import Blog from "./Blogs.js";

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
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
    role: { 
      type: DataTypes.ENUM("admin", "customer", "seller"), 
      defaultValue: "customer" 
    },
    store_name: { type: DataTypes.STRING, allowNull: true }, // Only for sellers
    is_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
    account_status: { 
      type: DataTypes.ENUM("Active", "Suspended", "Pending"), 
      defaultValue: "Active" 
    },
    last_login: { type: DataTypes.DATE, allowNull: true },
    preferences: { type: DataTypes.JSON, allowNull: true }, // Stores user preferences
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true }, // Soft delete functionality
    created_by: { type: DataTypes.INTEGER, allowNull: true, references: { model: "Users", key: "id" } },
    updated_by: { type: DataTypes.INTEGER, allowNull: true, references: { model: "Users", key: "id" } },
  },
  { timestamps: true }
);


export default User;
