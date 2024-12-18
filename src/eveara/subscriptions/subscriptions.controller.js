import subscriptionsService from "./subscriptions.service.js";

class SubscriptionsController {
    async getPartnerSubscriptions(req, res, next) {
        try {
            const { user } = req;
            const { subscriptionId } = req.query;
            const data = await subscriptionsService.getPartnerSubscriptions(user.id, subscriptionId);
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }

    async getUserSubscriptions(req, res, next) {
        try {
            const { user } = req;
            const { subscriptionId, uuidEveara } = req.query;
            const data = await subscriptionsService.getUserSubscriptions(user.id, subscriptionId, uuidEveara);
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }

    async addUserSubscription(req, res, next) {
        try {
            const { user } = req;
            const { subscriptions } = req.body;
            const data = await subscriptionsService.addUserSubscription(user.id, subscriptions);
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }
}

export default new SubscriptionsController();
