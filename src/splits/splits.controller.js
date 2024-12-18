import splitsService from "./splits.service.js";

class SplitsController {
    async createSplits(req, res, next) {
        try {
            const { trackIds, onlyContract } = req.body;
            // const {ownership} = req.body
            const { releaseId } = req.params;
            const { user } = req;
            const result = await splitsService.createSplits(user, trackIds, releaseId, onlyContract);
            return res.json({ success: true, result });
        } catch (e) {
            next(e);
        }
    }

    async addWriterOwnership(req, res, next) {
        try {
            const { splitId } = req.params;
            const { ownership } = req.body;
            const { user } = req;
            const splitUsers = await splitsService.addWriterOwnership(splitId, ownership, user);
            return res.json({ success: true, splitUsers });
        } catch (e) {
            next(e);
        }
    }

    async createSplitRefference(req, res, next) {
        try {
            const { splitId } = req.params;
            const { split, contract } = await splitsService.createSplitRefference(splitId);
            return res.json({ success: true, split, contract });
        } catch (e) {
            next(e);
        }
    }

    // async getSplits(req, res, next) {
    //     try {
    //         const {releaseId} = req.params
    //         const splits = await splitsService.getAllSplits(releaseId)
    //         return res.json({success: true, splits})
    //     } catch(e) {
    //         next(e)
    //     }
    // }

    async getFullInfoSplit(req, res, next) {
        try {
            const { splitId } = req.params;
            const split = await splitsService.getFullInfoSplit(splitId);
            return res.json({ success: true, split });
        } catch (e) {
            next(e);
        }
    }

    async removeSplit(req, res, next) {
        try {
            const { splitId } = req.params;
            await splitsService.removeSplit(splitId);
            return res.json({ success: true });
        } catch (e) {
            next(e);
        }
    }
}

export default new SplitsController();
