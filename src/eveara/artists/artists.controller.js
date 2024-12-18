import artistsService from "./artists.service.js";

class ArtistsController {
    async getArtist(req, res, next) {
        try {
            const { uuidEveara, artistId } = req.query;
            const data = await artistsService.getArtist(uuidEveara, artistId);
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }

    async updateArtist(req, res, next) {
        try {
            const { body } = req;
            const { artistId } = req.params;
            const { user } = req;
            const data = await artistsService.updateArtist(user.id, artistId, body);
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }

    async addArtist(req, res, next) {
        try {
            const body = req.body;
            const { user } = req;
            const data = await artistsService.addArtist(user.id, body);
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }
}

export default new ArtistsController();
