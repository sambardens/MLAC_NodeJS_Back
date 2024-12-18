import socialsService from "./socials.service.js";

class SocialsController {

    async addSocialLinks(req, res, next) {
        try {
            const {bapId} = req.params
            const {social} = req.body
            const {user} = req
            const bapSocial = await socialsService.addSocialLinks(user.id, bapId, social)
            return res.json({success: true, bapSocial})
        } catch(e) {
            next(e)
        }
    }

    async getSocialLinksOfBap(req, res, next) {
        try {
            const {bapId} = req.params
            const {user} = req
            const socialLinks = await socialsService.getSocialLinksByBapId(user, bapId)
            return res.json({success: true, socialLinks})
        } catch(e) {
            next(e)
        }
    }

    async editSocialLinks(req, res, next) {
        try {
            const {bapId} = req.params
            const {socialData} = req.body
            const {user} = req
            const socials = await socialsService.editSocialLinks(user, bapId, socialData)
            return res.json({success: true, socials})
        } catch(e) {
            next(e)
        }
    }

    async removeSocialLinks(req, res, next) {
        try {
            const {bapId} = req.params
            const {socialLinkId} = req.body
            const {user} = req
            const social = await socialsService.removeSocialLinks(user, bapId, socialLinkId)
            return res.json({success: true, social})
        } catch(e) {
            next(e)
        }
    }
}

export default new SocialsController()