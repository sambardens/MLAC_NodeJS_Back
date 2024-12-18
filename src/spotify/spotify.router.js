import { Router } from "express";
import SpotifyController from "./spotify.controller.js";
import authMiddleware from "../auth/auth.middleware.js";

const spotifyRouter = new Router();

spotifyRouter.get("/", authMiddleware, SpotifyController.getBapsFromSpotify);

/**
 * @api {get} /api/spotify Artists from spotify
 * @apiName Get Artists from spotify
 * @apiGroup API Spotify
 * @apiQuery {string} name
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "baps": [
 *         {
 *             "external_urls": {
 *                 "spotify": "https://open.spotify.com/artist/6dC0rIJNLSFZwqckLgXJ8p"
 *             },
 *             "followers": {
 *                 "href": null,
 *                 "total": 327686
 *             },
 *             "images": [
 *                 {
 *                     "height": 1000,
 *                     "url": "https://i.scdn.co/image/b81e5fa38ce9af63d09a5e93f8524c42f6d02ea4",
 *                     "width": 1000
 *                 },
 *                 {
 *                     "height": 640,
 *                     "url": "https://i.scdn.co/image/741dcbf70f4fc157a818fa9c73a39e023f8a446b",
 *                     "width": 640
 *                 },
 *                 {
 *                     "height": 200,
 *                     "url": "https://i.scdn.co/image/dc6f5e949d9559aa8091a405bda421c11ad8177e",
 *                     "width": 200
 *                 },
 *                 {
 *                     "height": 64,
 *                     "url": "https://i.scdn.co/image/6c709d0a985278765ea0f52028a33dd57bca066f",
 *                     "width": 64
 *                 }
 *             ],
 *             "name": "Timeflies",
 *             "type": "artist",
 *             "genres": [
 *                 "dance pop",
 *                 "indie pop rap",
 *                 "indie poptimism",
 *                 "pop",
 *                 "pop dance",
 *                 "pop edm",
 *                 "pop rap",
 *                 "pop rock",
 *                 "post-teen pop",
 *                 "tropical house"
 *             ],
 *             "isSynced": false
 *         },
 *         ...
 *  ]
 */

spotifyRouter.get("/tracks", authMiddleware, SpotifyController.getTracksFromSpotify);

/**
 * @api {get} /api/spotify/tracks Tracks from spotify by track or artist name
 * @apiName Get Tracks from spotify by track or artist name
 * @apiGroup API Spotify
 * @apiQuery {string} trackName
 * @apiQuery {string} artistName
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "tracks": [
 *         {
 *             "id": "4JdSXF2p71cr8uCY3UiJM0",
 *             "name": "Frágil",
 *             "preview_url": "https://p.scdn.co/mp3-preview/391c95844ca92dc6a73d3091802c9a14ae2ea4fa?cid=a7bbe306375a40438db3c04bc60f489f",
 *             "album": {
 *                 "id": "6iZUwDpa27jeAvKxs8UYI2",
 *                 "name": "Frágil"
 *             },
 *             "artists": [
 *                 {
 *                     "id": "51ZSh80McCt7vbqHouzW0A",
 *                     "name": "Yahritza Y Su Esencia"
 *                 },
 *                 {
 *                     "id": "6XkjpgcEsYab502Vr1bBeW",
 *                     "name": "Grupo Frontera"
 *                 }
 *             ]
 *         }
 *     ]
 * }
 */

spotifyRouter.get("/releases", authMiddleware, SpotifyController.getReleasesFromSpotify);

/**
 * @api {get} /api/spotify/releases Releases from Spotify
 * @apiName Get Releases from Spotify
 * @apiGroup API Spotify
 * @apiQuery {string} name
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "releases": [
 *         {
 *             "external_urls": {
 *                 "spotify": "https://open.spotify.com/playlist/37i9dQZF1DX7rOY2tZUw1k"
 *             },
 *             "images": [
 *                 {
 *                     "height": null,
 *                     "url": "https://i.scdn.co/image/ab67706f00000003ab79e9cccfbc31fc14063f55",
 *                     "width": null
 *                 }
 *             ],
 *             "name": "Timeless Love Songs",
 *             "tracks": {
 *                 "href": "https://api.spotify.com/v1/playlists/37i9dQZF1DX7rOY2tZUw1k/tracks",
 *                 "total": 100
 *             }
 *         },
 *         {
 *             "external_urls": {
 *                 "spotify": "https://open.spotify.com/playlist/56QNzMgZScQU3ma1GWf1mt"
 *             },
 *             "images": [
 *                 {
 *                     "height": null,
 *                     "url": "https://i.scdn.co/image/ab67706c0000bebbe15ad75ed292c285c6a59364",
 *                     "width": null
 *                 }
 *             ],
 *             "name": "time flies bye bye they all sang along",
 *             "tracks": {
 *                 "href": "https://api.spotify.com/v1/playlists/56QNzMgZScQU3ma1GWf1mt/tracks",
 *                 "total": 20
 *             }
 *         }
 *     ]
 * }
 */

spotifyRouter.get("/track/:releaseSpotifyId", SpotifyController.getTracksFromReleaseSpotify);
/**
 * @api {get} /api/spotify/track/:releaseSpotifyId Tracks from Spotify of Releases
 * @apiName Get Tracks from Spotify of Releases
 * @apiGroup API Spotify
 * @apiParam {string} releaseSpotifyId `id release (playlist) from spotify`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "tracks": [
 *         {
 *             "name": "All I Want",
 *             "type": "track",
 *             "spotify": "https://open.spotify.com/track/4Cy0NHJ8Gh0xMdwyM9RkQm",
 *             "preview_url": "https://p.scdn.co/mp3-preview/cc680ec0f5fd5ff21f0cd11ac47e10d3cbb92190?cid=a7bbe306375a40438db3c04bc60f489f"
 *         },
 *         {
 *             "name": "You Are So Beautiful",
 *             "type": "track",
 *             "spotify": "https://open.spotify.com/track/2E2znCPaS8anQe21GLxcvJ",
 *             "preview_url": null
 *         }
 *     ]
 * }
 */

spotifyRouter.get("/artists/:id/albums", authMiddleware, SpotifyController.getArtistAlbum);
/**
 * @api {get} /api/spotify/artists/:id/albums Get Spotify artist's albums.
 * @apiName Get get Spotify catalog information about an artist's albums.
 * @apiGroup API Spotify
 * @apiParam {string} id `id Spotife artist`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true
 * }
 */

spotifyRouter.get("/albums/:id/tracks", authMiddleware, SpotifyController.getAlbumTracks);
/**
 * @api {get} /api/spotify/albums/:id/tracks Get Spotify Album Tracks
 * @apiName Get get Spotify Album Tracks.
 * @apiGroup API Spotify
 * @apiParam {string} id `id Spotife album`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true
 * }
 */

spotifyRouter.get("/track/features/:spotifyTrackId", authMiddleware, SpotifyController.getTrackAudioFeatures);
/**
 * @api {get} /api/spotify/track/features/:spotifyTrackId Get track audio features
 * @apiName Get Get track audio features
 * @apiGroup API Spotify
 * @apiParam {string} spotifyTrackId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "trackAudioFeatures": {
 *         "danceability": 0.593,
 *         "energy": 0.525,
 *         "key": 0,
 *         "loudness": -5.079,
 *         "mode": 1,
 *         "speechiness": 0.0303,
 *         "acousticness": 0.444,
 *         "instrumentalness": 0,
 *         "liveness": 0.124,
 *         "valence": 0.426,
 *         "tempo": 79.992,
 *         "type": "audio_features",
 *         "id": "3mlRdYbzDZbfpbzj9hxEdq",
 *         "uri": "spotify:track:3mlRdYbzDZbfpbzj9hxEdq",
 *         "track_href": "https://api.spotify.com/v1/tracks/3mlRdYbzDZbfpbzj9hxEdq",
 *         "analysis_url": "https://api.spotify.com/v1/audio-analysis/3mlRdYbzDZbfpbzj9hxEdq",
 *         "duration_ms": 216880,
 *         "time_signature": 4
 *     }
 * }
 */

spotifyRouter.get("/track/info/:trackSpotifyId", authMiddleware, SpotifyController.getTrackBySpotifyTrackId);
/**
 * @api {get} /api/spotify/track/info/:trackSpotifyId Get track info by trackSpotifyId
 * @apiName Get Get track info by trackSpotifyId
 * @apiGroup API Spotify
 * @apiParam {string} trackSpotifyId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "data": {
 *         "album": {
 *             "album_type": "single",
 *             "artists": [
 *                 {
 *                     "external_urls": {
 *                         "spotify": "https://open.spotify.com/artist/6SoxBuLPk2kaupSod0zfEB"
 *                     },
 *                     "href": "https://api.spotify.com/v1/artists/6SoxBuLPk2kaupSod0zfEB",
 *                     "id": "6SoxBuLPk2kaupSod0zfEB",
 *                     "name": "Porcelain",
 *                     "type": "artist",
 *                     "uri": "spotify:artist:6SoxBuLPk2kaupSod0zfEB"
 *                 }
 *             ],
 *             "external_urls": {
 *                 "spotify": "https://open.spotify.com/album/3gAX8X6kwq3Tiz8hM7Ic7c"
 *             },
 *             "href": "https://api.spotify.com/v1/albums/3gAX8X6kwq3Tiz8hM7Ic7c",
 *             "id": "3gAX8X6kwq3Tiz8hM7Ic7c",
 *             "images": [
 *                 {
 *                     "height": 640,
 *                     "url": "https://i.scdn.co/image/ab67616d0000b2738f1c9fa73022ca8db603a600",
 *                     "width": 640
 *                 },
 *                 {
 *                     "height": 300,
 *                     "url": "https://i.scdn.co/image/ab67616d00001e028f1c9fa73022ca8db603a600",
 *                     "width": 300
 *                 },
 *                 {
 *                     "height": 64,
 *                     "url": "https://i.scdn.co/image/ab67616d000048518f1c9fa73022ca8db603a600",
 *                     "width": 64
 *                 }
 *             ],
 *             "name": "Part One",
 *             "release_date": "2020-08-14",
 *             "release_date_precision": "day",
 *             "total_tracks": 4,
 *             "type": "album",
 *             "uri": "spotify:album:3gAX8X6kwq3Tiz8hM7Ic7c"
 *         },
 *         "artists": [
 *             {
 *                 "external_urls": {
 *                     "spotify": "https://open.spotify.com/artist/6SoxBuLPk2kaupSod0zfEB"
 *                 },
 *                 "href": "https://api.spotify.com/v1/artists/6SoxBuLPk2kaupSod0zfEB",
 *                 "id": "6SoxBuLPk2kaupSod0zfEB",
 *                 "name": "Porcelain",
 *                 "type": "artist",
 *                 "uri": "spotify:artist:6SoxBuLPk2kaupSod0zfEB"
 *             }
 *         ],
 *         "disc_number": 1,
 *         "duration_ms": 280101,
 *         "explicit": false,
 *         "external_ids": {
 *             "isrc": "UKY6K2000001"
 *         },
 *         "external_urls": {
 *             "spotify": "https://open.spotify.com/track/5aU4O07XuMFpNNR0v60Wnc"
 *         },
 *         "href": "https://api.spotify.com/v1/tracks/5aU4O07XuMFpNNR0v60Wnc",
 *         "id": "5aU4O07XuMFpNNR0v60Wnc",
 *         "is_local": false,
 *         "name": "Destruction",
 *         "popularity": 11,
 *         "preview_url": "https://p.scdn.co/mp3-preview/86b4a6484b839b6ca5fc624a8fc70f569f1d177b?cid=a7bbe306375a40438db3c04bc60f489f",
 *         "track_number": 1,
 *         "type": "track",
 *         "uri": "spotify:track:5aU4O07XuMFpNNR0v60Wnc"
 *     }
 * }
 */

spotifyRouter.post("/albums/:id", authMiddleware, SpotifyController.getSpotifyTotalTracksAndAppleMusicData);
/**
 * @api {post} /api/spotify/albums/:id Get Spotify total tracks and Apple Music data
 * @apiName Post Get Spotify total tracks and Apple Music data
 * @apiGroup API Spotify
 * @apiParam {string} id `id Spotife album`
 * @apiBody {boolean} [withAppleMusic] `true or false`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "data": {
 *         "albumType": "album",
 *         "id": "382ObEPsp2rxGrnsizN5TX",
 *         "name": "TRON: Legacy Reconfigured",
 *         "releaseDate": "2011-01-01",
 *         "releaseDatePrecision": "day",
 *         "type": "album",
 *         "uri": "spotify:album:382ObEPsp2rxGrnsizN5TX",
 *         "upc": "00050087239633",
 *         "totalTracks": 15,
 *         "label": "Walt Disney Records",
 *         "externalUrls": {
 *             "spotify": "https://open.spotify.com/album/382ObEPsp2rxGrnsizN5TX"
 *         },
 *         "artists": [
 *             {
 *                 "id": "4tZwfgrHOc3mvqYlEYSvVi",
 *                 "name": "Daft Punk"
 *             }
 *         ],
 *         "copyrights": [
 *             {
 *                 "text": "2011 Disney",
 *                 "type": "C"
 *             },
 *             {
 *                 "text": "2011 Walt Disney Records",
 *                 "type": "P"
 *             }
 *         ],
 *         "appleMusicData": {
 *             "artists": [
 *                 {
 *                     "id": "1215008293",
 *                     "name": "ANIVAR",
 *                     "artistUrl": "https://music.apple.com/us/artist/anivar/1215008293"
 *                 },
 *                 {
 *                     "id": "1445606139",
 *                     "name": "ADAMYAN",
 *                     "artistUrl": "https://music.apple.com/us/artist/adamyan/1445606139"
 *                 }
 *             ],
 *             "artwork": {
 *                 "width": 1400,
 *                 "height": 1400,
 *                 "url": "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/1c/51/fd/1c51fdad-6ad4-ecb6-144b-a406e307d5f7/cover.jpg/{w}x{h}bb.jpg",
 *                 "bgColor": "7799c0",
 *                 "textColor1": "0a0504",
 *                 "textColor2": "161616",
 *                 "textColor3": "202229",
 *                 "textColor4": "2a3138"
 *             },
 *             "genreNames": [
 *                 "Pop",
 *                 "Music"
 *             ]
 *         }
 *     }
 * }
 */

export default spotifyRouter;
