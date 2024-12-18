import evearaTracksService from "./eveara-tracks.service.js";

class EvearaTracksController {
    async addTracks(req, res, next) {
        try {
            const { releaseId } = req.body;
            const { user } = req;
            const tracks = await evearaTracksService.addTracks(user.id, releaseId);
            return res.json({ success: true, tracks });
        } catch (e) {
            next(e);
        }
    }

    async updateTrack(req, res, next) {
        try {
            const { trackId } = req.params;
            const body = req.body;
            const data = await evearaTracksService.updateTrack(trackId, body);
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }

    async getTrack(req, res, next) {
        try {
            const { trackId, uuidEveara } = req.query;
            const data = await evearaTracksService.getTrack(trackId, uuidEveara);
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }

    async removeTrack(req, res, next) {
        try {
            const { trackId } = req.params;
            const { uuidEveara } = req.query;
            const data = await evearaTracksService.removeTrack(trackId, uuidEveara);
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }
}

export default new EvearaTracksController();
