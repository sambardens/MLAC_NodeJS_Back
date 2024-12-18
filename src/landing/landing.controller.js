import landingService from "./landing.service.js";

class LandingController {

    async createLandingPage(req, res, next) {
        try {
            const {
                name, urlFavicon, urlLogo, webpagesTypeId, backgroundBlur, facebookPixel, metaTitle, metaDescription, trackIdForStreaming, showSocialLinks, socialLinksType
            } = req.body
            const favicon = req?.files?.favicon
            const logo = req?.files?.logo
            const {releaseId} = req.params
            const {user} = req
            const landingPage = await landingService.createLandingPage(user, {
                name, favicon, releaseId, webpagesTypeId, backgroundBlur, urlFavicon, urlLogo,
                logo, facebookPixel, metaTitle, metaDescription, trackIdForStreaming, showSocialLinks, socialLinksType
            })
            return res.json({success: true, landingPage})
        } catch (e) {
            next(e)
        }
    }

    async getLandingPage(req, res, next) {
        try {
            const {id, name} = req.query
            const landingPage = await landingService.getLandingPage({id, name})
            return res.json({success: true, landingPage})
        } catch(e) {
            next(e)
        }
    }

    async getLandingPageName(req, res, next) {
        try {
            const landings = await landingService.getLandingPageName()
            return res.json({success: true, landings})
        } catch(e) {
            next(e)
        }
    }

    async editLandingPage(req, res, next) {
        try {
            const {
                name, backgroundBlur, metaTitle, metaDescription, facebookPixel, urlLogo, urlFavicon, trackIdForStreaming, showSocialLinks, socialLinksType
            } = req.body
            const {landingPageId} = req.params
            const logo = req?.files?.logo
            const favicon = req?.files?.favicon
            const landingPage = await landingService.editLandingPage(landingPageId, {
                name, favicon, backgroundBlur, metaTitle, metaDescription, facebookPixel, logo, urlLogo, urlFavicon, trackIdForStreaming, showSocialLinks, socialLinksType
            })
            return res.json({success: true, landingPage})
        } catch(e) {
            next(e)
        }
    }

    async getLandingPages(req, res, next) {
        try {
            const {releaseId, bapId} = req.query
            const landingPage = await landingService.getLandingPages({releaseId, bapId})
            return res.json({success: true, landingPage})
        } catch(e) {
            next(e)
        }
    }

    async addDesign(req, res, next) {
        try {
            const {landingPageId} = req.query
            const {hex, font, size, italic, weight, landingDesignTypeId} = req.body
            const design = await landingService.addLandingDesign(landingPageId, {hex, font, size, italic, weight, landingDesignTypeId})
            return res.json({success: true, design})
        } catch(e) {
            next(e)
        }
    }

    async removeDesign(req, res, next) {
        try {
            const {landingPageId, designId} = req.query
            await landingService.removeLandingDesign(landingPageId, designId)
            return res.json({success: true})
        } catch(e) {
            next(e)
        }
    }

    async removeLandingPage(req, res, next) {
        try {
            const {landingPageId} = req.params
            await landingService.removeLandingPage(landingPageId)
            return res.json({success: true})
        } catch(e) {
            next(e)
        }
    }

    async addSocialLinks(req, res, next) {
        try {
            const {landingPageId} = req.params
            const {data} = req.body
            const links = await landingService.addSocialLinks(landingPageId, data)
            return res.json({success: true, ...links})
        } catch(e) {
            next(e)
        }
    }

    async addStreamingLinks(req, res, next) {
        try {
            const {landingPageId} = req.params
            const {data} = req.body
            const links = await landingService.addStreamingLinks(landingPageId, data)
            return res.json({success: true, ...links})
        } catch(e) {
            next(e)
        }
    }
}

export default new LandingController()