import mailsService from "./mails.service.js";

class MailsController {
    async sendLinkRecoveryPassword(req, res, next) {
        try {
            const {email} = req.body
            await mailsService.sendLinkRecoveryPassword(email)
            return res.json({success: true, message: "Successfully"})
        } catch (e) {
            return next(e)
        }
    }

    async sendInviteToBapViaEmail(req, res, next) {
        try {
            const {bapId} = req.params
            const {email, role} = req.body
            const {user} = req
            const notification = await mailsService.sendInviteToBapViaEmail(user, bapId, email, role)
            return res.json({success: true, notification})
        } catch(e) {
            next(e)
        }
    }

    async sendInviteFeatureArtistsViaEmail(req, res, next) {
        try {
            const {trackId} = req.params
            const {email} = req.body
            const {user} = req
            const notification = await mailsService.sendInviteFeatureArtistsViaEmail(user.id, trackId, email)
            return res.json({success: true, notification})
        } catch(e) {
            next(e)
        }
    }
}

export default new MailsController()