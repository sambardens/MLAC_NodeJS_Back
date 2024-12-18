import scheme from '../../database/scheme.js'
import {DataTypes} from "sequelize";
import {ReleaseModel} from "../release/release.model.js";
import {ShopsModel} from "./shops.model.js";
import {ShopDesignTypesModel} from "./shop-design-types.model.js";

export const ShopDesignsModel = scheme.define('shop_designs', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    hex: {type: DataTypes.STRING, allowNull: false},
    font: {type: DataTypes.STRING, allowNull: false},
    size: {type: DataTypes.INTEGER, allowNull: false},
    italic: {type: DataTypes.INTEGER},
    weight: {type: DataTypes.INTEGER}
})

ShopDesignTypesModel.hasOne(ShopDesignsModel)
ShopDesignsModel.belongsTo(ShopDesignTypesModel)

ShopsModel.hasOne(ShopDesignsModel, {onDelete: 'CASCADE'})
ShopDesignsModel.belongsTo(ShopsModel, {onDelete: 'CASCADE'})