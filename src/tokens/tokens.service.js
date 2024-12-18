import jwt from "jsonwebtoken";
import {TokensModel} from "./tokens.model.js";
import * as uuid from "uuid";

class TokensService {
    generateJwtTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN, {expiresIn: '30d'})
        const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH_TOKEN, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const user = await TokensModel.findOne({where: {userId}})
        if (!user) {
            const result = await TokensModel.create({userId, refreshToken})
            return result
        }
        if (refreshToken) user.refreshToken = refreshToken
        await user.save()
    }

    generateRecoveryToken(payload) {
        const recoveryToken = jwt.sign(payload, process.env.SECRET_RECOVERY_TOKEN, {expiresIn: '4h'})
        return recoveryToken
    }

    generateInviteToken(payload) {
        return jwt.sign(payload, process.env.SECRET_INVITE_TOKEN, {expiresIn: '30d'})
    }

    generateActivateToken(payload) {
        return jwt.sign(payload, process.env.SECRET_ACTIVATE_ACCOUNT_TOKEN, {expiresIn: '30d'})
    }

    generateDeletionBapToken(payload) {
        return jwt.sign(payload, process.env.SECRET_DELETION_BAP_TOKEN, {expiresIn: '30d'})
    }

    generateSaveDataOfBapToken(payload) {
        return jwt.sign(payload, process.env.SECRET_SAVE_DATA_OF_BAP_TOKEN, {expiresIn: '30d'})
    }

    generateContractToken(payload) {
        return jwt.sign(payload, process.env.SECRET_CONTRACT_NOTIFICATION, {expiresIn: '30d'})
    }

    generateDownloadsToken(payload) {
        return jwt.sign(payload, process.env.DOWNLOADS_SECRET_KEY, {expiresIn: '30d'})
    }

    generateDownloadsAccessToken(payload) {
        return jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN, { expiresIn: '10y' })
    }

    validateToken(token, secret) {
        const verified = jwt.verify(token, secret)
        return verified
    }

    generateUniqueLink() {
        return uuid.v4()
    }
}

export default new TokensService