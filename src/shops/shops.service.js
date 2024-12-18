import { ShopsModel } from "./shops.model.js";
import { ApiError } from "../errors/errors.api.js";
import imagesService from "../images/images.service.js";
import releaseService from "../release/release.service.js";
import scheme from "../../database/scheme.js";
import { QueryTypes } from "sequelize";
import { ShopReleasesModel } from "./shop-releases.model.js";
import { ShopDesignsModel } from "./shop-designs.model.js";
import { ShopBasketsModel } from "../customers/baskets/baskets.model.js";
import { ShopDesignTypesModel } from "./shop-design-types.model.js";
import videosService from "../videos/videos.service.js";
import { ShopsLinksModel } from "./shops-socials.model.js";
import { BapsModel } from "../baps/baps.model.js";

class ShopsService {
    async createShop(data) {
        const isExistShop = await this.getShopDb({ where: { name: data.name } });
        if (isExistShop) throw ApiError.badRequest("The shop already exist with this name");
        if (data.bannerType && data.bannerType !== "image" && data.bannerType !== "video" && data.bannerType !== "") throw ApiError.badRequest("bannerType must be a 'string' or 'video', reset - ''");
        if (data.bannerType && !data.banner && !data.urlBanner) throw ApiError.badRequest("bannerType can be specified if banner or urlBanner is specified");
        if (!data.bannerType && (data.banner || data.urlBanner)) throw ApiError.badRequest("bannerType is required together with banner or urlBanner");
        if (data.socialLinksType && data.socialLinksType !== "white" && data.socialLinksType !== "black" && data.socialLinksType !== "colour")
            throw ApiError.badRequest("socialLinksType must be a 'white', 'black' or 'colour'");
        if (data.showSocialLinks && data.showSocialLinks !== "true" && data.showSocialLinks !== "false") throw ApiError.badRequest("showSocialLinks must be a true or fasle");

        const isUrlImage = data.urlBanner && imagesService.isImage(data.urlBanner, ["jpg", "jpeg", "png"]);
        const isImage = data.banner && imagesService.isImage(data.banner.name, ["jpg", "jpeg", "png"]);
        const isVideo = data.banner && videosService.isVideo(data.banner.name, ["mp4", "mov", "avi"]);

        if (data.banner && !isImage && !isVideo && !isUrlImage)
            throw ApiError.badRequest("Videos are available only with '.mp4', '.mov', '.avi' extensions, and images only with '.jpg', '.jpeg', '.png'");

        if (((isImage || isUrlImage) && data.bannerType === "video") || (isVideo && data.bannerType === "image")) throw ApiError.badRequest("bannerType is not valid");

        data.backgroundBlur = data.backgroundBlur > 100 ? 100 : data.backgroundBlur;
        data.backgroundBlur = data.backgroundBlur < 0 ? 0 : data.backgroundBlur;

        data.favicon = await imagesService.saveImageDb(false, {
            image: data.favicon,
            urlImage: data.urlFavicon,
        });
        data.background = await imagesService.saveImageDb(false, {
            image: data.background,
            urlImage: data.urlBackground,
        });
        if (data.bannerType === "video") {
            data.banner = await videosService.saveVideoDb(false, {
                video: data.banner,
                urlVideo: data.urlBanner,
            });
        } else {
            data.banner = await imagesService.saveImageDb(false, {
                image: data.banner,
                urlImage: data.urlBanner,
            });
        }
        data.logo = await imagesService.saveImageDb(false, {
            image: data.logo,
            urlImage: data.urlLogo,
        });
        data.urlFavicon = null;
        data.urlBackground = null;
        data.urlBanner = null;
        data.urlLogo = null;

        if (data.bannerType === "") {
            data.banner = null;
            data.bannerType = null;
        }

        const shop = await ShopsModel.create(data);
        return shop;
    }

    async getShopDb(whereOptions) {
        const shop = await ShopsModel.findOne(whereOptions);
        return shop;
    }

    async editSettings(shopId, data) {
        const shop = await this.getShopDb({ where: { id: shopId } });
        if (data.name) {
            const existShopName = await this.getShopDb({ where: { name: data.name } });
            if (existShopName) throw ApiError.badRequest("The shop already exist with this name");
        }
        if (data.bannerType && data.bannerType !== "image" && data.bannerType !== "video" && data.bannerType !== "") throw ApiError.badRequest("bannerType must be a 'string' or 'video', reset - ''");
        if (data.bannerType && !data.banner && !data.urlBanner) throw ApiError.badRequest("bannerType can be specified if banner or urlBanner is specified");
        if (data.bannerType === undefined && (data.banner || data.urlBanner)) throw ApiError.badRequest("bannerType is required together with banner or urlBanner");
        if (data.socialLinksType && data.socialLinksType !== "white" && data.socialLinksType !== "black" && data.socialLinksType !== "colour")
            throw ApiError.badRequest("socialLinksType must be a 'white', 'black' or 'colour'");
        if (data.showSocialLinks && data.showSocialLinks !== "true" && data.showSocialLinks !== "false") throw ApiError.badRequest("showSocialLinks must be a true or fasle");

        const isUrlImage = data.urlBanner && imagesService.isImage(data.urlBanner, ["jpg", "jpeg", "png"]);
        const isImage = data.banner && imagesService.isImage(data.banner.name, ["jpg", "jpeg", "png"]);
        const isVideo = data.banner && videosService.isVideo(data.banner.name, ["mp4", "mov", "avi"]);

        if (data.banner && !isImage && !isVideo && !isUrlImage)
            throw ApiError.badRequest("Videos are available only with '.mp4', '.mov', '.avi' extensions, and images only with '.jpg', '.jpeg', '.png'");
        if (((isImage || isUrlImage) && data.bannerType === "video") || (isVideo && data.bannerType === "image")) throw ApiError.badRequest("bannerType is not valid");

        data.backgroundBlur = data?.backgroundBlur > 100 && data?.backgroundBlur ? 100 : data?.backgroundBlur;
        data.backgroundBlur = data?.backgroundBlur < 0 && data?.backgroundBlur ? 0 : data?.backgroundBlur;

        data.favicon = await imagesService.saveImageDb(shop.favicon, {
            image: data.favicon,
            urlImage: data.urlFavicon,
        });
        data.background = await imagesService.saveImageDb(shop.background, {
            image: data.background,
            urlImage: data.urlBackground,
        });
        if (data.bannerType === "video") {
            data.banner = await videosService.saveVideoDb(shop.banner, {
                video: data.banner,
                urlVideo: data.urlBanner,
            });
        } else {
            data.banner = await imagesService.saveImageDb(shop.banner, {
                image: data.banner,
                urlImage: data.urlBanner,
            });
        }
        data.logo = await imagesService.saveImageDb(shop.logo, {
            image: data.logo,
            urlImage: data.urlLogo,
        });
        data.urlFavicon = null;
        data.urlBackground = null;
        data.urlBanner = null;
        data.urlLogo = null;

        for (const dataKey in data) {
            if (dataKey === "metaTitle" || dataKey === "metaDescription" || dataKey === "facebookPixel" || dataKey === "bannerType") {
                if (data[dataKey] === "") shop[dataKey] = null;
            }
            if (dataKey === "bannerType" && data.bannerType === "") shop.banner = null;
            if (data[dataKey]) shop[dataKey] = data[dataKey];
        }
        shop.save();
        return shop;
    }

    async addReleaseToShop(shopId, releaseIds) {
        const shop = await this.getShopDb({ where: { id: shopId } });
        const releases = await releaseService.getReleases({ bapId: shop.bapId });
        console.log(releases);
        const isValidRelease = releaseIds.every((releaseId) => releases.some((item) => item.id === releaseId));

        if (!shop || !isValidRelease)
            throw ApiError.badRequest(
                "An error occurred while adding the release to the store." + " It is possible that this release already exists in another store or the specified release does not exist."
            );

        for (const releaseId of releaseIds) {
            await ShopReleasesModel.create({
                shopId,
                releaseId,
            });
        }
    }

    async removeReleaseFromShop(shopId, releaseId) {
        await ShopReleasesModel.destroy({ where: { shopId, releaseId } });
    }

    async getShopReleases(name) {
        const releases = await scheme.query(
            `
            SELECT releases.id as id, releases.type as type, releases.createdAt as createdAt, releases.bapId, shopId,
                releases.logo as logo, releases.name as name, releases.releasePrice as releasePrice, shop_releases.backgroundBlur as backgroundBlur,
                releases.releaseSpotifyId as releaseSpotifyId, baps.name as bapName, releases.releaseDate as releaseDate
            FROM releases
            LEFT JOIN shop_releases ON shop_releases.releaseId = releases.id
            LEFT JOIN shops ON shops.id = shop_releases.shopId
            LEFT JOIN baps ON baps.id = shops.bapId
            WHERE shops.name = "${name}"
        `,
            {
                raw: true,
                type: QueryTypes.SELECT,
            }
        );

        const shop = await this.getShopDb({
            where: { name },
            include: [
                {
                    model: BapsModel,
                    attributes: ["name"],
                },
            ],
        });
        if (!shop) return { message: "We found nothing by this name" };

        shop.dataValues.bapName = shop.bap.name;
        delete shop.dataValues.bap;

        const socialLinks = await ShopsLinksModel.findAll({ where: { shopId: shop.id } });
        shop.dataValues.socialLinks = socialLinks;

        const design = await this.getShopDesigns({ shopId: shop.id });

        return { releases, design, shop };
    }

    async getShops(data) {
        if ((data.bapId && data.releaseId) || (!data.bapId && !data.releaseId)) throw ApiError.badRequest("You must enter only one query param.");

        let where;
        for (const dataKey in data) {
            if (data[dataKey]) {
                if (data.bapId) where = `shops.${dataKey} = ${data[dataKey]}`;
                else where = `shop_releases.${dataKey} = ${data[dataKey]}`;
            }
        }

        let shops = await scheme.query(
            `
            SELECT shops.*, 
                webpages_types.name as webpagesTypeName, 
                shops.id as id, 
                GROUP_CONCAT(shop_releases.releaseId) as releaseIds
            FROM shops
            LEFT JOIN position_types ON shops.positionTypeId = position_types.id
            LEFT JOIN shop_releases ON shop_releases.shopId = shops.id
            LEFT JOIN webpages_types ON shops.webpagesTypeId = webpages_types.id
            WHERE ${where}
            GROUP BY shops.id, webpages_types.name
        `,
            {
                raw: true,
                type: QueryTypes.SELECT,
            }
        );

        shops = shops.map((shop) => {
            const { releaseId, ...rest } = shop;
            const releaseIds = shop.releaseIds ? shop.releaseIds.split(",").map(Number) : [];
            return {
                ...rest,
                releaseIds,
            };
        });

        return shops;
    }

    async getShopsName() {
        const shops = await ShopsModel.findAll({
            attributes: ["name"],
            include: [
                {
                    model: BapsModel,
                    attributes: ["name"],
                },
            ],
        });
        let shopNames = [];
        for (const shop of shops) {
            shopNames.push({ linkName: shop.name, bapName: shop.bap.name });
        }

        return shopNames;
    }

    async addShopDesign(shopId, data) {
        const shopDesignType = await this.getListDesignType(data.shopDesignTypeId);
        if (!shopDesignType) throw ApiError.badRequest("Design type doesn't exist");

        const existDesign = await this.getShopDesign({ shopId, shopDesignTypeId: data.shopDesignTypeId });
        if (!existDesign) {
            const design = await ShopDesignsModel.create({ shopId, ...data });
            return design;
        }

        for (const dataKey in data) {
            if (data[dataKey]) existDesign[dataKey] = data[dataKey];
        }
        existDesign.save();
        return existDesign;
    }

    async getShopDesigns(options) {
        const design = await ShopDesignsModel.findAll({ where: options });
        return design;
    }

    async getShopDesign(options) {
        const design = await ShopDesignsModel.findOne({ where: options });
        return design;
    }

    async removeShopDesign(designId) {
        await ShopDesignsModel.destroy({ where: { id: designId } });
    }

    async getShopReleaseDb(options) {
        const shopRelease = await ShopReleasesModel.findOne({ where: options });
        return shopRelease;
    }

    async getShopBasket(options) {
        const shopBasket = await ShopBasketsModel.findAll({ where: options });
        return shopBasket;
    }

    async getListDesignType(id) {
        const designType = await ShopDesignTypesModel.findByPk(id);
        return designType;
    }

    async removeShop(shopId) {
        await ShopsModel.destroy({ where: { id: shopId } });
    }

    async editSettingsReleaseShop(releaseId, shopId, data) {
        const shopRelease = await this.getShopReleaseDb({ releaseId, shopId });
        if (!shopRelease) throw ApiError.badRequest("The release doesn't exist in this shop");

        if (data.backgroundBlur) {
            data.backgroundBlur = data.backgroundBlur > 100 ? 100 : data.backgroundBlur;
            data.backgroundBlur = data.backgroundBlur < 0 ? 0 : data.backgroundBlur;
        }

        for (const dataKey in data) {
            if (data[dataKey]) shopRelease[dataKey] = data[dataKey];
        }

        shopRelease.save();
        return shopRelease;
    }

    async getSocialLinks(options) {
        const links = await ShopsLinksModel.findAll({ where: options });
        return links;
    }

    async addSocialLink(values) {
        await ShopsLinksModel.create(values);
    }

    async removeSocialLink(options) {
        await ShopsLinksModel.destroy({ where: options });
    }

    async addSocialLinks(shopId, socialLinks) {
        const socialLinksDb = await this.getSocialLinks({ shopId });

        const addSocialLinks = socialLinks.filter((socialLink) => socialLinksDb.every((linkDb) => socialLink.link !== linkDb.link || socialLink.position !== linkDb.position));

        const removeSocialLinks = socialLinksDb.filter((linkDb) => socialLinks.every((socialLink) => socialLink.link !== linkDb.link || socialLink.position !== linkDb.position));

        for (const removeLink of removeSocialLinks) {
            await this.removeSocialLink({ id: removeLink.id });
        }

        for (const addLink of addSocialLinks) {
            await this.addSocialLink({
                link: addLink.link,
                position: addLink.position,
                shopId,
            });
        }

        return { socialLinks };
    }
}

export default new ShopsService();
