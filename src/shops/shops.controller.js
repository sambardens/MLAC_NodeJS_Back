import shopsService from "./shops.service.js";

class ShopsController {

    async createShop(req, res, next) {
        try {
            const {bapId} = req.params
            const {
                name, urlFavicon, urlBackground, metaTitle, metaDescription, facebookPixel, positionTypeId,
                urlLogo, urlBanner, backgroundBlur, bannerType, showSocialLinks, socialLinksType
            } = req.body
            const favicon = req?.files?.favicon
            const background = req?.files?.background
            const banner = req?.files?.banner
            const logo = req?.files?.logo
            const shop = await shopsService.createShop({
                name, favicon, background, urlFavicon, urlBackground, metaTitle, metaDescription, facebookPixel,
                banner, logo, positionTypeId, bapId,  urlLogo, urlBanner, backgroundBlur, bannerType, showSocialLinks, socialLinksType
            })
            return res.json({success: true, shop})
        } catch (e) {
            next(e)
        }
    }

    async editSettings(req, res, next) {
        try {
            const {shopId} = req.params
            const {
                name, urlFavicon, urlBackground, metaTitle, metaDescription, facebookPixel, positionTypeId, bapId,
                urlLogo, urlBanner, backgroundBlur, bannerType, showSocialLinks, socialLinksType
            } = req.body
            const favicon = req?.files?.favicon
            const background = req?.files?.background
            const banner = req?.files?.banner
            const logo = req?.files?.logo
            const shop = await shopsService.editSettings(shopId, {
                name, urlFavicon, urlBackground, metaTitle, metaDescription, facebookPixel, positionTypeId, bapId,
                favicon, background, banner, logo,  urlLogo, urlBanner, backgroundBlur, bannerType, showSocialLinks, socialLinksType
            })
            return res.json({success: true, shop})
        } catch(e) {
            next(e)
        }
    }

    async addReleaseToShop(req, res, next) {
        try {
            const {shopId} = req.query
            const {releaseIds} = req.body
            await shopsService.addReleaseToShop(shopId, releaseIds)
            return res.json({success: true})
        } catch(e) {
            next(e)
        }
    }

    async removeReleaseFromShop(req, res, next) {
        try {
            const {shopId} = req.params
            const {releaseId} = req.query
            await shopsService.removeReleaseFromShop(shopId, releaseId)
            return res.json({success: true})
        } catch(e) {
            next(e)
        }
    }

    async getShopReleases(req, res, next) {
        try {
            const {name} = req.params
            const releases = await shopsService.getShopReleases(name)
            return res.json({success: true, ...releases})
        } catch(e) {
            next(e)
        }
    }

    async getShops(req, res, next) {
        try {
            const {bapId, releaseId} = req.query
            const shops = await shopsService.getShops({bapId, releaseId})
            return res.json({success: true, shops})
        } catch(e) {
            next(e)
        }
    }

    async getShopsName(req, res, next) {
        try {
            const shops = await shopsService.getShopsName()
            return res.json({success: true, shops})
        } catch(e) {
            next(e)
        }
    }

    async addDesign(req, res, next) {
        try {
            const {shopId} = req.query
            const {hex, font, size, italic, weight, shopDesignTypeId} = req.body
            const design = await shopsService.addShopDesign(shopId, {hex, font, size, italic, weight, shopDesignTypeId})
            return res.json({success: true, design})
        } catch(e) {
            next(e)
        }
    }

    async removeDesign(req, res, next) {
        try {
            const {designId} = req.params
            await shopsService.removeShopDesign(designId)
            return res.json({success: true})
        } catch(e) {
            next(e)
        }
    }

    async removeShop(req, res, next) {
        try {
            const {shopId} = req.params
            await shopsService.removeShop(shopId)
            return res.json({success: true})
        } catch(e) {
            next(e)
        }
    }

    async editSettingsReleaseShop(req, res, next) {
        try {
            const {releaseId, shopId} = req.query
            const {backgroundBlur} = req.body
            const settings = await shopsService.editSettingsReleaseShop(releaseId, shopId, {backgroundBlur})
            return res.json({success: true, settings})
        } catch(e) {
            next(e)
        }
    }
    
    async addSocialLinks(req, res, next) {
        try {
            const {shopId} = req.params
            const {data} = req.body
            const links = await shopsService.addSocialLinks(shopId, data)
            return res.json({success: true, ...links})
        } catch(e) {
            next(e)
        }
    }
}

export default new ShopsController()