import fs from "fs";
import path from "path";
import { ApiError } from "../errors/errors.api.js";
import { TracksModel } from "./tracks.model.js";
import releaseService from "../release/release.service.js";
import tokensService from "../tokens/tokens.service.js";
import FormData from "form-data";
import axios from "axios";
import dotenv from "dotenv";
import scheme from "../../database/scheme.js";
import { QueryTypes } from "sequelize";
import { SplitTracksModel } from "../splits/split-tracks.model.js";
import contractsService from "../contracts/contracts.service.js";
import splitsService from "../splits/splits.service.js";
import creditsService from "../credits/credits.service.js";
import featureArtistsService from "../feature-artists/feature-artists.service.js";
import IncomesService from "../incomes/incomes.service.js";
import landingService from "../landing/landing.service.js";
import analyticsService from "../analytics/analytics.service.js";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import NodeID3 from "node-id3";
import { ReleaseModel } from "../release/release.model.js";
import { GenresMainModel } from "../genres/genres.model.js";
import { BapsModel } from "../baps/baps.model.js";
import bapsService from "../baps/baps.service.js";
import spotifyService from "../spotify/spotify.service.js";
import np from "number-precision";
import { UsersModel } from "../users/users.model.js";
import { CreditsModel } from "../credits/credits.model.js";
import { SplitsModel } from "../splits/splits.model.js";
import { featureArtistsModel } from "../feature-artists/feature-artists.model.js";

ffmpeg.setFfmpegPath(ffmpegPath);

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

class TracksService {
    async getTrackWithOptions(where, options) {
        const track = await TracksModel.findOne({ where, ...options });
        return track;
    }

    async saveTrackInDirectory(track, userId) {
        if (!fs.existsSync(path.resolve("tracks"))) fs.mkdirSync(path.resolve("tracks"));
        const isMp3Format = track["name"].endsWith(".mp3");
        const isWavFormat = track["name"].endsWith(".wav");
        let uniqueName = tokensService.generateUniqueLink();
        let convertFile = undefined;
        uniqueName += isMp3Format ? ".mp3" : isWavFormat ? ".wav" : ".flac";
        const originalFilePath = path.resolve("tracks", uniqueName);
        let convertedFilePath = undefined;

        await track.mv(originalFilePath);

        let convertedFile;
        if (!uniqueName.endsWith(".mp3")) {
            convertFile = uniqueName.endsWith(".wav") ? uniqueName.replace(".wav", ".mp3") : uniqueName.replace(".flac", ".mp3");
            convertedFilePath = path.resolve("tracks", convertFile);

            await new Promise((resolve, reject) => {
                ffmpeg(originalFilePath)
                    .on("end", async () => {
                        console.log("Converted ended");
                        resolve();
                    })
                    .on("error", (err) => {
                        console.error("Houston, we have a problem:", err.message);
                        reject(err);
                    })
                    .save(convertedFilePath);
            });
            convertedFile = fs.statSync(convertedFilePath);
        }
        const mb = 1048576;
        const user = await UsersModel.findOne({ where: { id: userId } });
        if (convertFile) {
            user.totalWeightTracks += np.plus(np.divide(track.size, mb), np.divide(convertedFile.size, mb));
        } else {
            user.totalWeightTracks += np.divide(track.size, mb);
        }
        await user.save();

        return { convertFile: convertFile || uniqueName, uniqueName };
    }

    async editMetaData(track) {
        const tagsForTracks = await this.getTrackWithOptions(
            { id: track.id },
            {
                include: [
                    {
                        model: ReleaseModel,
                        as: "release",
                        include: {
                            model: GenresMainModel,
                            as: "mainGenere",
                            required: false,
                        },
                    },
                    {
                        model: BapsModel,
                    },
                ],
                raw: true,
            }
        );
        const originalFilePath = tagsForTracks["release.thumbnail"] ? path.resolve("images", tagsForTracks["release.thumbnail"]) : null;
        const tags = {
            title: tagsForTracks.name,
            artist: tagsForTracks["bap.name"],
            album: tagsForTracks["release.name"],
            genre: tagsForTracks["release.mainGenere.name"],
            APIC: originalFilePath,
        };
        const pathToTrack = path.resolve("tracks", track.uniqueName);
        const success = NodeID3.update(tags, pathToTrack);

        if (success) {
            console.log("ID3 tags updated successfully");
        } else {
            console.log("Failed to update ID3 tags");
        }
    }

    async removeTrackFromDirectory(track, userId) {
        const pathToTrack = path.resolve("tracks", track);
        function getFileSize() {
            const stats = fs.statSync(pathToTrack);
            return stats.size;
        }
        if (fs.existsSync(pathToTrack)) {
            const convertedFileSize = getFileSize();
            const mb = 1048576;
            await new Promise(async (resolve) => {
                const user = await UsersModel.findOne({ where: { id: userId } });
                user.totalWeightTracks -= np.divide(convertedFileSize, mb);
                await user.save();
                resolve();
            });
            fs.unlinkSync(pathToTrack);
        }
    }

    async removeTrackFromDb(trackId) {
        await featureArtistsModel.destroy({
            where: {
                trackId,
            },
        });
        const track = await TracksModel.destroy({ where: { id: trackId } });
        return track;
    }

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

        // await this.checkRelease(checkAccessForSpotify?.result?.spotify?.id, data.bapId);

        const spotifyCopyright = await spotifyService.getSpotifyTotalTracksAndAppleMusicData(checkAccessForSpotify?.result?.spotify?.album?.id, true);

        // if (!spotifyCopyright.totalTracks) throw ApiError.badRequest('You can\'t create a release by upload this track. Try to upload another track');

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
        const { dataValues } = await TracksModel.create({
            releaseId: release.id,
            bapId: release.dataValues.bapId,
            ...data,
            uniqueName: data.track,
            info: JSON.stringify({ ...checkAccessForSpotify, preview }),
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
            trackInfo: { ...dataValues, info: { ...checkAccessForSpotify, preview: cutAudio, full: data.track } },
            releaseInfo: {
                ...release.dataValues,
                additionalInfo: {
                    albumType: checkAccessForSpotify?.result?.spotify?.album?.album_type,
                    albumGenres: checkAccessForSpotify?.result?.apple_music?.genreNames,
                },
            },
        };
    }

    async uploadTrackToRelease(user, releaseId, data) {
        const release = await releaseService.getRelease({ id: releaseId });

        if (!release) throw ApiError.badRequest("This release don't exist");

        const isMember = await bapsService.checkOnMemberBap(user.id, release.bapId);

        if (isMember !== true) throw ApiError.forbidden("You dont have access to this release");

        if (!this.isTrack(data.track.name)) throw ApiError.badRequest("Only .mp3, .wav or .flac formats are supported");

        const track = await this.saveTrackInDirectory(data.track, user.id);
        data.track = track.convertFile;
        data.originalName = track.uniqueName;

        const cutAudio = await this.cutAudio(data.track, user.id);

        const checkAccessForSpotify = await this.checkAccessForSpotify(cutAudio, data.bapSpotifyId, { mp3Format: data.track, originalFormat: data.originalName, cut: `cut_${data.track}` }, user.id);

        const preview = await this.convertTrackToPreview(cutAudio, user.id);
        const { dataValues } = await TracksModel.create({
            releaseId,
            bapId: release.dataValues.bapId,
            ...data,
            uniqueName: data.track,
            info: JSON.stringify({ ...checkAccessForSpotify, preview }),
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
        await analyticsService.createAnalytics(dataValues.id, releaseId);

        dataValues.releaseId = +dataValues.releaseId;

        return { ...dataValues, info: { ...checkAccessForSpotify, preview: cutAudio, full: data.track } };
    }

    async cutAudio(uniqueName, userId) {
        const inputFilePath = `tracks/${uniqueName}`;
        const startTime = "00:00:00";
        const duration = 10;
        const outputFilePath = `tracks/cut_${uniqueName}`;
        let convertedFileSize = 0;

        function getFileSize(filePath) {
            const stats = fs.statSync(filePath);
            return stats.size;
        }
        const cutAudio = await new Promise((resolve, reject) => {
            ffmpeg()
                .input(inputFilePath)
                .setStartTime(startTime)
                .duration(duration)
                .output(outputFilePath)
                .on("end", async () => {
                    console.log("Обрізка завершена!");
                    resolve(`cut_${uniqueName}`);
                })
                .on("error", (err) => {
                    console.error("Сталася помилка при обрізці:", err.message);
                    reject(err);
                })
                .run();
        });
        convertedFileSize = getFileSize(outputFilePath);

        const mb = 1048576;
        const user = await UsersModel.findOne({ where: { id: userId } });
        user.totalWeightTracks += np.divide(convertedFileSize, mb);
        user.save();

        return cutAudio;
    }

    async checkRelease(albumId, bapId) {
        const release = await releaseService.getRelease({ releaseSpotifyId: albumId });

        if (release && release.bapId === bapId) throw ApiError.badRequest(`You have already same release ${release.name} at this B.A.P.`);
        if (release) throw ApiError.badRequest(`Release ${release.name} has created by another B.A.P.`);

        return true;
    }

    async checkSpotifyTracks(releaseId, trackAlbumSpotifyId, track) {
        const release = await releaseService.getRelease({ id: releaseId });

        if (release.releaseSpotifyId && release.releaseSpotifyId !== trackAlbumSpotifyId) {
            for (const key in track) {
                await this.removeTrackFromDirectory(track[key]);
            }

            throw ApiError.badRequest("This track is not from current release");
        }

        return true;
    }

    async checkAccessForSpotify(cutAudio, bapSpotifyId, track, userId) {
        const auddCheck = await this.getDataFromPlatformsByPreviewUrl(`https://mlacnodejsback-production.up.railway.app/api/tracks/listen/mp3/${cutAudio}`, ["apple_music", "spotify"], userId);
        const artistSpotifyIds = auddCheck.result?.spotify?.album?.artists?.map((artist) => artist.id);

        if (bapSpotifyId) {
            if (!artistSpotifyIds || artistSpotifyIds?.length === 0 || artistSpotifyIds.find((artistId) => artistId === bapSpotifyId)) {
                return auddCheck;
            } else {
                for (const key in track) {
                    await this.removeTrackFromDirectory(track[key], userId);
                }
                throw ApiError.forbidden("This track is copyright by another artist");
            }
        } else {
            if (artistSpotifyIds?.length > 0) {
                for (const key in track) {
                    await this.removeTrackFromDirectory(track[key], userId);
                }
                throw ApiError.forbidden("This track is copyright by another artist");
            }
        }
        
        return auddCheck;
    }

    async checkExistTrackInReleaseBySpotifeId(releaseId, spotifyId, track) {
        let existTrack = undefined;

        if (spotifyId) existTrack = await TracksModel.findOne({ where: { spotifyId } });

        if (existTrack && existTrack.releaseId !== +releaseId) {
            for (const key in track) {
                await this.removeTrackFromDirectory(track[key]);
            }
            throw ApiError.badRequest(`The track (${track.name}) has already added for another release`);
        }
        return true;
    }

    async checkForCopyright(uniqueName) {
        const formData = new FormData();
        formData.append("file", fs.createReadStream(path.resolve("tracks", uniqueName)));
        let { data } = await axios.post("https://api.audd.io/", formData, {
            params: {
                api_token: process.env.API_AUDD_TOKEN,
                method: "recognize",
                return: "timecode",
            },
        });

        if (data.status === "error") {
            data = {
                status: "error",
                errorCode: data.error.error_code,
                errorMessage: data.error.error_message,
            };
        }

        if (data.status === "success") {
            data.status = "unsuccess";
        }
        if (data.result === null) {
            data.status = "success";
        }

        return data;
    }

    async convertTrackToPreview(uniqueName, userId) {
        const musicalPlatforms = ["spotify", "deezer", "napster"];

        const formData = new FormData();
        const pathToFile = fs.createReadStream(path.resolve("tracks", uniqueName));
        formData.append("file", pathToFile);

        const user = await UsersModel.findOne({ where: { id: userId } });
        user.totalAuddRequests += 1;
        user.save();

        let { data } = await axios.post("https://api.audd.io/", formData, {
            params: {
                api_token: process.env.API_AUDD_TOKEN,
                return: musicalPlatforms.join(","),
                length: 10,
                format: "wav",
            },
        });

        const preview = this.getPreviewTrack(data, musicalPlatforms);
        return preview;
    }

    async getDataFromPlatformsByPreviewUrl(previewUrl, musicalPlatforms, userId) {
        musicalPlatforms = musicalPlatforms ? musicalPlatforms : ["musicbrainz", "apple_music", "spotify", "deezer", "napster", "spotify"];

        const formData = new FormData();
        formData.append("api_token", process.env.API_AUDD_TOKEN);
        formData.append("url", previewUrl);
        formData.append("return", musicalPlatforms.join(","));

        try {
            const { data } = await axios.post("https://api.audd.io/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Audd API Response:", data); // Log the full response
            return data;
        } catch (error) {
            console.error("Audd API Error:", error.response ? error.response.data : error.message);
            throw error;
        }

    async editSettings(data) {
        for (const uniqueName in data) {
            const isValidObject = this.isAllowedObjectKeys(data[uniqueName], [
                "name",
                "type",
                "price",
                "position",
                "socialLinks",
                "composers",
                "duration",
                "isrc",
                "lyrics",
                "appleMusicDiscNumber",
                "spotifyId",
                "spotifyPreviewUrl",
                "timeCode",
                "albumSpotifyId",
                "explicit",
                "spotifyLink",
                "evearaPreviewDuration",
                "evearaPreviewStartAt",
            ]);

            if (!isValidObject) throw ApiError.badRequest("You have entered an invalid key for editing tracks");

            const track = await this.getTrack({ uniqueName });

            if (!track) throw ApiError.badRequest("This track don't find");
            if (data[uniqueName].timeCode && !/^([0-5]?\d):([0-5]?\d)$/.test(data[uniqueName].timeCode)) throw ApiError.badRequest("Invalid format for Time Code");

            for (const datumKey in data[uniqueName]) {
                if (datumKey === "type" || datumKey === "socialLinks" || datumKey === "composers" || datumKey === "spotifyPreviewUrl" || datumKey === "timeCode") {
                    if (data[uniqueName][datumKey] === "" || data[uniqueName][datumKey] === null) {
                        track[datumKey] = null;
                    } else {
                        track[datumKey] = data[uniqueName][datumKey];
                    }
                } else {
                    if (data[uniqueName][datumKey]) track[datumKey] = data[uniqueName][datumKey];
                }
            }

            await track.save();
        }
    }

    isTrack(trackName) {
        return trackName.toLowerCase().endsWith(".mp3") || trackName.toLowerCase().endsWith(".wav") || trackName.toLowerCase().endsWith(".flac");
    }

    async getTrack(options) {
        const track = await TracksModel.findOne({ where: options });
        return track;
    }

    async getTracks(options) {
        const tracks = await TracksModel.findAll(options);
        return tracks;
    }

    async getTrackSumPrice(options) {
        const priceSum = await TracksModel.sum("price", options);
        return priceSum;
    }

    isAllowedObjectKeys(object, validKeys = []) {
        for (const objectKey in object) {
            if (!validKeys.includes(objectKey)) return false;
        }
        return true;
    }

    async getTracksByReleaseId(releaseId) {
        const tracks = await TracksModel.findAll({
            where: { releaseId },
            order: [
                ["position", "ASC"],
                ["id", "DESC"],
            ],
        });

        for (const track of tracks) {
            const featureArtist = await featureArtistsService.getFeatureArtists({ trackId: track.id });
            track.dataValues["featureArtists"] = featureArtist;
            track.info = JSON.parse(track?.info);
            track.dataValues["trackFull"] = track.dataValues["uniqueName"];
            track.dataValues["trackPreview"] = "cut_" + track.dataValues["uniqueName"];
        }

        return tracks;
    }

    async getTracksFromSplit(splitId, isSearchByReleaseId) {
        let tracks = [];
        if (!isSearchByReleaseId) {
            tracks = await scheme.query(
                `
                SELECT tracks.id as trackId,releaseId, splitId, uniqueName, name, type,
                    (
                        SELECT 
                            JSON_ARRAYAGG(
                                JSON_OBJECT(
                                    'id', feature_artists.id,
                                    'name', feature_artists.name,
                                    'avatar', feature_artists.avatar,
                                    'spotifyId', feature_artists.spotifyId,
                                    'onMajorLabl', feature_artists.onMajorLabl,
                                    'avatarMin', feature_artists.avatarMin,
                                    'trackId', feature_artists.trackId,
                                    'country', feature_artists.country,
                                    'appleMusicId', feature_artists.appleMusicId,
                                    'soundCloudId', feature_artists.soundCloudId
                                )
                            )
                        FROM feature_artists
                        WHERE tracks.id = feature_artists.trackId
                    ) AS featureArtists
                FROM split_tracks
                LEFT JOIN tracks ON split_tracks.trackId = tracks.id
                WHERE split_tracks.splitId = ${splitId}
            `,
                {
                    raw: true,
                    type: QueryTypes.SELECT,
                }
            );
        } else {
            tracks = await scheme.query(
                `
                SELECT tracks.id as trackId, releaseId, splitId, uniqueName, tracks.name, type, evearaTrackId, evearaPreviewStartAt, evearaPreviewDuration,
                (
                    SELECT 
                        JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'id', feature_artists.id,
                                'name', feature_artists.name,
                                'avatar', feature_artists.avatar,
                                'spotifyId', feature_artists.spotifyId,
                                'onMajorLabl', feature_artists.onMajorLabl,
                                'avatarMin', feature_artists.avatarMin,
                                'trackId', feature_artists.trackId,
                                'country', feature_artists.country,
                                'appleMusicId', feature_artists.appleMusicId,
                                'soundCloudId', feature_artists.soundCloudId
                            )
                        )
                    FROM feature_artists
                    WHERE tracks.id = feature_artists.trackId
                ) AS featureArtists,
                (
                    SELECT 
                        JSON_ARRAYAGG(
                            CASE 
                                WHEN credits.userId IS NOT NULL 
                                    THEN JSON_OBJECT(
                                        'userId', users.id, 
                                        'firstName', users.firstName, 
                                        'lastName', users.lastName, 
                                        'email', users.email, 
                                        'creditIds', JSON_EXTRACT(credits.creditIds, '$[*]')
                                    )
                                ELSE JSON_OBJECT(
                                    'name', credits.name,
                                    'creditIds', JSON_EXTRACT(credits.creditIds, '$[*]')
                                )
                            END
                        )
                    FROM credits 
                    LEFT JOIN users ON credits.userId = users.id
                    WHERE split_tracks.trackId = credits.trackId
                ) AS credits
                FROM split_tracks
                LEFT JOIN tracks ON split_tracks.trackId = tracks.id
                LEFT JOIN feature_artists ON tracks.id = feature_artists.trackId
                LEFT JOIN credits ON split_tracks.trackId = credits.trackId
                WHERE split_tracks.splitId = ${splitId}
                GROUP BY tracks.id;
                `,
                {
                    raw: true,
                    type: QueryTypes.SELECT,
                }
            );
        }

        return tracks;
    }

    async removeTrackRelease(user, releaseId, trackId) {
        const release = await releaseService.getRelease({ id: releaseId });
        if (!release) throw ApiError.badRequest("This release doesn't exist");
        const track = await this.getTrack({ id: trackId });
        if (!track) throw ApiError.badRequest("This track doesn't exist");
        await this.removeTrackFromDb(trackId);

        const trackPath = {
            uniqueName: track.uniqueName,
            originalName: track.originalName,
            cutTrackName: `cut_${track.uniqueName}`,
        };

        for (const key in trackPath) {
            await this.removeTrackFromDirectory(trackPath[key], user.id);
        }
    }

    async getPreviewTrack(dataTrack, musicalPlatforms) {
        for (const musicalPlatform of musicalPlatforms) {
            if (dataTrack.result?.[musicalPlatform]) {
                const key = Object.keys(dataTrack.result[musicalPlatform]).filter((item) => item.startsWith("preview"));

                if (dataTrack.result[musicalPlatform][key].length > 0) return dataTrack.result[musicalPlatform][key];
            }
        }
    }

    async addTracksToSplit(splitId, trackIds) {
        const tracksSplit = await this.getTracksFromSplit(splitId);
        let isNewTrack = !(tracksSplit.length === trackIds.length);

        for (const trackId of trackIds) {
            if (!tracksSplit.filter((item) => item.trackId === trackId).length > 0) {
                await SplitTracksModel.create({ splitId, trackId });
                isNewTrack = true;
            }
        }

        const junkData = tracksSplit.filter((item) => trackIds.every((number) => item.trackId !== number));
        for (const junkDatum of junkData) {
            await this.removeSplitTrack(junkDatum.trackId, splitId);
            // await creditsService.removeCredits({ trackId: junkDatum.trackId });
        }

        const contract = await contractsService.getContractDb({ splitId });
        if (contract && isNewTrack) {
            await contractsService.removeAllSignaturesFromDirectory(contract.id);
            await splitsService.updateSplitUser({ signature: null, reviewed: false }, { splitId });
        }

        const splitTracks = await this.getTracksFromSplit(splitId);

        return splitTracks;
    }

    async removeSplitTrack(trackId, splitId) {
        const track = await SplitTracksModel.destroy({ where: { trackId, splitId } });
        return track;
    }

    getPathMp3ListeningTrack(uniqueName) {
        if (!fs.existsSync(path.resolve("tracks", uniqueName))) return false;

        return path.resolve("tracks", uniqueName);
    }

    async listenTrack(user, uniqueName) {
        let trackPath = this.getPathMp3ListeningTrack(uniqueName);
        // if (!trackPath)
        // this.convertTrackToMp3(uniqueName)

        trackPath = this.getPathMp3ListeningTrack(uniqueName);
        // if (!trackPath)
        //     throw ApiError.badRequest('The track doesn\'t exist')
        //
        // const track = await this.getTrack({uniqueName})
        // const isBuy = await incomesService.getIncome({trackId: track.id, userId: user.id})
        // if (!isBuy)
        //     throw ApiError.forbidden('Forbidden')

        return trackPath;
    }

    async getInfoAuddByTrack(bodyData) {
        if (!bodyData.track && !bodyData.uniqueName) throw ApiError.badRequest("Track or uniqueName not specified");

        const musicalPlatforms = ["spotify", "deezer", "apple_music"];

        const formData = new FormData();

        if (bodyData.track) {
            const track = await this.saveTrackInDirectory(bodyData.track);
            const cutAudio = await this.cutAudio(track.uniqueName);
            formData.append("file", fs.createReadStream(path.resolve("tracks", cutAudio)));
        } else if (bodyData.uniqueName) {
            formData.append("file", fs.createReadStream(path.resolve("tracks", `cut_${bodyData.uniqueName}`)));
        }

        const { data } = await axios.post("https://api.audd.io/", formData, {
            params: {
                api_token: process.env.API_AUDD_TOKEN,
                return: musicalPlatforms.join(","),
            },
        });

        delete data?.result?.deezer?.available_countries;
        delete data?.result?.spotify?.available_markets;
        delete data?.result?.spotify?.album.available_markets;

        data.position = bodyData.position ? bodyData.position : data?.result?.spotify?.track_number || 1;

        return data;
    }

    async downloadTrack(user, trackId, isFree) {
        if (!trackId) throw ApiError.badRequest("Track id is required");

        const isBuyTrack = await IncomesService.getIncome(trackId, user.id);
        const track = await this.getTrack({ id: trackId });

        console.log(isFree);
        if (!isBuyTrack && !isFree) throw ApiError.forbidden("You can not download this music");

        await analyticsService.createDownloadHistory({ userId: user.id, trackId, releaseId: track.releaseId, bapId: track.bapId });

        return path.resolve("tracks", track.uniqueName);
    }

    async downloadTrackASAdmin(trackId) {
        const track = await this.getTrack({ id: trackId });

        if (!track) throw ApiError.badRequest("Track with this ID is not exist");

        return path.resolve("tracks", track.uniqueName);
    }

    async deleteTrack(trackId) {
        const track = await this.getTrack({ id: trackId });
        if (!track) throw ApiError.badRequest("The track doesn't exist");
        const user = await BapsModel.findOne({ where: { id: track.dataValues.bapId }, attributes: [], include: { model: UsersModel, attributes: ["id"] } });
        const userId = user.dataValues.user.dataValues.id;

        const trackPath = {
            uniqueName: track.uniqueName,
            originalName: track.originalName,
            cutTrackName: `cut_${track.uniqueName}`,
        };

        for (const key in trackPath) {
            await this.removeTrackFromDirectory(trackPath[key], userId);
        }

        await TracksModel.destroy({ where: { id: trackId } });

        return true;
    }

    async countTrackByReleaseId(releaseId) {
        const trackCount = await TracksModel.count({ where: { releaseId } });
        return trackCount;
    }
}

export default new TracksService();
