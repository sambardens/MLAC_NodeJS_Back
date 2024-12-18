import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";
import {BapsModel} from "./baps.model.js";
import {DeletionBapsModel} from "./deletion-baps.model.js";

export const ApplyDeletionBapsModel = scheme.define('apply_deletion_baps', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    isNewUser: {type: DataTypes.BOOLEAN, defaultValue: false},
})

BapsModel.hasOne(ApplyDeletionBapsModel)
ApplyDeletionBapsModel.belongsTo(BapsModel)

ApplyDeletionBapsModel.hasOne(DeletionBapsModel)
DeletionBapsModel.belongsTo(ApplyDeletionBapsModel)