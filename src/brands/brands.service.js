import {BrandsModel} from "./brands.model.js";
import {ApiError} from "../errors/errors.api.js";
import bapsService from "../baps/baps.service.js";
import imagesService from "../images/images.service.js";
import {BrandFontsModel} from "./brand-fonts.model.js";
import {BrandPaletteNamesModel, BrandPalettesModel} from "./brand-palettes.model.js";

class BrandsService {

    async createBrandInfo(bapId) {
        const brand = await BrandsModel.create({bapId})
        return brand
    }

    async getBrandInfo(options) {
        const brand = await BrandsModel.findOne({where: options})
        return brand
    }

    async getBrandPalettes(options) {
        const colours = await BrandPalettesModel.findAll({where: options})
        return colours
    }

    async getBrandFonts(brandId) {
        const fonts = await BrandFontsModel.findAll({where: {brandId}})
        return fonts
    }

    async removeBrandPaletteName(options) {
        await BrandPaletteNamesModel.destroy({where: options})
    }

    async addBrandPalette(values) {
        await BrandPalettesModel.create(values)
    }

    async removeBrandFont(options) {
        await BrandFontsModel.destroy({where: options})
    }

    async addBrandFont(values) {
        await BrandFontsModel.create(values)
    }


    async createBrandIfNotExist(bapId) {
        const bap = await bapsService.getBap({id: bapId})
        if (!bap) throw ApiError.badRequest('Bap don\'t exist')

        let brand = await this.getBrandInfo({bapId: bap.id})

        if (!brand)
            brand = await this.createBrandInfo(bap.id)

        const fonts = await this.getBrandFonts(brand.id)
        const newPalettesName = await this.getPalettesName({brandId: brand.id})
        for (const newPalettesNameElement of newPalettesName) {
            const hex = await this.getBrandPalettes({
                brandId: brand.id, brandPaletteNameId: newPalettesNameElement.id
            })
            newPalettesNameElement.dataValues.colours = hex
        }
        brand.dataValues['fonts'] = fonts
        brand.dataValues['palette'] = newPalettesName

        return brand
    }

    async editBrandPalette(brandId, brandPaletteName, hex) {
        let existPaletteName = await this.getPaletteName({brandId, name: brandPaletteName})
        if (!existPaletteName)
            existPaletteName = await this.createPaletteName(brandId, brandPaletteName)

        const palettes = await this.getBrandPalettes({brandId, brandPaletteNameId: existPaletteName.id})
        const newHex = hex.filter(itemHex => palettes.every(itemPalette => itemHex !== itemPalette['hex']))
        const removeHex = palettes.filter(itemPalette => hex.every(itemHex => itemHex !== itemPalette['hex']))

        for (const removeHexElement of removeHex) {
            await this.removeBrandPalette({
                brandId, id: removeHexElement.id, brandPaletteNameId: existPaletteName.id
            })
        }

        for (const newHexElement of newHex) {
            await this.addBrandPalette({
                brandId, hex: newHexElement, brandPaletteNameId: existPaletteName.id
            })
        }

        // const newPalettes = await this.getBrandPalettes({brandId})
        const newPalettesName = await this.getPalettesName({brandId})
        for (const newPalettesNameElement of newPalettesName) {
            const hex = await this.getBrandPalettes({brandId, brandPaletteNameId: newPalettesNameElement.id})
            newPalettesNameElement.dataValues.colours = hex
        }
        return newPalettesName
    }

    async editBrandFonts(brandId, fonts) {
        const fontsDb = await this.getBrandFonts(brandId)
        const removeFonts = fontsDb.filter(itemFontDb => !fonts.some(itemFontBody => itemFontBody.font === itemFontDb.font && itemFontBody.size === itemFontDb.size && itemFontBody.italic == itemFontDb.italic && itemFontBody.weight == itemFontDb.weight));

        const newFonts = fonts.filter(itemFontBody => !fontsDb.some(itemFontDb => {
            return itemFontBody.font === itemFontDb.font && itemFontBody.size === itemFontDb.size && itemFontBody.italic == itemFontDb.italic && itemFontBody.weight == itemFontDb.weight
        }))

        for (const newFont of newFonts) {
            await this.addBrandFont({
                brandId, font: newFont.font, size: newFont.size, italic: newFont.italic, weight: newFont.weight
            })
        }

        for (const removeFont of removeFonts) {
            await this.removeBrandFont({id: removeFont.id})
        }

        const newFontsDb = await this.getBrandFonts(brandId)
        return newFontsDb
    }

    async editBranMainInfo(brandId, data, isDelete = false) {
        const brand = await this.getBrandInfo({id: brandId})

        if (!isDelete) {
            data.logo = await imagesService.saveImageDb(brand.logo, {image: data.logo, urlImage: data.urlLogo})
            data.logo = data.logo ? data.logo : brand.logo
        }

        for (const dataKey in data) {
            brand[dataKey] = data[dataKey] || null
        }
        brand.save()
        return brand
    }

    async removeBrandFull(brandId) {
        await this.removeBrandFont({brandId})
        await this.removeBrandPaletteName({brandId})
        await this.editBranMainInfo(brandId, {
            name: null, logo: null, urlLogo: null, designId: null
        }, true)
    }

    async editBrandFullInfo(user, brandId, data) {

        // const palette = await this.editBrandPalette(brandId, data.hex)
        const fonts = await this.editBrandFonts(brandId, data.fonts)
        const main = await this.editBranMainInfo(brandId, {
            name: data.name,
            paletteName: data.paletteName,
            logo: data.logo,
            urlLogo: data.urlLogo,
            designId: data.designId
        })

        return {
            // palette,
            fonts,
            main
        }
    }

    async getPaletteName(options) {
        const paletteName = await BrandPaletteNamesModel.findOne({where: options})
        return paletteName
    }

    async getPalettesName(options) {
        const palettesName = await BrandPaletteNamesModel.findAll({where: options})
        return palettesName
    }

    async createPaletteName(brandId, name) {
        const paletteName = await BrandPaletteNamesModel.create({brandId, name})
        return paletteName
    }

    async removeBrandPalette(options) {
        await BrandPalettesModel.destroy({where: options})
    }
}

export default new BrandsService()