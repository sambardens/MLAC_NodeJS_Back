import { DataTypes } from "sequelize";
import scheme from "../../database/scheme.js";
import { BapsModel } from "../baps/baps.model.js";
import { UsersModel } from "../users/users.model.js";
import { NotificationsModel } from "./notifications.model.js"

export const NotificationBapsModel = scheme.define("notification_baps", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING}
})

BapsModel.hasMany(NotificationBapsModel,{onDelete: 'CASCADE'})
NotificationBapsModel.belongsTo(BapsModel)

UsersModel.hasMany(NotificationBapsModel)
NotificationBapsModel.belongsTo(UsersModel)

NotificationsModel.hasMany(NotificationBapsModel)
NotificationBapsModel.belongsTo(NotificationsModel)