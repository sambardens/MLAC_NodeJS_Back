import scheme from '../../database/scheme.js'
import {DataTypes} from "sequelize";

export const WebpagesTypeModel = scheme.define('webpages_types', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING }
}, {
    timestamps: false
})