import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";

const ReturnRequest = sequelize.define("ReturnRequest", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    order_id: { type: DataTypes.INTEGER, references: { model: "Orders", key: "id" } },
    user_id: { type: DataTypes.INTEGER, references: { model: "Users", key: "id" } },
    reason: { type: DataTypes.TEXT },
    status: { 
        type: DataTypes.ENUM("Pending", "Approved", "Rejected"), 
        defaultValue: "Pending" 
    },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    created_by: { type: DataTypes.INTEGER, allowNull: true },
    updated_by: { type: DataTypes.INTEGER, allowNull: true },
}, { timestamps: true });

export default ReturnRequest;
