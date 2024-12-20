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

async uploadTrackAndCreateRelease(user, data) {
    const isMember = await bapsService.checkOnMemberBap(user.id, data.bapId);

    if (isMember !== true) throw ApiError.forbidden("You dont have access to this B.A.P.");
    if (!this.isTrack(data.track.name)) throw ApiError.badRequest("Only .mp3, .wav or .flac formats are supported");

    const track = await this.saveTrackInDirectory(data.track, user.id);
    data.track = track.convertFile;
    data.originalName = track.uniqueName;
    const cutAudio = await this.cutAudio(data.track, user.id);
    const checkAccessForSpotify = await this.checkAccessForSpotify(cutAudio, data.bapSpotifyId, { mp3Format: data.track, originalFormat: data.originalName, cut: cutAudio }, user.id);

    if (!checkAccessForSpotify?.result) throw ApiError.badRequest("This track is not exist in Spotify");

    const spotifyCopyright = await spotifyService.getSpotifyTotalTracksAndAppleMusicData(checkAccessForSpotify?.result?.spotify?.album?.id, true);

    const release = await releaseService.createRelease(user, data.bapId, {
        name: checkAccessForSpotify?.result?.album?.spotify?.name || checkAccessForSpotify?.result?.album,
        urlLogo: spotifyCopyright?.appleMusicData?.artwork?.url.replace("{w}x{h}", `${spotifyCopyright?.appleMusicData?.artwork?.width}x${spotifyCopyright?.appleMusicData?.artwork?.height}`),
        releaseSpotifyId: checkAccessForSpotify?.result?.spotify?.album?.id,
        releaseDate: checkAccessForSpotify?.result?.spotify?.album?.release_date,
        label: spotifyCopyright?.label,
        spotifyUri: checkAccessForSpotify?.result?.spotify?.album?.uri,
        totalTracks: spotifyCopyright?.totalTracks,
        upc: spotifyCopyright?.upc,
        copyrights: spotifyCopyright?.copyrights,
        isReleaseByOriginalAudio: true,
    });

    const preview = await this.convertTrackToPreview(cutAudio, user.id);
    const auddData = await this.getDataFromPlatformsByPreviewUrl(checkAccessForSpotify?.result?.spotify?.preview_url, ["apple_music", "spotify"], user.id);

    const { dataValues } = await TracksModel.create({
        releaseId: release.id,
        bapId: release.dataValues.bapId,
        ...data,
        uniqueName: data.track,
        info: JSON.stringify({ ...checkAccessForSpotify, preview, auddData }),
        name: checkAccessForSpotify?.result?.spotify?.name || data.name,
        position: data.position ? data.position : checkAccessForSpotify?.result?.spotify?.track_number || 1,
        socialLinks: checkAccessForSpotify?.result?.song_link,
        composers: checkAccessForSpotify?.result?.apple_music?.composerName
            ? checkAccessForSpotify?.result?.apple_music?.composerName.replace(" &", ",")
            : checkAccessForSpotify?.result?.spotify?.composerName,
        duration: checkAccessForSpotify?.result?.apple_music?.durationInMillis || checkAccessForSpotify?.result?.spotify?.duration_ms,
        discNumber: checkAccessForSpotify?.result?.apple_music?.discNumber || checkAccessForSpotify?.result?.spotify?.disc_number,
        isrc: checkAccessForSpotify?.result?.spotify?.external_ids?.isrc || checkAccessForSpotify?.result?.apple_music?.isrc,
        spotifyId: checkAccessForSpotify?.result?.spotify?.id,
        spotifyPreviewUrl: checkAccessForSpotify?.result?.spotify?.preview_url,
        timeCode: checkAccessForSpotify?.result?.timecode,
        albumSpotifyId: checkAccessForSpotify?.result?.spotify?.album?.id,
        explicit: checkAccessForSpotify?.result?.spotify?.explicit,
        spotifyLink: checkAccessForSpotify?.result?.spotify?.external_urls?.spotify,
    });

    await this.editMetaData(dataValues);
    await analyticsService.createAnalytics(dataValues.id, release.id);

    dataValues.bapId = +dataValues.bapId;

    return {
        trackInfo: { ...dataValues, info: { ...checkAccessForSpotify, preview: cutAudio, full: data.track, auddData } },
        releaseInfo: {
            ...release.dataValues,
            additionalInfo: {
                albumType: checkAccessForSpotify?.result?.spotify?.album?.album_type,
                albumGenres: checkAccessForSpotify?.result?.apple_music?.genreNames,
            },
        },
    };
}
