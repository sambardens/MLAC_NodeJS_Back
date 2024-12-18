import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";
import {BapsModel} from "./baps.model.js";
import {UsersModel} from "../users/users.model.js";

export const DeletionBapsModel = scheme.define('deletion_baps', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    saveDataOfBapToken: {type: DataTypes.STRING(535), allowNull: false},
    isRemove: {type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false},
})

BapsModel.hasMany(DeletionBapsModel)
DeletionBapsModel.belongsTo(BapsModel)

UsersModel.hasMany(DeletionBapsModel, {foreignKey: 'creatorId'})
DeletionBapsModel.belongsTo(UsersModel, {foreignKey: 'creatorId'})
