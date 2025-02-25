import { Sequelize, DataTypes } from 'sequelize';
import {sequelize} from '../config/dbConnection.js';

const Subscriber = sequelize.define('Subscriber', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
}, { timestamps: true });

export default Subscriber;
