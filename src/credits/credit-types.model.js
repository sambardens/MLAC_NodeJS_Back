import scheme from '../../database/scheme.js'
import {DataTypes} from "sequelize";

export const CreditTypesModel = scheme.define('credit_types', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false}
}, {
    timestamps: false
})