import tracksService from "./tracks.service.js";

class TracksController {
    async uploadTrackToRelease(req, res, next) {
        try {
            const { releaseId } = req.params;
            const { track } = req.files;
            const { name, position, bapSpotifyId } = req.body;
            const { user } = req;
            const trackInfo = await tracksService.uploadTrackToRelease(user, releaseId, { name, track, position, bapSpotifyId });
            return res.json({ success: true, trackInfo });
        } catch (e) {
            next(e);
        }
    }

    async uploadTrackAndCreateRelease(req, res, next) {
        try {
            const { track } = req.files;
            const { name, position, bapSpotifyId, bapId } = req.body;
            const { user } = req;
            const trackInfo = await tracksService.uploadTrackAndCreateRelease(user, { name, track, position, bapSpotifyId, bapId });
            return res.json({ success: true, ...trackInfo });
        } catch (e) {
            next(e);
        }
    }

    async checkForCopyright(req, res, next) {
        try {
            const { uniqueName } = req.query;
            const data = await tracksService.checkForCopyright(uniqueName);
            return res.json({ success: true, data });
        } catch (e) {
            next(e);
        }
    }

    async convertToPreview(req, res, next) {
        try {
            const { uniqueName } = req.query;
            const preview = await tracksService.convertTrackToPreview(uniqueName);
            return res.json({ success: true, preview });
        } catch (e) {
            next(e);
        }
    }

    async getDataFromPlatformsByPreviewUrl(req, res, next) {
        try {
            const { previewUrl } = req.body;
            const { user } = req;
            const preview = await tracksService.getDataFromPlatformsByPreviewUrl(previewUrl, null, user.id);
            return res.json({ success: true, preview });
        } catch (e) {
            next(e);
        }
    }

    async editSettingsManyTracks(req, res, next) {
        try {
            const body = req.body; // {name, type, price, position}
            const tracks = await tracksService.editSettings(body);
            return res.json({ success: true, tracks });
        } catch (e) {
            next(e);
        }
    }

    async getTracks(req, res, next) {
        try {
            const { releaseId } = req.params;
            const tracks = await tracksService.getTracksByReleaseId(releaseId);
            return res.json({ success: true, tracks });
        } catch (e) {
            next(e);
        }
    }

    async removeTrackRelease(req, res, next) {
        try {
            const { releaseId } = req.params;
            const { trackId } = req.query;
            const { user } = req;
            await tracksService.removeTrackRelease(user, releaseId, trackId);
            return res.json({ success: true });
        } catch (e) {
            next(e);
        }
    }

    async addSplitTrack(req, res, next) {
        try {
            const { splitId } = req.params;
            const { trackIds } = req.body;
            await tracksService.addTracksToSplit(splitId, trackIds);
            return res.json({ success: true });
        } catch (e) {
            next(e);
        }
    }

    async getInfoAuddByTrack(req, res, next) {
        try {
            const track = req?.files?.track;
            const { uniqueName } = req.query;
            const release = await tracksService.getInfoAuddByTrack({ track, uniqueName });
            return res.json({ success: true, release });
        } catch (e) {
            next(e);
        }
    }
    async editSettings(req, res, next) {
        try {
            const {
                name,
                type,
                position,
                socialLinks,
                composers,
                duration,
                isrc,
                lyrics,
                appleMusicDiscNumber,
                spotifyId,
                spotifyPreviewUrl,
                timeCode,
                albumSpotifyId,
                explicit,
                spotifyLink,
                evearaPreviewDuration,
                evearaPreviewStartAt,
            } = req.body;
            const { uniqueName } = req.query;
            const tracks = await tracksService.editSettings({
                [uniqueName]: {
                    name,
                    type,
                    position,
                    socialLinks,
                    composers,
                    duration,
                    isrc,
                    lyrics,
                    appleMusicDiscNumber,
                    spotifyId,
                    spotifyPreviewUrl,
                    timeCode,
                    albumSpotifyId,
                    explicit,
                    spotifyLink,
                    evearaPreviewDuration,
                    evearaPreviewStartAt,
                },
            });
            return res.json({ success: true, tracks });
        } catch (e) {
            next(e);
        }
    }

    async listenTrack(req, res, next) {
        try {
            const { uniqueName } = req.params;
            const { user } = req;
            const trackPath = await tracksService.listenTrack(user, uniqueName);
            return res.sendFile(trackPath);
        } catch (e) {
            next(e);
        }
    }

    async downloadTrack(req, res, next) {
        try {
            const { trackId } = req.query;
            const { isFree } = req.body;
            const { user } = req;
            const pathToTrack = await tracksService.downloadTrack(user, trackId, isFree);
            return res.sendFile(pathToTrack);
        } catch (e) {
            next(e);
        }
    }

    async downloadTrackASAdmin(req, res, next) {
        try {
            const { trackId } = req.query;
            const pathToTrack = await tracksService.downloadTrackASAdmin(trackId);
            return res.sendFile(pathToTrack);
        } catch (e) {
            next(e);
        }
    }

    async deleteTrack(req, res, next) {
        try {
            const { trackId } = req.params;
            const pathToTrack = await tracksService.deleteTrack(trackId);
            return res.json({ success: true });
        } catch (e) {
            next(e);
        }
    }
}

export default new TracksController();
