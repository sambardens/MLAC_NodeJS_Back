import {ApiError} from "../errors/errors.api.js";
import tokensService from "../tokens/tokens.service.js";

export default function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const bearer = req.headers.authorization.split(' ')[0]

        if (bearer !== 'Bearer' || !token) {
            return next(ApiError.unAuthorized('You must be logged in!'))
        }

        const validate = tokensService.validateToken(token, process.env.SECRET_ACCESS_TOKEN)
        if (!validate || !validate.isEmailConfirmed) {
            return next(ApiError.unAuthorized('You must be logged in or activate the account!'))
        }
        if (validate.accountStatus == process.env.STATUS_BANNED) {
            return next(ApiError.forbidden('Access is denied, your account is banned!'))
        }
        req.user = validate
        next()
    } catch(e) {
        return next(ApiError.unAuthorized('You must be logged in or activate the account!'))
    }
}