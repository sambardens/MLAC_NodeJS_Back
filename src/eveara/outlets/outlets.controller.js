import outletsService from "./outlets.service.js";

class OutletsController {
    async getOutlets(req, res, next) {
        try {
            const { user } = req;
            const { uuidEveara } = req.query;
            const data = await outletsService.getOutlets(user.id, uuidEveara);
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }

    async distribute(req, res, next) {
        try {
            const { user } = req;
            const { releaseId } = req.params;
            const body = req.body;
            const data = await outletsService.distribute(user.id, releaseId, body);
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }

    async getOutletsDetailsByAlbum(req, res, next) {
        try {
            const { user } = req;
            const { releaseId } = req.params;
            const { uuidEveara } = req.query;
            const data = await outletsService.getOutletsDetailsByAlbum(user.id, releaseId, uuidEveara);
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }
}



export default new OutletsController();
