import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";

const Report = sequelize.define("Report", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    reporter_id: { type: DataTypes.INTEGER, references: { model: "Users", key: "id" } },
    reported_user_id: { type: DataTypes.INTEGER, references: { model: "Users", key: "id" } },
    reason: { type: DataTypes.TEXT },
    status: { 
        type: DataTypes.ENUM("Pending", "Reviewed", "Action Taken"), 
        defaultValue: "Pending" 
    },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    created_by: { type: DataTypes.INTEGER, allowNull: true },
    updated_by: { type: DataTypes.INTEGER, allowNull: true },
}, { timestamps: true });

export default Report;
