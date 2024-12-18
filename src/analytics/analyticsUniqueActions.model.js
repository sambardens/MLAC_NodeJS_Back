import { DataTypes } from "sequelize"
import scheme from "../../database/scheme.js"

export const AnalyticsUniqueActionsModel = scheme.define('analytics_unique_actions', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    purchases: {type: DataTypes.BOOLEAN, defaultValue: false},
    downloads: {type: DataTypes.BOOLEAN, defaultValue: false},
    releaseId: {type: DataTypes.INTEGER, defaultValue: null},
    userId: {type: DataTypes.INTEGER},
    trackId: {type: DataTypes.INTEGER, defaultValue: null},
})

