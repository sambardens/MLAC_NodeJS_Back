import brandsService from "./brands.service.js";

class BrandsController {

    async getBrandInfo(req, res, next) {
        try {
            const {bapId} = req.params
            const brand = await brandsService.createBrandIfNotExist(bapId)
            return res.json({success: true, brand})
        } catch (e) {
            next(e)
        }
    }

    // async editBrandPalette(req, res, next) {
    //     try {
    //         const {hex} = req.body
    //         const {brandId} = req.params
    //         const {user} = req
    //         const palettes = await brandsService.editBrandPalette(user, hex, brandId)
    //         return res.json({success: true, palettes})
    //     } catch (e) {
    //         next(e)
    //     }
    // }
    //
    // async editBrandFonts(req, res, next) {
    //     try {
    //         const {brandId} = req.params
    //         const {fonts} = req.body
    //         const {user} = req
    //         const resultFonts = await brandsService.editBrandFonts(user, brandId, fonts)
    //         return res.json({success: true, fonts: resultFonts})
    //     } catch (e) {
    //         next(e)
    //     }
    // }
    //
    // async editBrandMain(req, res, next) {
    //     try {
    //         const {name, paletteName, urlLogo, designId} = req.body
    //         const {brandId} = req.params
    //         const logo = req?.files?.logo
    //         const brand = await brandsService.editBranMainInfo(brandId, {
    //             name, paletteName, logo, urlLogo, designId
    //         })
    //         return res.json({success: true, brand})
    //     } catch (e) {
    //         next(e)
    //     }
    // }

    async removeBrand(req, res, next) {
        try {
            const {brandId} = req.params
            await brandsService.removeBrandFull(brandId)
            return res.json({success: true})
        } catch(e) {
            next(e)
        }
    }

    async editBrandFullInfo(req, res, next) {
        try {
            const {brandId} = req.params
            const {name, paletteName, urlLogo, designId, fonts} = req.body
            const logo = req?.files?.logo
            const {user} = req

            const brand = await brandsService.editBrandFullInfo(user, brandId, {
                name, paletteName, urlLogo, designId, fonts: JSON.parse(fonts), logo
            })

            return res.json({success: true, brand})
        } catch(e) {
            next(e)
        }
    }

    async editBrandPalette(req, res, next) {
        try {
            const {brandId} = req.params
            const {brandPaletteName, hex} = req.body
            const palette = await brandsService.editBrandPalette(brandId, brandPaletteName, hex)
            return res.json({success: true, palette})
        } catch(e) {
            next(e)
        }
    }

    async removeBrandPalette(req, res, next) {
        try {
            const {brandId} = req.params
            const {brandPaletteName} = req.body
            await brandsService.removeBrandPaletteName({brandId, name: brandPaletteName})
            return res.json({success: true})
        } catch(e) {
            next(e)
        }
    }
}

export default new BrandsController()