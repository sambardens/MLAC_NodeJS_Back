import spotifyService from "./spotify.service.js";

class SpotifyController {
    async getBapsFromSpotify(req, res, next) {
        try {
            const { name } = req.query;
            const baps = await spotifyService.getBapsFromSpotify(name);
            return res.json({ success: true, baps });
        } catch (e) {
            next(e);
        }
    }

    async getTracksFromSpotify(req, res, next) {
        try {
            const { trackName, artistName } = req.query;
            const tracks = await spotifyService.getTracksFromSpotify(trackName, artistName);
            return res.json({ success: true, tracks });
        } catch (e) {
            next(e);
        }
    }

    async getReleasesFromSpotify(req, res, next) {
        try {
            const { name } = req.query;
            const releases = await spotifyService.getRelease(name);
            return res.json({ success: true, releases });
        } catch (e) {
            next(e);
        }
    }

    async getTracksFromReleaseSpotify(req, res, next) {
        try {
            const { releaseSpotifyId } = req.params;
            const tracks = await spotifyService.getTracksFromReleaseSpotify(releaseSpotifyId);
            return res.json({ success: true, tracks });
        } catch (e) {
            next(e);
        }
    }

    async getArtistAlbum(req, res, next) {
        try {
            const { id } = req.params;
            const artistAlbum = await spotifyService.getArtistAlbum(id);
            return res.json({ success: true, artistAlbum });
        } catch (e) {
            next(e);
        }
    }

    async getTrackAudioFeatures(req, res, next) {
        try {
            const { spotifyTrackId } = req.params;
            const trackAudioFeatures = await spotifyService.getTrackAudioFeatures(spotifyTrackId);
            return res.json({ success: true, trackAudioFeatures });
        } catch (e) {
            next(e);
        }
    }

    async getTrackBySpotifyTrackId(req, res, next) {
        try {
            const { trackSpotifyId } = req.params;
            const data = await spotifyService.getTrackBySpotifyTrackId(trackSpotifyId);
            return res.json({ success: true, data });
        } catch (e) {
            next(e);
        }
    }

    async getAlbumTracks(req, res, next) {
        try {
            const { id } = req.params;
            const artistAlbum = await spotifyService.getAlbumTracks(id);
            return res.json({ success: true, artistAlbum });
        } catch (e) {
            next(e);
        }
    }

    async getSpotifyTotalTracksAndAppleMusicData(req, res, next) {
        try {
            const { id } = req.params;
            const { withAppleMusic } = req.body;
            const data = await spotifyService.getSpotifyTotalTracksAndAppleMusicData(id, withAppleMusic);
            return res.json({ success: true, data });
        } catch (e) {
            next(e);
        }
    }
}

export default new SpotifyController();
