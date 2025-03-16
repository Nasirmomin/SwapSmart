import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";

const Coupon = sequelize.define("Coupon", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    code: { type: DataTypes.STRING, unique: true },
    discount_percentage: { type: DataTypes.FLOAT },
    expiry_date: { type: DataTypes.DATE },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    created_by: { type: DataTypes.INTEGER, allowNull: true },
    updated_by: { type: DataTypes.INTEGER, allowNull: true },
}, { timestamps: true });

export default Coupon;
