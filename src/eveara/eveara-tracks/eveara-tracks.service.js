import axios from "axios";
import path from "path";
import fs from "fs";
import FormData from "form-data";
import usersService from "../../users/users.service.js";
import tracksService from "../../tracks/tracks.service.js";
import { ApiError } from "../../errors/errors.api.js";
import evearaService from "../eveara.service.js";
import { ReleaseModel } from "../../release/release.model.js";
import { TracksModel } from "../../tracks/tracks.model.js";
import { BapsModel } from "../../baps/baps.model.js";

class EvearaTracksService {
    async addTracks(userMajorLablId, releaseId) {
        try {
            const userMajorLabl = await usersService.getUser({ id: userMajorLablId });
            console.log(userMajorLabl);
            const tracks = await TracksModel.findAll({ where: { releaseId } });

            const processedTracks = [];

            for (const track of tracks) {
                const pathToTrack = path.resolve("tracks", track.originalName);
                if (!fs.existsSync(pathToTrack)) {
                    console.error(`Track not found for originalName: ${track.originalName}`);
                    processedTracks.push({
                        id: track.id,
                        message: "Track not found in directory",
                        originalName: track.originalName,
                        evearaTrackId: track.evearaTrackId,
                    });
                } else {
                    const formData = new FormData();
                    formData.append("track_file", fs.createReadStream(pathToTrack));
                    formData.append("uuid", userMajorLabl.uuidEveara);
                    const accessData = await evearaService.getAccessToken();

                    try {
                        if (track.evearaTrackId === null) {
                            const { data } = await axios.post("https://staging.eveara.com/api/v2.0/tracks", formData, {
                                headers: {
                                    Authorization: accessData.token_type + " " + accessData.access_token,
                                    ...formData.getHeaders(),
                                },
                            });
                            console.log("data after add track: ", data);

                            const bap = await BapsModel.findOne({
                                where: { id: track.bapId },
                                include: [{ model: ReleaseModel, where: { id: track.releaseId }, include: { model: TracksModel } }],
                            });
                            const body = {
                                uuid: userMajorLabl.uuidEveara,
                                name: track.name,
                                stereo_isrc: track.isrc !== null ? track.isrc : null,
                                explicit: track.explicit === true ? 1 : 2,
                                availability: [1, 2],
                                lyrics: track.lyrics && track.lyrics,
                                artists: bap.dataValues.evearaBapId ? [+bap.dataValues.evearaBapId] : null,
                                genre: bap.dataValues.releases[0].dataValues.evearaGenreIds && JSON.parse(bap.dataValues.releases[0].dataValues.evearaGenreIds),
                                album_only: bap.dataValues.releases[0].dataValues.tracks.length > 1 ? true : bap.dataValues.releases[0].dataValues.tracks.length === 0 ? null : false,
                            };
                            console.log("body to update: ", body);
                            const update = await axios.put(`https://staging.eveara.com/api/v2.0/tracks/${data.track_id}`, body, {
                                headers: {
                                    Authorization: accessData.token_type + " " + accessData.access_token,
                                },
                            });
                            console.log("data after update: ", update.data);
                            await track.update({ evearaTrackId: data.track_id });
                            processedTracks.push({ id: track.id, message: "track added and updated on Eveara successfully", originalName: track.originalName, evearaTrackId: data.track_id });
                        } else {
                            processedTracks.push({
                                id: track.id,
                                message: "track already exist on Eveara",
                                originalName: track.originalName,
                                evearaTrackId: track.evearaTrackId,
                            });
                        }
                    } catch (err) {
                        console.error("Error processing track:", err.response ? err.response.data.errors : err.message);
                        return err.response ? err.response.data.errors : err.message;
                    }
                }
            }

            return processedTracks;
        } catch (error) {
            console.error("Error adding tracks:", error);
            throw error;
        }
    }

    async updateTrack(trackId, body0) {
        console.log('data: ', trackId, body0);
        const accessData = await evearaService.getAccessToken();
        try {
            const track = await axios.get(`https://staging.eveara.com/api/v2.0/tracks/${trackId}?uuid=${body0.uuid}`, {
                headers: {
                    Authorization: accessData.token_type + " " + accessData.access_token,
                },
            });
            if (track.data?.data?.length > 0) {
                const body1 = track.data.data[0]
                console.log('body1: ', body1);

                const { genres, extention, track_id, track_url, removeable, ...evearaBody } = body1
                const genre = genres?.map(el => el.genre_id) || [];
                const artists = body1.artists?.map(el => el.artist_id) || [];
                const featured_artists = body1.featured_artists?.map(el => el.artist_id) || [];
                const album_only = body1.album_only === "true";
                const explicit = body1.explicit === "true" ? 1 : 2;
                const body = { ...evearaBody, genre, artists, featured_artists, album_only, explicit, availability: [1,2], ...body0 };

                console.log('body: ', body);
                const { data } = await axios.put(`https://staging.eveara.com/api/v2.0/tracks/${trackId}`, body, {
                    headers: {
                        Authorization: accessData.token_type + " " + accessData.access_token,
                    },
                });

                return data;
            } else { 
                return track.data
            }
        } catch (err) {
            throw err;
        }
    }

    async getTrack(trackId, uuidEveara) {
        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.get(`https://staging.eveara.com/api/v2.0/tracks/${trackId}?uuid=${uuidEveara}`, {
                headers: {
                    Authorization: accessData.token_type + " " + accessData.access_token,
                },
            });

            return data;
        } catch (err) {
            return err.response.data;
        }
    }

    async removeTrack(trackId, uuidEveara) {

        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.delete(`https://staging.eveara.com/api/v2.0/tracks/${trackId}?uuid=${uuidEveara}`, {
                headers: {
                    Authorization: accessData.token_type + " " + accessData.access_token,
                },
            });

            await TracksModel.update({ evearaTrackId: null }, { where: { evearaTrackId: trackId } })

            return data;
        } catch (err) {
            return err.response.data;
        }
    }
}

export default new EvearaTracksService();
