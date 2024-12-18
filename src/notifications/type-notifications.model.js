import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";

export const TypeNotificationsModel = scheme.define('type_notifications', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING}
}, {
    timestamps: false
})