import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";

const Wishlist = sequelize.define("Wishlist", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, references: { model: "Users", key: "id" } },
    product_id: { type: DataTypes.INTEGER, references: { model: "Products", key: "id" } },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    created_by: { type: DataTypes.INTEGER, allowNull: true },
    updated_by: { type: DataTypes.INTEGER, allowNull: true },
}, { timestamps: true });

export default Wishlist;
