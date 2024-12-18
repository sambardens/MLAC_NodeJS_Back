import scheme from "../../database/scheme.js";
import { DataTypes } from "sequelize";
import { ReleaseModel } from "../release/release.model.js";
import { AnalyticsUniqueActionsModel } from "./analyticsUniqueActions.model.js";
import { TracksModel } from "../tracks/tracks.model.js";

export const AnalyticsModel = scheme.define('analytics', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    totalTrackDownloads: {type: DataTypes.INTEGER, defaultValue: 0},
    totalDownloads: {type: DataTypes.INTEGER, defaultValue: 0},
	totalUserDownloads: {type: DataTypes.INTEGER, defaultValue: 0},
    totalPurchases: {type: DataTypes.INTEGER, defaultValue: 0},
    totalCustomersPurchases: {type: DataTypes.INTEGER, defaultValue: 0},
    totalProfitPurchases: {type: DataTypes.INTEGER, defaultValue: 0},
    trackId: {type: DataTypes.INTEGER, allowNull: false},
})

ReleaseModel.hasOne(AnalyticsModel, {onUpdate: 'CASCADE'})
AnalyticsModel.belongsTo(ReleaseModel)

TracksModel.hasMany(AnalyticsModel, {onUpdate: 'CASCADE', onDelete: 'SET NULL'})
AnalyticsModel.belongsTo(TracksModel)

AnalyticsUniqueActionsModel.hasMany(AnalyticsModel, {onUpdate: 'CASCADE', onDelete: 'CASCADE'})
AnalyticsModel.belongsTo(AnalyticsUniqueActionsModel)