import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";

export const ShopDesignTypesModel = scheme.define('shop_design_types', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false}
}, {
    timestamps: false
})