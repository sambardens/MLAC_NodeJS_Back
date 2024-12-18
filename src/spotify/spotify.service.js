import SpotifyWebApi from "spotify-web-api-node";
import dotenv from "dotenv";
import axios from "axios";
import { BapsModel } from "../baps/baps.model.js";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";
import { ApiError } from "../errors/errors.api.js";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

class SpotifyService {
    async getBapsFromSpotify(name) {
        const authResponse = await spotifyApi.clientCredentialsGrant();
        spotifyApi.setAccessToken(authResponse.body.access_token);
        const artists = await this.getArtists(name, { limit: 20 });
        const spotifyIds = artists.map((artist) => {
            return artist.external_urls?.spotify?.split("/artist/")[1];
        });
        const isSyncedBaps = await BapsModel.findAll({
            where: {
                spotifyId: {
                    [Op.in]: spotifyIds,
                },
            },
        });
        const refreshArtists = artists.map((artist) => {
            isSyncedBaps.find((i) => i.spotifyId === artist.external_urls?.spotify?.split("/artist/")[1]) ? (artist.isSynced = true) : (artist.isSynced = false);
            return artist;
        });

        return refreshArtists;
    }

    async getTracksFromSpotify(trackName, artistName) {
        if (!trackName && !artistName) {
            throw ApiError.badRequest("The trackName or artistName is required");
        }
        const authResponse = await spotifyApi.clientCredentialsGrant();
        spotifyApi.setAccessToken(authResponse.body.access_token);
        const tracks = await this.getTracks(trackName, artistName);

        return tracks;
    }

    async getArtists(name, options) {
        const resultArtists = await spotifyApi.searchArtists(name, options);
        const object = this.getObjectWithKeys(resultArtists["body"]["artists"]["items"], ["external_urls", "followers", "images", "name", "type", "genres"]);
        return object;
    }

    async getTracks(trackName, artistName, options) {
        const url = trackName && artistName ? `track:${trackName} artist:${artistName}` : trackName && !artistName ? `track:${trackName}` : `artist:${artistName}`;
        const resultTracks = await spotifyApi.searchTracks(url);

        const object = this.getObjectOfTrackWithKeys(resultTracks["body"]["tracks"]["items"], ["id", "name", "preview_url"]);

        return object;
    }

    async getRelease(name) {
        const authResponse = await spotifyApi.clientCredentialsGrant();
        spotifyApi.setAccessToken(authResponse.body.access_token);
        const resultRelease = await spotifyApi.searchPlaylists(name);
        console.log(resultRelease);
        const object = this.getObjectWithKeys(resultRelease["body"]["playlists"]["items"], ["external_urls", "images", "name", "tracks"]);
        return object;
    }

    getObjectWithKeys(arrayObjects, arrayKeys) {
        const result = [];
        for (const arrayObject of arrayObjects) {
            const object = {};
            for (const arrayKey of arrayKeys) {
                object[arrayKey] = arrayObject[arrayKey];
            }
            result.push(object);
        }
        return result;
    }

    getObjectOfTrackWithKeys(arrayObjects, arrayKeys) {
        const result = [];
        for (const arrayObject of arrayObjects) {
            const object = {};
            const data = {
                album: {
                    id: arrayObject.album.id,
                    name: arrayObject.album.name,
                },
                artists: arrayObject.artists.map((artist) => {
                    return {
                        id: artist.id,
                        name: artist.name,
                    };
                }),
            };
            for (const arrayKey of arrayKeys) {
                object[arrayKey] = arrayObject[arrayKey];
            }
            object.album = data.album;
            object.artists = data.artists;
            result.push(object);
        }

        return result;
    }

    async getTracksFromReleaseSpotify(playlistSpotifyId) {
        const authResponse = await spotifyApi.clientCredentialsGrant();
        const { data } = await axios.get(`https://api.spotify.com/v1/playlists/${playlistSpotifyId}/tracks`, {
            headers: {
                Authorization: "Bearer " + authResponse.body.access_token,
            },
        });
        const result = [];

        for (let i = 0; i < data.items.length; i++) {
            const track = this.getObjectWithKeys([data.items[i].track], ["external_urls", "preview_url", "name", "type", "album_type"]).map((item) => ({
                name: item.name,
                type: item.type,
                spotify: item["external_urls"].spotify,
                preview_url: item.preview_url,
                album_type: item.album_type,
            }));
            result.push(...track);
        }

        return result;
    }

    async getArtistAlbum(artistId) {
        const authResponse = await spotifyApi.clientCredentialsGrant();
        spotifyApi.setAccessToken(authResponse.body.access_token);
        const artistAlbums = await spotifyApi.getArtistAlbums(artistId, { limit: 50 });
        const object = this.getObjectWithKeys(artistAlbums["body"]["items"], ["album_type", "external_urls", "id", "images", "name", "release_date"]);
        return object;
    }

    async getAlbumTracks(albumId) {
        const authResponse = await spotifyApi.clientCredentialsGrant();
        spotifyApi.setAccessToken(authResponse.body.access_token);
        const artistAlbums = await spotifyApi.getAlbumTracks(albumId);
        const object = this.getObjectWithKeys(artistAlbums["body"]["items"], ["artists", "external_urls", "id", "name", "preview_url", "type"]);
        return object;
    }

    async getArtistById(artistId) {
        const authResponse = await spotifyApi.clientCredentialsGrant();
        const { data } = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
            headers: {
                Authorization: "Bearer " + authResponse.body.access_token,
            },
        });
        return data;
    }

    async getTrackAudioFeatures(spotifyTrackId) {
        const authResponse = await spotifyApi.clientCredentialsGrant();
        const { data } = await axios.get(`https://api.spotify.com/v1/audio-features/${spotifyTrackId}`, {
            headers: {
                Authorization: "Bearer " + authResponse.body.access_token,
            },
        });
        return data;
    }

    async getTrackBySpotifyTrackId(trackSpotifyId) {
        const authResponse = await spotifyApi.clientCredentialsGrant();
        const { data } = await axios.get(`https://api.spotify.com/v1/tracks/${trackSpotifyId}`, {
            headers: {
                Authorization: "Bearer " + authResponse.body.access_token,
            },
        });
        delete data?.available_markets
        delete data?.album?.available_markets
        
        return data;
    }

    async getUpc(albumId) {
        try {
            const authResponse = await spotifyApi.clientCredentialsGrant();
            const { data } = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`, {
                headers: {
                    Authorization: "Bearer " + authResponse.body.access_token,
                },
            });
            return data;
        } catch (err) {
            return err;
        }
    }

    async getAccessToken() {
        const privateKey = process.env.MUSIC_KIT_PRIVATE_KEY;
        const teamId = process.env.APPLE_MUSIC_TEAM_ID;
        const keyId = process.env.MUSIC_KIT_KEY_ID;

        const currentTime = Math.floor(Date.now() / 1000);
        const expirationTime = currentTime + 1800; // The token is valid for 30 minutes

        const claims = {
            iss: teamId,
            iat: currentTime,
            exp: expirationTime,
        };

        const developerToken = jwt.sign(claims, privateKey, {
            algorithm: "ES256",
            keyid: keyId,
        });

        return developerToken;
    }

    async getAppleMusicData(upc) {
        const accessToken = await this.getAccessToken();
        try {
            const { data } = await axios.get(`https://api.music.apple.com/v1/catalog/us/albums?filter[upc]=${upc}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            let appleMusicData = {}
            if (data.data.length) {
                const url = data?.data[0]?.relationships?.artists?.href;
                const artistsData = await axios.get(`https://api.music.apple.com${url}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const artists = artistsData.data.data.map((item) => ({
                    id: item.id,
                    name: item.attributes.name,
                    artistUrl: item.attributes.url,
                }));
                appleMusicData = {
                    artists,
                    artwork: data.data[0].attributes.artwork,
                    genreNames: data.data[0].attributes.genreNames,
                };
            }

            return appleMusicData;
        } catch (err) {
            console.log("error: ", err);
            return {};
        }
    }

    async getSpotifyTotalTracksAndAppleMusicData(albumId, withAppleMusic) {
        const album = await this.getUpc(albumId);
        const upc = album.external_ids.upc;
        const artists = album.artists.map((artist) => {
            return {
                id: artist.id,
                name: artist.name,
            };
        });

        const data = {
            albumType: album.album_type,
            id: album.id,
            name: album.name,
            releaseDate: album.release_date,
            releaseDatePrecision: album.release_date_precision,
            type: album.type,
            uri: album.uri,
            upc,
            totalTracks: album.total_tracks,
            label: album.label,
            externalUrls: album.external_urls,
            artists,
            copyrights: album.copyrights,
        };

        if (withAppleMusic) {
            const appleMusicData = await this.getAppleMusicData(upc);
            return {
                ...data,
                appleMusicData,
            };
        }

        return data;
    }
}

export default new SpotifyService();
