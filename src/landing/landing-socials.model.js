import scheme from '../../database/scheme.js'
import {DataTypes} from "sequelize";
import {LandingModel} from "./landing.model.js";

export const LandingLinksModel = scheme.define('landing_links', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false},
    link: {type: DataTypes.STRING, allowNull: false},
    position: {type: DataTypes.INTEGER, defaultValue: 0}
})

LandingModel.hasMany(LandingLinksModel, {foreignKey: 'landingPageId'})
LandingLinksModel.belongsTo(LandingModel, {foreignKey: 'landingPageId'})