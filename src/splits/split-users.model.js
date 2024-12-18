import scheme from '../../database/scheme.js'
import {DataTypes} from "sequelize";
import {SplitsModel} from "./splits.model.js";

export const SplitUsersModel = scheme.define('split_users', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    email: {type: DataTypes.STRING, allowNull: false},
    ownership: {type: DataTypes.STRING, allowNull: false},
    reviewed: {type: DataTypes.BOOLEAN, defaultValue: false},
    signature: {type: DataTypes.STRING},
})

SplitsModel.hasMany(SplitUsersModel, {onDelete: 'CASCADE'})
SplitUsersModel.belongsTo(SplitsModel)