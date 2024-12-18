import {DataTypes} from "sequelize";
import scheme from '../../database/scheme.js'

export const PurchaseLocationTypesModel = scheme.define('purchase_location_types', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false}
}, {
    timestamps: false
})