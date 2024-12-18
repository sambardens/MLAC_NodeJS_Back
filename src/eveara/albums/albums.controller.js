import albumsService from "./albums.service.js";

class AlbumsController {
    async addAlbum(req, res, next) {
        try {
            const { user } = req;
            const body = req.body;
            const data = await albumsService.addAlbum(user.id, body);
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }

    async updateAlbum(req, res, next) {
        try {
            const { user } = req;
            const { releaseId } = req.params;
            const body = req.body;
            const data = await albumsService.updateAlbum(user.id, releaseId, body);
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }

    async validateAlbum(req, res, next) {
        try {
            const { releaseId } = req.params;
            const { uuidEveara } = req.query;
            const data = await albumsService.validateAlbum(releaseId, uuidEveara);
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }

    async getAlbum(req, res, next) {
        try {
            const { user } = req;
            const { uuidEveara } = req.query;
            const data = await albumsService.getAlbum(user.id, uuidEveara);
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }
}

export default new AlbumsController();
