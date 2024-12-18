import releaseService from "../release/release.service.js";
import { ApiError } from "../errors/errors.api.js";
import { LandingModel } from "./landing.model.js";
import tracksService from "../tracks/tracks.service.js";
import np from "number-precision";
import scheme from "../../database/scheme.js";
import { QueryTypes } from "sequelize";
import imagesService from "../images/images.service.js";
import { LandingDesignsModel } from "./landing-designs.model.js";
import bapsService from "../baps/baps.service.js";
import { LandingBasketsModel } from "../customers/baskets/baskets.model.js";
import { LandingLinksModel } from "./landing-socials.model.js";
import { TracksModel } from "../tracks/tracks.model.js";
import { ReleaseModel } from "../release/release.model.js";
import { LandingStreamingsLinksModel } from "./landing-streamings.model.js";

class LandingService {
    async createLandingPage(user, data) {
        const release = await releaseService.getRelease({ id: data.releaseId });
        if (!release) throw ApiError.badRequest("The release doesn't exist");

        const existLandingPageByName = await LandingModel.findOne({ where: { name: data.name } });
        const existLandingPageByReleaseId = await LandingModel.findOne({ where: { name: data.releaseId } });
        if (existLandingPageByName) throw ApiError.badRequest("The landing page already exist with this name");
        if (existLandingPageByReleaseId) throw ApiError.badRequest("In this release, there is already a landing page.");
        if (data.socialLinksType && data.socialLinksType !== "white" && data.socialLinksType !== "black" && data.socialLinksType !== "colour")
            throw ApiError.badRequest("socialLinksType must be a 'white', 'black' or 'colour'");
        if (data.showSocialLinks && data.showSocialLinks !== "true" && data.showSocialLinks !== "false") throw ApiError.badRequest("showSocialLinks must be a true or fasle");
        if (data.trackIdForStreaming) {
            const releaseTrack = await ReleaseModel.findByPk(data.releaseId, {
                include: {
                    model: TracksModel,
                    where: { id: data.trackIdForStreaming },
                },
            });
            if (!releaseTrack) throw ApiError.badRequest("The track doesn't exist in this release");
            if (data.trackIdForStreaming && data.webpagesTypeId != 3) throw ApiError.badRequest("Track can only be added to landing pages with webpagesTypeId 3");
        }

        data.backgroundBlur = data.backgroundBlur > 100 ? 100 : data.backgroundBlur;
        data.backgroundBlur = data.backgroundBlur < 0 ? 0 : data.backgroundBlur;

        data.favicon = await imagesService.saveImageDb(null, {
            image: data.favicon,
            urlImage: data.urlFavicon,
        });
        data.logo = await imagesService.saveImageDb(null, {
            image: data.logo,
            urlImage: data.urlLogo,
        });

        const { dataValues } = await LandingModel.create({
            name: data.name,
            favicon: data.favicon,
            releaseId: data.releaseId,
            webpagesTypeId: data.webpagesTypeId,
            backgroundBlur: data.backgroundBlur,
            metaTitle: data.metaTitle,
            metaDescription: data.metaDescription,
            logo: data.logo,
            facebookPixel: data.facebookPixel,
            trackIdForStreaming: data.trackIdForStreaming,
            showSocialLinks: data.showSocialLinks,
            socialLinksType: data.socialLinksType,
        });

        const releaseFullInfo = await releaseService.getFullInfoByReleaseId(release.id);

        return { ...dataValues, releaseFullInfo };
    }

    async getLandingPage(query) {
        if ((query.name && query.id) || (!query.name && !query.id)) throw ApiError.badRequest("You must enter only one query param.");

        const param = query.id ? { id: query.id } : { name: query.name };

        const landingPage = await this.getLandingPageDb({
            where: param,
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });

        if (!landingPage) throw ApiError.badRequest("The landing page doesn't exist");

        const release = await releaseService.getRelease({ id: landingPage.releaseId });
        const bap = await bapsService.getBap({ id: release.bapId });
        const tracks = await tracksService.getTracks({
            where: {
                releaseId: landingPage.releaseId,
            },
            attributes: ["id", "uniqueName", "price", "info", "name"],
        });

        landingPage.dataValues["bapId"] = bap.id;
        landingPage.dataValues["bapName"] = bap.name;
        landingPage.dataValues["releaseName"] = release.name;
        landingPage.dataValues["releaseLogo"] = release.logo;
        landingPage.dataValues["releasePrice"] = release.releasePrice;

        let sumPriceTracks = 0;
        for (const track of tracks) {
            sumPriceTracks = np.plus(sumPriceTracks + +track.price);
            track.info = JSON.parse(track.info);
        }
        const design = await this.getLandingDesigns({ landingPageId: landingPage.id });
        const socialLinks = await this.getSocialLinks({ landingPageId: landingPage.id });
        const streamingLinks = await this.getStreamingLinks({ landingPageId: landingPage.id });
        return { ...landingPage.dataValues, sumPriceTracks, tracks, design, socialLinks, streamingLinks };
    }

    async getLandingPageName() {
        const landingPageNames = await LandingModel.findAll({
            attributes: ["name"],
        });

        let landingNames = [];

        for (const landing of landingPageNames) {
            landingNames.push(landing.name);
        }

        return landingNames;
    }

    async getLandingPageDb(whereOptions) {
        const landingPage = await LandingModel.findOne(whereOptions);
        return landingPage;
    }

    async editLandingPage(landingPageId, data) {
        if (data.socialLinksType && data.socialLinksType !== "white" && data.socialLinksType !== "black" && data.socialLinksType !== "colour")
            throw ApiError.badRequest("socialLinksType must be a 'white', 'black' or 'colour'");
        if (data.showSocialLinks && data.showSocialLinks !== "true" && data.showSocialLinks !== "false") throw ApiError.badRequest("showSocialLinks must be a true or fasle");

        const landingPage = await this.getLandingPageDb({
            where: {
                id: landingPageId,
            },
        });

        if (data.trackIdForStreaming) {
            const releaseTrack = await ReleaseModel.findByPk(landingPage.releaseId, {
                include: {
                    model: TracksModel,
                    where: { id: data.trackIdForStreaming },
                },
            });
            if (!releaseTrack) throw ApiError.badRequest("The track doesn't exist in this release");
            if (landingPage.webpagesTypeId != 3) throw ApiError.badRequest("Track cannot be added to this landing page");
        }

        data.backgroundBlur = data.backgroundBlur > 100 ? 100 : data.backgroundBlur;
        data.backgroundBlur = data.backgroundBlur < 0 ? 0 : data.backgroundBlur;

        data.favicon = await imagesService.saveImageDb(landingPage.favicon, {
            image: data.favicon,
            urlImage: data.urlFavicon,
        });
        data.logo = await imagesService.saveImageDb(landingPage.logo, {
            image: data.logo,
            urlImage: data.urlLogo,
        });
        data.urlLogo = null;
        data.urlFavicon = null;

        for (const dataKey in data) {
            if (dataKey === "metaTitle" || dataKey === "metaDescription" || dataKey === "facebookPixel" || dataKey === "trackIdForStreaming") {
                if (data[dataKey] === "") landingPage[dataKey] = null;
            }
            if (data[dataKey]) landingPage[dataKey] = data[dataKey];
        }
        landingPage.save();

        return landingPage;
    }

    async getLandingPages(data) {
        if ((data.bapId && data.releaseId) || (!data.bapId && !data.releaseId)) throw ApiError.badRequest("You must enter only one query param.");

        let where;
        for (const dataKey in data) {
            if (data[dataKey]) where = `${dataKey} = ${data[dataKey]}`;
        }

        const landingPages = await scheme.query(
            `
            SELECT landings.id as id, landings.name as name, webpages_types.name as webpagesTypeName, backgroundBlur,
            favicon, landings.logo as logo, metaTitle, metaDescription, facebookPixel, releases.id as releaseId, releases.logo as releaseLogo, releases.thumbnail as releaseThumbnail,
            webpages_types.id as webpagesTypeId, landings.trackIdForStreaming as trackIdForStreaming
            FROM landings
            LEFT JOIN releases ON releases.id = landings.releaseId
            LEFT JOIN webpages_types ON webpages_types.id = landings.webpagesTypeId
            WHERE ${where}
        `,
            {
                raw: true,
                type: QueryTypes.SELECT,
            }
        );

        return landingPages;
    }

    async addLandingDesign(landingPageId, data) {
        const optionsMap = ["hex", "font", "size", "italic", "weight"];
        const existDesign = await this.getLandingDesign({ landingPageId, landingDesignTypeId: data.landingDesignTypeId });
        if (!existDesign) {
            const design = await LandingDesignsModel.create({ landingPageId, ...data });
            return design;
        }

        for (const dataKey in data) {
            if (data[dataKey] && optionsMap.includes(dataKey)) existDesign[dataKey] = data[dataKey];
        }
        existDesign.save();
        return existDesign;
    }

    async getLandingDesigns(options) {
        const design = await LandingDesignsModel.findAll({ where: options });
        return design;
    }

    async getLandingDesign(options) {
        const design = await LandingDesignsModel.findOne({ where: options });
        return design;
    }

    async removeLandingDesign(landingPageId, designId) {
        const design = await LandingDesignsModel.destroy({ where: { id: designId, landingPageId } });
        return design;
    }

    async removeLandingPage(landingPageId) {
        await LandingModel.destroy({ where: { id: landingPageId } });
    }

    async getLandingBasket(options) {
        const basket = await LandingBasketsModel.findAll({ where: options });
        return basket;
    }

    async addSocialLinks(landingPageId, socialLinks) {
        const socialLinksDb = await this.getSocialLinks({ landingPageId });

        const addSocialLinks = socialLinks.filter((socialLink) => socialLinksDb.every((linkDb) => socialLink.link !== linkDb.link || socialLink.position !== linkDb.position));

        const removeSocialLinks = socialLinksDb.filter((linkDb) => socialLinks.every((socialLink) => socialLink.link !== linkDb.link || socialLink.position !== linkDb.position));

        for (const removeLink of removeSocialLinks) {
            await this.removeSocialLink({ id: removeLink.id });
        }

        for (const addLink of addSocialLinks) {
            await this.addSocialLink({
                link: addLink.link,
                position: addLink.position,
                landingPageId,
            });
        }
        return { socialLinks };
    }

    async addStreamingLinks(landingPageId, streamingLinks) {
        const streamingLinksDb = await this.getStreamingLinks({ landingPageId });

        const addStreamingLinks = streamingLinks.filter((streamingLink) => streamingLinksDb.every((linkDb) => streamingLink.link !== linkDb.link || streamingLink.position !== linkDb.position));

        const removeStreamingLinks = streamingLinksDb.filter((linkDb) => streamingLinks.every((streamingLink) => streamingLink.link !== linkDb.link || streamingLink.position !== linkDb.position));

        for (const removeLink of removeStreamingLinks) {
            await this.removeStreamingLink({ id: removeLink.id });
        }

        for (const addLink of addStreamingLinks) {
            await this.addStreamingLink({
                link: addLink.link,
                position: addLink.position,
                landingPageId,
            });
        }
        return { streamingLinks };
    }

    async getSocialLinks(options) {
        const links = await LandingLinksModel.findAll({ where: options });
        return links;
    }

    async getStreamingLinks(options) {
        const links = await LandingStreamingsLinksModel.findAll({ where: options });
        return links;
    }

    async removeSocialLink(options) {
        await LandingLinksModel.destroy({ where: options });
    }

    async removeStreamingLink(options) {
        await LandingStreamingsLinksModel.destroy({ where: options });
    }

    async addSocialLink(values) {
        await LandingLinksModel.create(values);
    }

    async addStreamingLink(values) {
        await LandingStreamingsLinksModel.create(values);
    }
}

export default new LandingService();
