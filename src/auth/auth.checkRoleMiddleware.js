import {ApiError} from "../errors/errors.api.js";

export default function (req, res, next) {
    try {
        console.log(req.user.email);
        if (!req.user.email.includes('@admin.major')) {
            return next(ApiError.forbidden('You don`t have permission for this'))
        }
        next()
    } catch(e) {
        return next(ApiError.unAuthorized('You must be logged in or activate the account!'))
    }
}