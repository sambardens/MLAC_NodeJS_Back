import bapsService from "../baps/baps.service.js";
import { ApiError } from "../errors/errors.api.js";
import imagesService from "../images/images.service.js";
import { ReleaseModel } from "./release.model.js";
import { GenresSubModel } from "../genres/genres.model.js";
import scheme from "../../database/scheme.js";
import { QueryTypes, Sequelize } from "sequelize";
import tracksService from "../tracks/tracks.service.js";
import { TracksModel } from "../tracks/tracks.model.js";
import { BapsModel } from "../baps/baps.model.js";
import filterService from "../filter/filter.service.js";
import { allowedSortFieldsRelease, allowedSortOrders, releaseFilter } from "../../utils/global.variables.js";

Array.prototype.toMapBy = function (prop) {
    return this.reduce(function (groups, item) {
        console.log(prop, "prop");
        console.log(groups, "prop");
        const val = item[prop];
        groups[val] = item;
        return groups;
    }, {});
};

class ReleaseService {
    async createRelease(user, bapId, data) {
        if (!bapId) throw ApiError.badRequest("Bap id is required");

        const bap = await bapsService.getBap({ id: bapId });
        if (!bap) throw ApiError.badRequest("This bap don't exist");

        const member = await bapsService.checkOnMemberBap(user.id, bap.id);
        if (!member) throw ApiError.forbidden("You don't member this bap");

        if (data.logo && data.urlLogo) throw ApiError.badRequest("You must enter only file or urlLogo");

        const sizes = {
            width: 301,
            height: 301,
        };

        data.logo = await imagesService.saveImageDb(false, { image: data.logo, urlImage: data.urlLogo, sizes });
        data.urlLogo = null;
        data.copyrights = JSON.stringify(data.copyrights);

        if (data.designId === "null" || data.designId === "") data.designId = null;

        if (data.logo) {
            data.thumbnail = `thumb_${data.logo}`;
        }

        const release = await ReleaseModel.create({ ...data, bapId });

        release.copyrights = release.copyrights ? JSON.parse(release.copyrights) : undefined
        return release;
    }

    async getRelease(options) {
        const release = await ReleaseModel.findOne({ where: options });
        return release;
    }

    async getReleases(options, sortField = "id", sortOrder = "ASC") {
        if (sortField && !allowedSortFieldsRelease.includes(sortField)) {
            throw new Error("Invalid sort field");
        }

        if (sortOrder && !allowedSortOrders.includes(sortOrder)) {
            throw new Error("Invalid sort order");
        }

        if (sortField != "id") {
            sortOrder = "DESC";
        }

        const order = sortField && sortOrder ? [[sortField, sortOrder]] : undefined;

        const releases = await ReleaseModel.findAll({
            where: options,
            attributes: [
                "id",
                "name",
                "type",
                "logo",
                "thumbnail",
                "releaseSpotifyId",
                "auddSocialLink",
                "releaseDate",
                "distributeDate",
                "copyrights",
                "label",
                "mainGenreId",
                "secondaryGenreId",
                "designId",
                "releasesStatus",
                "createdAt",
                "updatedAt",
                "bapId",
                "subGenresIds",
                "totalTracks",
                "upc",
                "releasePrice",
                "evearaReleaseId",
                "evearaLabelId",
                "evearaReleaseLogo",
                "appleMusicReleasePriceId",
                "appleMusicTrackPriceId",
                "amazonReleasePriceId",
                "amazonTrackPriceId",
                "evearaGenreIds",
                "isReleaseByOriginalAudio",
                [Sequelize.literal("`bap`.`name`"), "bapName"],
                [Sequelize.fn("COUNT", Sequelize.col("tracks.releaseId")), "countTracks"],
            ],
            include: ["mainGenere", "secondGeneres", { model: TracksModel, attributes: [] }, { model: BapsModel, attributes: [] }],
            group: ["release.id"],
            order,
        });

        const subGeneresIds = [];

        for (const release of releases) {
            if (release.subGenresIds) subGeneresIds.push(...release.subGenresIds);
            if (release.evearaGenreIds) release.evearaGenreIds = JSON.parse(release.evearaGenreIds);
            if (release.copyrights) release.copyrights = JSON.parse(release.copyrights);
        }

        let subGeneres;
        if (subGeneresIds.length) subGeneres = await GenresSubModel.findAll({ where: { id: subGeneresIds } });

        if (subGeneres && subGeneres.length) {
            const mapIds = subGeneres.toMapBy("id");
            for (const release of releases) if (release.subGenresIds) release.dataValues.subGenres = release.subGenresIds.map((id) => mapIds[id]?.dataValues);
        }

        return releases;
    }

    async getAllReleases(data, orderBy, sortOrder) {
        const whereClause = filterService.generateFilterForSQL(data);
        const releases = await this.getReleases(whereClause, orderBy, sortOrder);

        const filteredReleases = releases.filter((release) => {
            const mainGenreCondition = !data.mainGenre || (release.mainGenere && release.mainGenere.name === data.mainGenre);
            const subGenreCondition = !data.subGenres || (release.dataValues.subGenres && release.dataValues.subGenres.filter((name) => name === data.subGenres));

            return mainGenreCondition && subGenreCondition;
        });
        return filteredReleases;
    }

    async getReleaseWithTrack(releaseId) {
        const releases = await ReleaseModel.findOne({
            where: { id: releaseId },
            attributes: ["id", "name", "type", "logo", [Sequelize.literal("`bap`.`name`"), "bapName"]],
            include: [{ model: TracksModel }, { model: BapsModel, attributes: [] }],
        });
        return releases;
    }

    async getFullInfoByReleaseId(releaseId) {
        const release = (
            await scheme.query(
                `
            SELECT *, releases.id as id
            FROM releases
            LEFT JOIN baps ON baps.id = releases.bapId
            LEFT JOIN brands ON brands.bapId = baps.id
            WHERE releases.id = ${releaseId}
        `,
                {
                    raw: true,
                    type: QueryTypes.SELECT,
                }
            )
        )[0];

        const tracks = await tracksService.getTracks({
            where: { releaseId },
            attributes: ["id", "uniqueName"],
        });
        release["tracks"] = tracks;
        return release;
    }

    async getTracksStreamingLinks(releaseSpotifyId) {
        const release = await ReleaseModel.findOne({
            attributes: ["id", "name", "allTracksStreamingLinks"],
            where: { releaseSpotifyId },
        });

        release.allTracksStreamingLinks = release.allTracksStreamingLinks ? JSON.parse(release?.allTracksStreamingLinks) : null;

        return release;
    }

    async editRelease(releaseId, data) {
        console.log('data: ', data);
        const release = await this.getRelease({ id: releaseId });
        if (!release) throw ApiError.badRequest("This release doesn't exist");
        if (data.logo && data.urlLogo) throw ApiError.badRequest("You must enter only file or urlLogo");

        const sizes = {
            width: 301,
            height: 301,
        };

        data.logo = await imagesService.saveImageDb(release.logo, { image: data.logo, urlImage: data.urlLogo, sizes });
        data.urlLogo = null;

        if (data.appleMusicReleasePriceId || data.appleMusicTrackPriceId || data.appleMusicTrackPriceId || data.appleMusicTrackPriceId) {
        }
        if (data.designId === "null" || data.designId === "") data.designId = null;
        if (data.logo) {
            data.thumbnail = `thumb_${data.logo}`;
        } else if (release.logo) {
            data.thumbnail = `thumb_${release.logo}`;
        } else {
            data.thumbnail = null;
        }

        data.copyrights = typeof data.copyrights === 'string' ? data.copyrights : JSON.stringify(data.copyrights);
        const prices = ["appleMusicReleasePriceId", "appleMusicTrackPriceId", "amazonReleasePriceId", "amazonTrackPriceId"];
        for (const dataKey in data) {
            const value = data[dataKey];
            const checkValue = dataKey === "releasePrice" ? value === 0 : value === null;
            if (prices.some((priceName) => dataKey === priceName)) {
                release[dataKey] = +value;
            } else if (value || checkValue) release[dataKey] = data[dataKey];
        }
        await release.save();

        release.dataValues.evearaGenreIds = JSON.parse(release.dataValues.evearaGenreIds);
        release.dataValues.copyrights = JSON.parse(release.dataValues.copyrights);

        return release; 
    }

    async uniqueFields() {
        const uniqueFields = await filterService.generateUniqueFields(releaseFilter);
        return uniqueFields;
    }

    async updateReleaseAsAdmin(releaseId, releasesStatus) {
        const release = await this.getRelease(releaseId);

        if (releasesStatus) release.releasesStatus = releasesStatus;

        release.save();
    }

    async deleteRelease(releaseId) {
        const release = await ReleaseModel.destroy({ where: { id: releaseId } });
        return release;
    }

    async checkTrackInRelease(releaseId, spotifyId) {
        const release = this.getRelease({ spotifyId });
        console.log(release);
    }

    async editReleaseAllTracksStreamingLinks(releaseSpotifyId, allTracksStreamingLinks) {
        const release = await this.getRelease({ releaseSpotifyId });

        if (!release) throw ApiError.badRequest("We don`t find release with this Spotify ID");

        // Ensure preview URLs are included in streaming links
        const processedLinks = allTracksStreamingLinks.map(track => ({
            ...track,
            auddPreviewUrl: track.preview_url || track.previewUrl,
            timestamp: new Date().toISOString()
        }));

        const data = {
            allTracksStreamingLinks: JSON.stringify(processedLinks),
        };
        const newRelease = await this.editRelease(release.id, data);

        return { id: newRelease.id, name: newRelease.name, allTracksStreamingLinks: newRelease?.allTracksStreamingLinks ? JSON.parse(newRelease.allTracksStreamingLinks) : null };
    }
}

export default new ReleaseService();

// new ReleaseService().getReleases({
//     bapId: 74
// }).then((r)=>console.dir(JSON.parse(JSON.stringify(r)), {depth: 3})).catch(console.log)
