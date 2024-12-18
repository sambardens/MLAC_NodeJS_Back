import scheme from '../../database/scheme.js'
import {DataTypes} from "sequelize";
import {UsersModel} from "../users/users.model.js";
import {TypeNotificationsModel} from "./type-notifications.model.js";
import {MembersBapsModel} from "../baps/members-baps.model.js";

export const NotificationsModel = scheme.define('notifications', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    isAccept: {type: DataTypes.BOOLEAN, defaultValue: false},
    // isViaEmail: {type: DataTypes.BOOLEAN, defaultValue: false},
    reviewed: {type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false},
    email: {type: DataTypes.STRING},
    token: {type: DataTypes.STRING(535)},
    content: {type: DataTypes.STRING},
})

NotificationsModel.hasOne(MembersBapsModel)
MembersBapsModel.belongsTo(NotificationsModel)

UsersModel.hasMany(NotificationsModel, {onDelete: 'CADCADE'})
NotificationsModel.belongsTo(UsersModel)

UsersModel.hasMany(NotificationsModel, {foreignKey: 'senderId', onDelete: 'CADCADE'})
NotificationsModel.belongsTo(UsersModel, {foreignKey: 'senderId'})

TypeNotificationsModel.hasMany(NotificationsModel)
NotificationsModel.belongsTo(TypeNotificationsModel)