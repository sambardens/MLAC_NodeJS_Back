import customersLandingService from "../landing/customers-landing.service.js";

class CustomersLandingController {

    async addTrackToBasket(req, res, next) {
        try {
            const {landingPageId} = req.params
            const {trackIds} = req.body
            const {user} = req
            await customersLandingService.addTrackToBasket(user, landingPageId, trackIds)
            return res.json({success: true})
        } catch(e) {
            next(e)
        }
    }

    async removeTrackFromBasket(req, res, next) {
        try {
            const {landingPageId} = req.params
            const {trackId} = req.body
            const {user} = req
            await customersLandingService.removeTrackFromBasket(user, landingPageId, trackId)
            return res.json({success: true})
        } catch(e) {
            next(e)
        }
    }

    async getTracksFromBasket(req, res, next) {
        try {
            const {landingPageId} = req.params
            const {user} = req
            const tracks = await customersLandingService.getTracksFromBasket(user, landingPageId)
            return res.json({success: true, tracks})
        } catch(e) {
            next(e)
        }
    }
}

export default new CustomersLandingController()