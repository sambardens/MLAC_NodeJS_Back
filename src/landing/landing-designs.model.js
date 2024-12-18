import scheme from '../../database/scheme.js'
import {DataTypes} from "sequelize";
import {LandingDesignTypesModel} from "./landing-design-types.model.js";
import {LandingModel} from "./landing.model.js";

export const LandingDesignsModel = scheme.define('landing_designs', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    hex: {type: DataTypes.STRING, allowNull: false},
    font: {type: DataTypes.STRING, allowNull: false},
    size: {type: DataTypes.INTEGER, allowNull: false},
    italic: {type: DataTypes.INTEGER},
    weight: {type: DataTypes.INTEGER}
})

LandingDesignTypesModel.hasOne(LandingDesignsModel)
LandingDesignsModel.belongsTo(LandingDesignTypesModel)

LandingModel.hasOne(LandingDesignsModel, {as: 'landingPage', onDelete: 'CASCADE'})
LandingDesignsModel.belongsTo(LandingModel, {as: 'landingPage', onDelete: 'CASCADE'})