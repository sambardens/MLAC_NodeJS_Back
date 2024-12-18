import payoutService from "./payout.service.js";

class payoutController {
    async getPayoutBalance(req, res, next) {
        try {
            const { user } = req;
            const { uuidEveara } = req.params;
            const data = await payoutService.getPayoutBalance(user.id, uuidEveara);
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }

    async getPayoutHistory(req, res, next) {
        try {
            const { user } = req;
            const { uuidEveara } = req.params;
            const data = await payoutService.getPayoutHistory(user.id, uuidEveara);
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }

    async payout(req, res, next) {
        try {
            const { user } = req;
            const { uuidEveara } = req.params;
            const { participantId } = req.body;
            const data = await payoutService.payout(user.id, uuidEveara, participantId);
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }
}

export default new payoutController();
