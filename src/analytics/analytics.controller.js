import analyticsService from "./analytics.service.js";

class AnalyticsController {
    async getAnalytics(req, res, next) {
        try {
            const { trackId, releaseId, bapId, date } = req.query;
            const user = req.user;
            const analytics = await analyticsService.getAnalytics({ trackId, releaseId, bapId, date }, user);
            return res.json({ success: true, analytics });
        } catch (e) {
            return next(e);
        }
    }

    async getAnalyticsFromGoogle(req, res, next) {
        try {
            const { date, type, bapId } = req.query;
            const user = req.user;
            const analytics = await analyticsService.getAnalyticsFromGoogle(date, type, user, bapId);
            return res.json({ success: true, analytics });
        } catch (e) {
            return next(e);
        }
    }
}

export default new AnalyticsController();
