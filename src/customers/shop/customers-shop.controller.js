import customersShopService from "./customers-shop.service.js";

class CustomersShopController {

    async addTrackToBasket(req, res, next) {
        try {
            const {shopId} = req.params
            const {trackIds} = req.body
            const {user} = req
            await customersShopService.addTrackToBasket(user, shopId, trackIds)
            return res.json({success: true})
        } catch(e) {
            next(e)
        }
    }

    async removeTrackFromBasket(req, res, next) {
        try {
            const {shopId} = req.params
            const {trackId} = req.body
            const {user} = req
            await customersShopService.removeTrackFromBasket(user, shopId, trackId)
            return res.json({success: true})
        } catch(e) {
            next(e)
        }
    }

    async getTracksFromBasket(req, res, next) {
        try {
            const {shopId} = req.params
            const {user} = req
            const basket = await customersShopService.getTracksFromBasket(user, shopId)
            return res.json({success: true, basket})
        } catch(e) {
            next(e)
        }
    }
}

export default new CustomersShopController()