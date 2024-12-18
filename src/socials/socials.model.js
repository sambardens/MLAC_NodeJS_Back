import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";
import {BapsModel} from "../baps/baps.model.js";

export const SocialsModel = scheme.define('socials', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    social: {type: DataTypes.STRING(500), allowNull: false},
    position: {type: DataTypes.INTEGER}
})

BapsModel.hasMany(SocialsModel,{onDelete: 'CASCADE'})
SocialsModel.belongsTo(BapsModel)
