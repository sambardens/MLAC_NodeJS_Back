import tracksService from "../../tracks/tracks.service.js";
import {LandingBasketsModel, ShopBasketsModel} from "../baskets/baskets.model.js";
import scheme from "../../../database/scheme.js";
import {QueryTypes, Sequelize} from "sequelize";
import landingService from "../../landing/landing.service.js";
import {ApiError} from "../../errors/errors.api.js";
import usersService from "../../users/users.service.js";
import {ShopsModel} from "../../shops/shops.model.js";
import {TracksModel} from "../../tracks/tracks.model.js";
import {LandingModel} from "../../landing/landing.model.js";

class CustomersLandingService {

    async addTrackToBasket(authorRequest, landingPageId, trackIds) {
        const customer = await usersService.getUser({id: authorRequest.id})
        const landingPage = await landingService.getLandingPageDb({where: {id: landingPageId}})
        if (!landingPage)
            throw ApiError.badRequest('Landing page doesn\'t exist')

        const tracks = await tracksService.getTracksByReleaseId(landingPage.releaseId)
        const filteredTrackIds = trackIds.filter(trackId => tracks.some(track => trackId === track.id))

        if (filteredTrackIds.length !== trackIds.length)
            throw ApiError.badRequest('It\'s possible that the track doesn\'t exist.')

        for (const trackId of trackIds) {
            const basketTrack = await this.getTrackFromBasket({trackId: trackId, userId: customer.id})
            if (!basketTrack) await this.createTrackInBasket({userId: customer.id, trackId, landingPageId})
                // throw ApiError.badRequest('You have already added this track to the basket')
        }
    }

    async getTrackFromBasket(options) {
        const basket = await LandingBasketsModel.findOne({where: options})
        return basket
    }

    async createTrackInBasket(values) {
        const basket = await LandingBasketsModel.create(values)
        return basket
    }

    async removeTrackFromBasket(user, landingPageId, trackId) {
        await LandingBasketsModel.destroy({where: {userId: user.id, landingPageId, trackId}})
    }

    async getTracksFromBasket(user, landingPageId) {
        const basket = await LandingBasketsModel.findAll({
            attributes: [],
            where: {
                landingPageId, userId: user.id
            },
            include: [/*{
                model: LandingModel, attributes: ['name']
            },*/ {
                model: TracksModel, attributes: [
                    'id',
                    'name',
                    "uniqueName",
                    [Sequelize.literal('CONCAT("cut_", `track`.`uniqueName`)'), 'preview'],
                    "originalName",
                    "type",
                    "price",
                    "info",
                    "position",
                    "socialLinks",
                    "composers",
                    "duration",
                    "discNumber",
                    "isrc",
                    "lyrics",
                    "spotifyId",
                    "spotifyPreviewUrl",
                    "timeCode",
                    "albumSpotifyId",
                    "explicit",
                    "spotifyLink",
                    "createdAt",
                    "updatedAt",
                    "releaseId",
                    "bapId",
                ]
            }]
        })
        for (const basketElement of basket) {
            basketElement.track.info = JSON.parse(basketElement.track.info)
        }

        // const basket = await scheme.query(`
        //     SELECT landings.id as landingPageId, landings.name as landingPageName, tracks.name as trackName,
        //         uniqueName, tracks.id as trackId, landing_baskets.id as basketId
        //     FROM landing_baskets
        //     LEFT JOIN landings ON landing_baskets.landingId = landings.id
        //     LEFT JOIN tracks ON landing_baskets.trackId = tracks.id
        //     WHERE landingId = ${landingId} && userId = ${user.id}
        // `, {
        //     raw: true,
        //     type: QueryTypes.SELECT
        // })
        return basket
    }
}

export default new CustomersLandingService()