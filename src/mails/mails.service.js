import usersService from "../users/users.service.js";
import {ApiError} from "../errors/errors.api.js";
import Mailjet from 'node-mailjet'
import tokensService from "../tokens/tokens.service.js";
import notificationsService from "../notifications/notifications.service.js";
import dotenv from "dotenv";

dotenv.config({path: `.env.${process.env.NODE_ENV}`})

const mailjet = Mailjet.apiConnect(
    process.env.MAIL_JET_API,
    process.env.MAIL_JET_SECRET
)

class MailsService {
    async sendLinkRecoveryPassword(email) {
        const user = await usersService.getUserByEmail(email)
        if (!user)
            throw ApiError.badRequest('User doesn\'t exist with this email')
        const recoveryToken = tokensService.generateRecoveryToken({id: user.id, email})

        const recipients = this.initRecipientData([email])

        await this.sendMail(4683752, recipients, {
            recoveryLink: `${process.env.MAIN_URL}pass-recovery/new-password?token=${recoveryToken}`
        })
    }

    initRecipientData(emails, vars) {
        const recipients = []
        for (let i = 0; i < emails.length; i++) {
            recipients.push({
                Email: emails[i],
                Vars: vars?.[i] ? vars?.[i] : ''
            })
        }
        return recipients
    }

    async sendMail(templateId, recipients, globalVars) {
        await mailjet.post('send').request({
            FromEmail: 'noreply@majorlabl.com',
            FromName: 'MajorLabl',
            Recipients: recipients,
            Vars: globalVars,
            "MJ-TemplateID": templateId,
            'MJ-TemplateLanguage': 'true',
        })
    }

    async joinByLink(user, token) {
        const validate = tokensService.validateToken(token, process.env.SECRET_INVITE_TOKEN)
        await notificationsService.checkNotification(user, {
            token, isAccept: true, typeNotificationId: validate.typeNotificationId
        })
    }

    async sendSaveBap(emails, names, bapName, bapId, authorDeletionId) {
        const recipient = this.initRecipientData(emails, names)
        const token = tokensService.generateDeletionBapToken({bapId, authorDeletionId, allUsers: true})
        await this.sendMail(4666973, recipient, {bapName, token})
    }
}

export default new MailsService()