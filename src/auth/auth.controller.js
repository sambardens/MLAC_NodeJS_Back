import authService from "./auth.service.js";

class AuthController {

    async signUp(req, res, next) {
        try {
            const {firstName, lastName, email, password, provider} = req.body
            const {token} = req.query
            const createdUser = await authService.signUp(firstName, lastName, email, password, token, provider)
            res.cookie('refreshToken', createdUser.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: "none"
            })
            return res.json({
                activateToken: createdUser.activateToken, user: createdUser.user
            })
        } catch (e) {
            return next(e)
        }
    }

    async signIn(req, res, next) {
        try {
            const {email, password} = req.body
            const {token} = req.query
            const account = await authService.signIn(email, password, token)
            res.cookie('refreshToken', account.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: "none"
            })
            return res.json({
                refreshToken: account.refreshToken,
                accessToken: account.accessToken,
                user: account.user
            })
        } catch (e) {
            return next(e)
        }
    }

    async signInAsAdmin(req, res, next) {
        try {
            const {email, password} = req.body
            const {token} = req.query
            const account = await authService.signInAsAdmin(email, password, token)
            res.cookie('refreshToken', account.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: "none"
            })
            return res.json({
                refreshToken: account.refreshToken,
                accessToken: account.accessToken,
                user: account.user
            })
        } catch (e) {
            return next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            await authService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json({success: true, message: "Logout successfully!"})
        } catch (e) {
            return next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const tokens = await authService.refresh(refreshToken)
            res.cookie('refreshToken', tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                secure: true,
                sameSite: "none",
                httpOnly: true
            })
            return res.json({success: true, tokens})
        } catch (e) {
            return next(e)
        }
    }

    async activateAccount(req, res, next) {
        try {
            const {token} = req.query
            await authService.activateAccount(token)
            return res.json({success: true})
        } catch (e) {
            return next(e)
        }
    }

    async signSocial(req, res, next) {
        try {
            const {email, firstName, authToken, urlAvatar} = req.body
            const {token} = req.query
            const lastName = req?.body?.lastName
            const account = await authService.signSocial(email, firstName, lastName, urlAvatar, authToken, token)
            return res.json({
                refreshToken: account.refreshToken,
                accessToken: account.accessToken,
                user: account.user
            })
        } catch(e) {
            next(e)
        }
    }
}

export default new AuthController()