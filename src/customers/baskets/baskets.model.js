import scheme from '../../../database/scheme.js'
import {DataTypes} from "sequelize";
import {ShopsModel} from "../../shops/shops.model.js";
import {LandingModel} from "../../landing/landing.model.js";
import {TracksModel} from "../../tracks/tracks.model.js";
import {UsersModel} from "../../users/users.model.js";

export const ShopBasketsModel = scheme.define('shop_baskets', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
})

UsersModel.hasOne(ShopBasketsModel)
ShopBasketsModel.belongsTo(UsersModel)

TracksModel.hasMany(ShopBasketsModel)
ShopBasketsModel.belongsTo(TracksModel)

ShopsModel.hasMany(ShopBasketsModel)
ShopBasketsModel.belongsTo(ShopsModel)

export const LandingBasketsModel = scheme.define('landing_baskets', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
})

LandingModel.hasMany(LandingBasketsModel, {foreignKey: 'landingPageId'})
LandingBasketsModel.belongsTo(LandingModel, {foreignKey: 'landingPageId'})

UsersModel.hasOne(LandingBasketsModel)
LandingBasketsModel.belongsTo(UsersModel)

TracksModel.hasMany(LandingBasketsModel)
LandingBasketsModel.belongsTo(TracksModel)