import scheme from '../../database/scheme.js'
import {DataTypes} from "sequelize";
import {WebpagesTypeModel} from "../landing/webpages-type.model.js";
import {BapsModel} from "../baps/baps.model.js";

export const ShopsModel = scheme.define('shops', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    favicon: { type: DataTypes.STRING},
    background: { type: DataTypes.STRING},
    metaTitle: {type: DataTypes.STRING},
    metaDescription: {type: DataTypes.STRING},
    facebookPixel: {type: DataTypes.STRING},
    logo: {type: DataTypes.STRING},
    banner: {type: DataTypes.STRING},
    bannerType: {type: DataTypes.STRING},
    backgroundBlur: {type: DataTypes.INTEGER},
    showSocialLinks: {type: DataTypes.BOOLEAN, defaultValue: false},
    socialLinksType: {type: DataTypes.STRING},
})

export const PositionTypeModel = scheme.define('position_types', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
}, {
    timestamps: false
})

BapsModel.hasMany(ShopsModel)
ShopsModel.belongsTo(BapsModel)

PositionTypeModel.hasMany(ShopsModel)
ShopsModel.belongsTo(PositionTypeModel)

WebpagesTypeModel.hasMany(ShopsModel)
ShopsModel.belongsTo(WebpagesTypeModel)