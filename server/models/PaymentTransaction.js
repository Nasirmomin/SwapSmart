import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";

const PaymentTransaction = sequelize.define("PaymentTransaction", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    order_id: { type: DataTypes.INTEGER, references: { model: "Orders", key: "id" } },
    payment_method: { type: DataTypes.STRING }, // PayPal, Credit Card, etc.
    payment_status: { 
        type: DataTypes.ENUM("Pending", "Completed", "Failed"), 
        defaultValue: "Pending" 
    },
    transaction_id: { type: DataTypes.STRING, unique: true }, // External payment ID
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    created_by: { type: DataTypes.INTEGER, allowNull: true },
    updated_by: { type: DataTypes.INTEGER, allowNull: true },
}, { timestamps: true });

export default PaymentTransaction;
