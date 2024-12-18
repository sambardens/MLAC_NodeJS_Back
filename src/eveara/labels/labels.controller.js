import labelsService from "./labels.service.js";

class LabelsController {
    async getLabel(req, res, next) {
        try {
            const { user } = req;
            const { labelId, uuidEveara } = req.query;
            const data = await labelsService.getLabel(user.id, labelId, uuidEveara);
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }

    async addLabel(req, res, next) {
        try {
            const { user } = req;
            const { releaseId, name } = req.body;
            const data = await labelsService.addLabel(user.id, releaseId, name);
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }
}

export default new LabelsController();
