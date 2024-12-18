import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";
import {UsersModel} from "../users/users.model.js";
import {ApplyDeletionBapsModel} from "./apply-deletion-baps.model.js";

export const FutureCreatorBapsModel = scheme.define('future_creator_baps', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    token: {type: DataTypes.STRING(535), allowNull: false},
    isApproved: {type: DataTypes.BOOLEAN, defaultValue: false},
    isTimeout: {type: DataTypes.BOOLEAN, defaultValue: false},
})

UsersModel.hasMany(FutureCreatorBapsModel)
FutureCreatorBapsModel.belongsTo(UsersModel)

ApplyDeletionBapsModel.hasMany(FutureCreatorBapsModel)
FutureCreatorBapsModel.belongsTo(ApplyDeletionBapsModel)