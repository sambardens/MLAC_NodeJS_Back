import reportsService from "./reports.service.js";

class reportsController {
    async streamReport(req, res, next) {
        try {
            const { user } = req;
            const { uuidEveara, reportType } = req.query;
            const data = await reportsService.streamReport(user.id, uuidEveara, reportType);
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }

    async salesReport(req, res, next) {
        try {
            const { user } = req;
            const { uuidEveara, reportType } = req.query;
            const data = await reportsService.salesReport(user.id, uuidEveara, reportType);
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }

    async downloadReport(req, res, next) {
        try {
            const { user } = req;
            const { uuidEveara, reportType } = req.query;
            const data = await reportsService.downloadReport(user.id, uuidEveara, reportType);
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }

    async getSummary(req, res, next) {
        try {
            const { user } = req;
            const { uuidEveara } = req.params;
            const data = await reportsService.getSummary(user.id, uuidEveara);
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }
}

export default new reportsController();
