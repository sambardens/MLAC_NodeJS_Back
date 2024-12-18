import {ShopBasketsModel} from "../baskets/baskets.model.js";
import scheme from "../../../database/scheme.js";
import {QueryTypes} from "sequelize";
import tracksService from "../../tracks/tracks.service.js";
import shopsService from "../../shops/shops.service.js";
import {ApiError} from "../../errors/errors.api.js";
import usersService from "../../users/users.service.js";
import {ShopsModel} from "../../shops/shops.model.js";
import {UsersModel} from "../../users/users.model.js";
import {TracksModel} from "../../tracks/tracks.model.js";

class CustomersShopService {

    async addTrackToBasket(authorRequest, shopId, trackIds) {
        const shop = await shopsService.getShopDb({where: {id: shopId}})
        if (!shop)
            throw ApiError.badRequest('The shop doesn\'t exist')

        const {releases} = await shopsService.getShopReleases(shop.name)
        for (const trackId of trackIds) {
            const track = await tracksService.getTrack({id: trackId})
            const basketTrack = await this.getTrackFromBasket({
                trackId, userId: authorRequest.id, shopId
            })
            const trackExistRelease = releases.some(release => release.id === track.releaseId)

            if (!track || !trackExistRelease) {
                throw ApiError.badRequest('It\'s possible that the track doesn\'t exist.')
            }

            if (!basketTrack) await this.createTrackInBasket({userId: authorRequest.id, trackId, shopId})
        }
    }

    async getTrackFromBasket(options) {
        const basket = await ShopBasketsModel.findOne({where: options})
        return basket
    }

    async createTrackInBasket(values) {
        const basket = await ShopBasketsModel.create(values)
        return basket
    }

    async removeTrackFromBasket(user, shopId, trackId) {
        await ShopBasketsModel.destroy({where: {userId: user.id, shopId, trackId}})
    }

    async getTracksFromBasket(user, shopId) {

        console.log(user)
        console.log(shopId)

        const basket = await ShopBasketsModel.findAll({
            where: {
                shopId, userId: user.id
            },
            include: [{
                    model: ShopsModel, attributes: ['name']
                }, {
                model: TracksModel
            }]
        })
        for (const basketElement of basket) {
            basketElement.track.info = JSON.parse(basketElement.track.info)
        }

        return basket
    }
}

export default new CustomersShopService()