import notificationsService from "./notifications.service.js";

class NotificationsController {

    async getAllNotifications(req, res, next) {
        try {
            const {user} = req
            const notifications = await notificationsService.getAllNotificationsBap(user.id, false)
            return res.json({success: true, notifications})
        } catch(e) {
            next(e)
        }
    }

    async getPendingNotificationsBap(req, res, next) {
        try {
            const {bapId} = req.params
            const users = await notificationsService.getPendingNotificationsBap(bapId)
            return res.json({success: true, users})
        } catch(e) {
            next(e)
        }
    }

    async checkNotification(req, res, next) {
        try {
            const {token} = req.query
            const isAccept = req?.body?.isAccept
            const typeNotificationId = req?.body?.typeNotificationId
            const {user} = req

            const notification = await notificationsService.checkNotification(user, {
                token,
                isAccept: String(isAccept) === 'true',
                typeNotificationId: typeNotificationId ? typeNotificationId : 1
            })
            return res.json({success: true, notification})
        } catch(e) {
            next(e)
        }
    }

    async removingSentNotification(req, res, next) {
        try {
            const {notificationId} = req.params
            const {user} = req
            await notificationsService.removingSentNotification(user, notificationId)
            return res.json({success: true})
        } catch(e) {
            next(e)
        }
    }
}

export default new NotificationsController()