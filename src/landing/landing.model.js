import scheme from '../../database/scheme.js'
import {DataTypes} from "sequelize";
import {ReleaseModel} from "../release/release.model.js";
import {WebpagesTypeModel} from "./webpages-type.model.js";

export const LandingModel = scheme.define('landing', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    favicon: { type: DataTypes.STRING},
    logo: { type: DataTypes.STRING},
    metaTitle: { type: DataTypes.STRING},
    metaDescription: { type: DataTypes.STRING},
    facebookPixel: { type: DataTypes.STRING},
    backgroundBlur: { type: DataTypes.INTEGER},
    trackIdForStreaming: { type: DataTypes.STRING},
    showSocialLinks: {type: DataTypes.BOOLEAN, defaultValue: false},
    socialLinksType: {type: DataTypes.STRING},
})

ReleaseModel.hasMany(LandingModel)
LandingModel.belongsTo(ReleaseModel)

WebpagesTypeModel.hasMany(LandingModel)
LandingModel.belongsTo(WebpagesTypeModel)