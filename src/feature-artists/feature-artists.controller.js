import featureArtistsService from "./feature-artists.service.js";

class featureArtistsController {
    async addFeatureArtist(req, res, next) {
        try {
            const { trackId } = req.params;
            const { name, spotifyId, avatar, soundCloudId, appleMusicId, country } = req.body;
            const { user } = req;
            const featureArtist = await featureArtistsService.addFeatureArtist(user, trackId, name, spotifyId, avatar, soundCloudId, appleMusicId, country);
            return res.json({ success: true, featureArtist });
        } catch (e) {
            next(e);
        }
    }

    async editFeatureArtist(req, res, next) {
        try {
            const { artistId } = req.query;
            const { user } = req;
            const { soundCloudId, appleMusicId, country } = req.body;
            const featureArtist = await featureArtistsService.editFeatureArtist(user, artistId, soundCloudId, appleMusicId, country);
            return res.json({ success: true, featureArtist });
        } catch (e) {
            next(e);
        }
    }

    async removeFeatureArtistFromTrack(req, res, next) {
        try {
            const { trackId, artistId } = req.query;
            const { user } = req;
            await featureArtistsService.removeFeatureArtistFromTrack(user, trackId, artistId);
            return res.json({ success: true });
        } catch (e) {
            next(e);
        }
    }
}

export default new featureArtistsController();
