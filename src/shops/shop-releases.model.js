import scheme from '../../database/scheme.js'
import {DataTypes} from "sequelize";
import {ReleaseModel} from "../release/release.model.js";
import {ShopsModel} from "./shops.model.js";
import {ContractsModel} from "../contracts/contracts.model.js";

export const ShopReleasesModel = scheme.define('shop_releases', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    backgroundBlur: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false}
})

ShopsModel.belongsToMany(ReleaseModel, {through: ShopReleasesModel})
ReleaseModel.belongsToMany(ShopsModel, {through: ShopReleasesModel})

ContractsModel.hasOne(ShopReleasesModel)
ShopReleasesModel.belongsTo(ContractsModel)