import creditsService from "./credits.service.js";

class CreditsController {
    async addCredits(req, res, next) {
        try {
            const { trackId, creditIds, userId, name } = req.body;
            const credit = await creditsService.addCredits(trackId, creditIds, userId, name);
            return res.json({ success: true, credit });
        } catch (e) {
            next(e);
        }
    }

    async getCreditTypes(req, res, next) {
        try {
            const creditTypes = await creditsService.getCreditTypes();
            return res.json({ success: true, creditTypes });
        } catch (e) {
            next(e);
        }
    }

    async getCredits(req, res, next) {
        try {
            const { trackId } = req.params;
            const credits = await creditsService.getCredits(trackId);
            return res.json({ success: true, credits });
        } catch (e) {
            next(e);
        }
    }

    async removeCredits(req, res, next) {
        try {
            const { userId, trackId, creditTypeId } = req.query;
            await creditsService.removeCredits({ creditTypeId, userId, trackId });
            return res.json({ success: true });
        } catch (e) {
            next(e);
        }
    }
}

export default new CreditsController();
