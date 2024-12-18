import {NotificationsModel} from "./notifications.model.js";
import {TypeNotificationsModel} from "./type-notifications.model.js";
import {ApiError} from "../errors/errors.api.js";
import scheme from "../../database/scheme.js";
import {QueryTypes} from "sequelize";
import {NotificationBapsModel} from "./notification-baps.model.js"
import tokensService from "../tokens/tokens.service.js";
import bapsService from "../baps/baps.service.js";
import featureArtistsService from "../feature-artists/feature-artists.service.js";

class NotificationsService {

    async createNotification(token, userId, typeNotificationId, email, senderId, content) {
        const typeNotification = await this.getTypeNotificationById(typeNotificationId)
        if (!typeNotification)
            throw new Error('Incorrect type notification')

        const notification = await NotificationsModel.create({
            token, userId, typeNotificationId: typeNotification.id, email, senderId, content
        })
        return notification
    }

    async getNotification(options) {
        const notification = await NotificationsModel.findOne({where: options})
        return notification
    }

    async getNotificationByLink(token, typeNotificationId, isAccept = false) {
        const typeNotification = await this.getTypeNotificationById(typeNotificationId)
        if (!typeNotification)
            throw new Error('Incorrect type notification')

        const notification = await this.getNotification({token, typeNotificationId, isAccept})
        return notification
    }

    async getTypeNotificationById(id) {
        const type = await TypeNotificationsModel.findByPk(id)
        return type
    }

    async considerNotification(isAccept, search) {
        const notification = await this.getNotification(search)

        notification.isAccept = isAccept
        notification.reviewed = true
        await notification.save()
        return notification
    }

    async getAllNotificationsBap(userId, reviewed) {
        const notifications = await scheme.query(`
            SELECT notifications.id as id, isAccept, reviewed, users.id as senderId, users.firstName as senderFirstName,
                 token, users.lastName as senderLastName, baps.name as bapName, typeNotificationId,
                 notification_baps.userId as userId, baps.avatar as bapAvatar, notifications.createdAt as createdAt,
                 content
            FROM notifications
            LEFT JOIN users ON users.id = notifications.senderId
            LEFT JOIN notification_baps ON notification_baps.notificationId = notifications.id
            LEFT JOIN baps ON baps.id = notification_baps.bapId
            WHERE notifications.userId = ${userId} && reviewed = ${reviewed}
        `, {
            raw: true,
            type: QueryTypes.SELECT
        })
        return notifications
    }

    async getPendingNotificationsBap(bapId) {
        const users = await scheme.query(`
            SELECT *
            FROM notification_baps
            LEFT JOIN notifications
            ON notification_baps.notificationId = notifications.id
            WHERE notifications.reviewed = false && notification_baps.bapId = ${bapId}
        `, {
            type: QueryTypes.SELECT,
            raw: true
        })
        return users
    }

    async createNotificationBap(email, userId, bapId, notificationId, role) {
        const notificationBap = await NotificationBapsModel.create({email, userId, bapId, notificationId, role})
        return notificationBap
    }

    async checkNotification(user, data) {
        const typeNotification = await this.getTypeNotificationById(data.typeNotificationId)
        if (!typeNotification)
            throw ApiError.badRequest('Don\'t correct type notification')

        // const validationToken = await tokensService.validateToken(data.token, process.env.SECRET_INVITE_TOKEN)
        const notification = await this.getNotification({
            token: data.token, isAccept: false, reviewed: false, typeNotificationId: typeNotification.id
        })
        if (!notification)
            throw ApiError.badRequest('Don\'t find this notification or you are already accepted it')

        const considerNotification = await this.considerNotification(data.isAccept, {
            id: notification.id
        })

        await this.chooseByTypeNotification(user, data.token, data.isAccept, typeNotification.id)

        return considerNotification
    }

    async removingSentNotification(user, notificationId) {
        const notification = await this.getNotification({id: notificationId})
        if (user.id !== notification.senderId)
            throw ApiError.badRequest('You can\'t remove this notification')

        await NotificationsModel.destroy({where: {id: notificationId}})
    }

    async chooseByTypeNotification(user, token, isAccept, typeNotificationId) {
        let considerNotification

        if (typeNotificationId === 1)
            considerNotification = await bapsService.joinToBap(user, token, isAccept)
        else if (typeNotificationId === 3)
            considerNotification = await featureArtistsService.joinAsFeatureArtist(user, token, isAccept)

        return considerNotification
    }
}

export default new NotificationsService()