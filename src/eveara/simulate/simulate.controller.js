import simulateService from "./simulate.service.js";

class SimulateController {
    async simulateDistribute(req, res, next) {
        try {
            const { user } = req;
            const { uuidEveara, releaseId } = req.body;
            const data = await simulateService.simulateDistribute(user.id, uuidEveara, releaseId);
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }

    async simulateTakedown(req, res, next) {
        try {
            const { user } = req;
            const { uuidEveara, releaseId } = req.body;
            const data = await simulateService.simulateTakedown(user.id, uuidEveara, releaseId);
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }
}

export default new SimulateController();
