import { Router } from "express";
import authMiddleware from "../auth/auth.middleware.js";
import TracksController from "./tracks.controller.js";
import authCheckRoleMiddleware from "../auth/auth.checkRoleMiddleware.js";

const tracksRouter = new Router();

tracksRouter.post("/create", authMiddleware, TracksController.uploadTrackAndCreateRelease);
/**
 * @api {post} /api/tracks/create Upload track and create release
 * @apiName Post Upload track and create release
 * @apiGroup API Track
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiBody {string} name
 * @apiBody {number} position
 * @apiBody {string} bapSpotifyId
 * @apiBody {number} bapId
 * @apiBody {files} track
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "success": true,
    "trackInfo": {
        "lyrics": false,
        "id": 2513,
        "releaseId": 997,
        "bapId": 1810,
        "name": "Love Tonight (Edit)",
        "originalName": "fe1f9310-ae9c-4e3b-9ab2-07caf57e7c3d.flac",
        "uniqueName": "fe1f9310-ae9c-4e3b-9ab2-07caf57e7c3d.mp3",
        "info": {
            "status": "success",
            "result": {
                "artist": "Shouse",
                "title": "Love Tonight (Edit)",
                "album": "Love Tonight",
                "release_date": "2017-12-14",
                "label": "Hell Beach",
                "timecode": "04:01",
                "song_link": "https://lis.tn/LoveTonightEdit",
                "apple_music": {
                    "previews": [
                        {
                            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/e4/ee/32/e4ee3277-f154-2d6a-8cb8-38c2fe36a15f/mzaf_17780636437467656123.plus.aac.p.m4a"
                        }
                    ],
                    "artwork": {
                        "width": 1400,
                        "height": 1400,
                        "url": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/bf/52/2d/bf522d83-2845-ed86-fd9c-e2ab7cbf429b/191515989932_Cover.jpg/{w}x{h}bb.jpg",
                        "bgColor": "351718",
                        "textColor1": "fcf006",
                        "textColor2": "e5ae97",
                        "textColor3": "d4c509",
                        "textColor4": "c2907e"
                    },
                    "artistName": "Shouse",
                    "url": "https://music.apple.com/us/album/love-tonight-edit/1320367566?app=music&at=1000l33QU&i=1320367588&mt=1",
                    "discNumber": 1,
                    "genreNames": [
                        "Electronic",
                        "Music"
                    ],
                    "durationInMillis": 241970,
                    "releaseDate": "2017-12-14",
                    "name": "Love Tonight (Edit)",
                    "isrc": "USQY51798087",
                    "albumName": "Love Tonight - Single",
                    "playParams": {
                        "id": "1320367588",
                        "kind": "song"
                    },
                    "trackNumber": 2,
                    "composerName": "Jack Madin & Edward Service"
                },
                "spotify": {
                    "album": {
                        "name": "Love Tonight",
                        "artists": [
                            {
                                "name": "Shouse",
                                "id": "2TcGJdSOiOvITBzhvfX8XB",
                                "uri": "spotify:artist:2TcGJdSOiOvITBzhvfX8XB",
                                "href": "https://api.spotify.com/v1/artists/2TcGJdSOiOvITBzhvfX8XB",
                                "external_urls": {
                                    "spotify": "https://open.spotify.com/artist/2TcGJdSOiOvITBzhvfX8XB"
                                }
                            }
                        ],
                        "album_group": "",
                        "album_type": "single",
                        "id": "5KXv2MHeoLSqZ96jRuFF9H",
                        "uri": "spotify:album:5KXv2MHeoLSqZ96jRuFF9H",
                        "href": "https://api.spotify.com/v1/albums/5KXv2MHeoLSqZ96jRuFF9H",
                        "images": [
                            {
                                "height": 640,
                                "width": 640,
                                "url": "https://i.scdn.co/image/ab67616d0000b27381376e47003d45f6513b5657"
                            },
                            {
                                "height": 300,
                                "width": 300,
                                "url": "https://i.scdn.co/image/ab67616d00001e0281376e47003d45f6513b5657"
                            },
                            {
                                "height": 64,
                                "width": 64,
                                "url": "https://i.scdn.co/image/ab67616d0000485181376e47003d45f6513b5657"
                            }
                        ],
                        "external_urls": {
                            "spotify": "https://open.spotify.com/album/5KXv2MHeoLSqZ96jRuFF9H"
                        },
                        "release_date": "2017-12-14",
                        "release_date_precision": "day"
                    },
                    "external_ids": {
                        "isrc": "USQY51798087"
                    },
                    "popularity": 76,
                    "is_playable": null,
                    "linked_from": null,
                    "artists": [
                        {
                            "name": "Shouse",
                            "id": "2TcGJdSOiOvITBzhvfX8XB",
                            "uri": "spotify:artist:2TcGJdSOiOvITBzhvfX8XB",
                            "href": "https://api.spotify.com/v1/artists/2TcGJdSOiOvITBzhvfX8XB",
                            "external_urls": {
                                "spotify": "https://open.spotify.com/artist/2TcGJdSOiOvITBzhvfX8XB"
                            }
                        }
                    ],
                    "disc_number": 1,
                    "duration_ms": 241970,
                    "explicit": false,
                    "external_urls": {
                        "spotify": "https://open.spotify.com/track/6OufwUcCqo81guU2jAlDVP"
                    },
                    "href": "https://api.spotify.com/v1/tracks/6OufwUcCqo81guU2jAlDVP",
                    "id": "6OufwUcCqo81guU2jAlDVP",
                    "name": "Love Tonight (Edit)",
                    "preview_url": "https://p.scdn.co/mp3-preview/7d9ec9cde591eb2ac749710539a3a49d9f4ed30e?cid=e44e7b8278114c7db211c00ea273ac69",
                    "track_number": 2,
                    "uri": "spotify:track:6OufwUcCqo81guU2jAlDVP"
                }
            },
            "preview": "cut_fe1f9310-ae9c-4e3b-9ab2-07caf57e7c3d.mp3",
            "full": "fe1f9310-ae9c-4e3b-9ab2-07caf57e7c3d.mp3"
        },
        "socialLinks": "https://lis.tn/LoveTonightEdit",
        "composers": "Jack Madin, Edward Service",
        "duration": 241970,
        "discNumber": 1,
        "isrc": "USQY51798087",
        "spotifyId": "6OufwUcCqo81guU2jAlDVP",
        "spotifyPreviewUrl": "https://p.scdn.co/mp3-preview/7d9ec9cde591eb2ac749710539a3a49d9f4ed30e?cid=e44e7b8278114c7db211c00ea273ac69",
        "timeCode": "04:01",
        "albumSpotifyId": "5KXv2MHeoLSqZ96jRuFF9H",
        "explicit": false,
        "updatedAt": "2023-09-01T11:30:57.628Z",
        "createdAt": "2023-09-01T11:30:57.628Z"
    },
    "releaseInfo": {
        "mainGenreId": null,
        "secondaryGenreId": null,
        "releasesStatus": "ACTIVE",
        "releasePrice": 0,
        "subGenresIds": null,
        "id": 997,
        "name": "Love Tonight (Edit)",
        "releaseSpotifyId": "5KXv2MHeoLSqZ96jRuFF9H",
        "releaseDate": "2017-12-14T00:00:00.000Z",
        "label": "Hell Beach",
        "spotifyUri": "spotify:album:5KXv2MHeoLSqZ96jRuFF9H",
        "totalTracks": 2,
        "upc": "191515989932",
        "copyrights": [
            {
                "text": "© 2017 Hell Beach",
                "type": "C"
            },
            {
                "text": "℗ 2017 Hell Beach",
                "type": "P"
            }
        ],
        "isReleaseByOriginalAudio": true,
        "logo": "cecfe3c2-6e52-4ab5-988a-ece8e9942bf0.jpg",
        "thumbnail": "thumb_cecfe3c2-6e52-4ab5-988a-ece8e9942bf0.jpg",
        "bapId": "1810",
        "updatedAt": "2023-09-01T11:30:57.210Z",
        "createdAt": "2023-09-01T11:30:57.210Z",
        "additionalInfo": {
            "albumType": "single",
            "albumGenres": [
                "Electronic",
                "Music"
            ]
        }
    }
}
 */

tracksRouter.post("/create/:releaseId", authMiddleware, TracksController.uploadTrackToRelease);
/**
 * @api {post} /api/tracks/create/:releaseId Upload track to release
 * @apiName Get Upload track to release
 * @apiGroup API Track
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} releaseId
 * @apiBody {string} name
 * @apiBody {number} position
 * @apiBody {number} bapSpotifyId
 * @apiBody {files} track
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 {
    "success": true,
    "trackInfo": {
        "lyrics": false,
        "id": 2514,
        "releaseId": 982,
        "bapId": 1810,
        "name": "Love Tonight (Edit)",
        "originalName": "bd05111d-080d-455f-8ff4-9625ccda5ef2.flac",
        "uniqueName": "bd05111d-080d-455f-8ff4-9625ccda5ef2.mp3",
        "info": {
            "status": "success",
            "result": {
                "artist": "Shouse",
                "title": "Love Tonight (Edit)",
                "album": "Love Tonight",
                "release_date": "2017-12-14",
                "label": "Hell Beach",
                "timecode": "04:01",
                "song_link": "https://lis.tn/LoveTonightEdit",
                "apple_music": {
                    "previews": [
                        {
                            "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/e4/ee/32/e4ee3277-f154-2d6a-8cb8-38c2fe36a15f/mzaf_17780636437467656123.plus.aac.p.m4a"
                        }
                    ],
                    "artwork": {
                        "width": 1400,
                        "height": 1400,
                        "url": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/bf/52/2d/bf522d83-2845-ed86-fd9c-e2ab7cbf429b/191515989932_Cover.jpg/{w}x{h}bb.jpg",
                        "bgColor": "351718",
                        "textColor1": "fcf006",
                        "textColor2": "e5ae97",
                        "textColor3": "d4c509",
                        "textColor4": "c2907e"
                    },
                    "artistName": "Shouse",
                    "url": "https://music.apple.com/us/album/love-tonight-edit/1320367566?app=music&at=1000l33QU&i=1320367588&mt=1",
                    "discNumber": 1,
                    "genreNames": [
                        "Electronic",
                        "Music"
                    ],
                    "durationInMillis": 241970,
                    "releaseDate": "2017-12-14",
                    "name": "Love Tonight (Edit)",
                    "isrc": "USQY51798087",
                    "albumName": "Love Tonight - Single",
                    "playParams": {
                        "id": "1320367588",
                        "kind": "song"
                    },
                    "trackNumber": 2,
                    "composerName": "Jack Madin & Edward Service"
                },
                "spotify": {
                    "album": {
                        "name": "Love Tonight",
                        "artists": [
                            {
                                "name": "Shouse",
                                "id": "2TcGJdSOiOvITBzhvfX8XB",
                                "uri": "spotify:artist:2TcGJdSOiOvITBzhvfX8XB",
                                "href": "https://api.spotify.com/v1/artists/2TcGJdSOiOvITBzhvfX8XB",
                                "external_urls": {
                                    "spotify": "https://open.spotify.com/artist/2TcGJdSOiOvITBzhvfX8XB"
                                }
                            }
                        ],
                        "album_group": "",
                        "album_type": "single",
                        "id": "5KXv2MHeoLSqZ96jRuFF9H",
                        "uri": "spotify:album:5KXv2MHeoLSqZ96jRuFF9H",
                        "href": "https://api.spotify.com/v1/albums/5KXv2MHeoLSqZ96jRuFF9H",
                        "images": [
                            {
                                "height": 640,
                                "width": 640,
                                "url": "https://i.scdn.co/image/ab67616d0000b27381376e47003d45f6513b5657"
                            },
                            {
                                "height": 300,
                                "width": 300,
                                "url": "https://i.scdn.co/image/ab67616d00001e0281376e47003d45f6513b5657"
                            },
                            {
                                "height": 64,
                                "width": 64,
                                "url": "https://i.scdn.co/image/ab67616d0000485181376e47003d45f6513b5657"
                            }
                        ],
                        "external_urls": {
                            "spotify": "https://open.spotify.com/album/5KXv2MHeoLSqZ96jRuFF9H"
                        },
                        "release_date": "2017-12-14",
                        "release_date_precision": "day"
                    },
                    "external_ids": {
                        "isrc": "USQY51798087"
                    },
                    "popularity": 76,
                    "is_playable": null,
                    "linked_from": null,
                    "artists": [
                        {
                            "name": "Shouse",
                            "id": "2TcGJdSOiOvITBzhvfX8XB",
                            "uri": "spotify:artist:2TcGJdSOiOvITBzhvfX8XB",
                            "href": "https://api.spotify.com/v1/artists/2TcGJdSOiOvITBzhvfX8XB",
                            "external_urls": {
                                "spotify": "https://open.spotify.com/artist/2TcGJdSOiOvITBzhvfX8XB"
                            }
                        }
                    ],
                    "disc_number": 1,
                    "duration_ms": 241970,
                    "explicit": false,
                    "external_urls": {
                        "spotify": "https://open.spotify.com/track/6OufwUcCqo81guU2jAlDVP"
                    },
                    "href": "https://api.spotify.com/v1/tracks/6OufwUcCqo81guU2jAlDVP",
                    "id": "6OufwUcCqo81guU2jAlDVP",
                    "name": "Love Tonight (Edit)",
                    "preview_url": "https://p.scdn.co/mp3-preview/7d9ec9cde591eb2ac749710539a3a49d9f4ed30e?cid=e44e7b8278114c7db211c00ea273ac69",
                    "track_number": 2,
                    "uri": "spotify:track:6OufwUcCqo81guU2jAlDVP"
                }
            },
            "preview": "cut_bd05111d-080d-455f-8ff4-9625ccda5ef2.mp3",
            "full": "bd05111d-080d-455f-8ff4-9625ccda5ef2.mp3"
        },
        "socialLinks": "https://lis.tn/LoveTonightEdit",
        "composers": "Jack Madin, Edward Service",
        "duration": 241970,
        "discNumber": 1,
        "isrc": "USQY51798087",
        "spotifyId": "6OufwUcCqo81guU2jAlDVP",
        "spotifyPreviewUrl": "https://p.scdn.co/mp3-preview/7d9ec9cde591eb2ac749710539a3a49d9f4ed30e?cid=e44e7b8278114c7db211c00ea273ac69",
        "timeCode": "04:01",
        "albumSpotifyId": "5KXv2MHeoLSqZ96jRuFF9H",
        "explicit": false,
        "updatedAt": "2023-09-01T11:52:18.145Z",
        "createdAt": "2023-09-01T11:52:18.145Z"
    }
}
 */

tracksRouter.put("/many", authMiddleware, TracksController.editSettingsManyTracks);

/**
 * @api {put} /api/tracks/many Edit settings many tracks
 * @apiName Put Edit settings many tracks
 * @apiGroup API Track
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParamExample {json} Request-Example:
 * {
 *     "53745fd5-b8f5-4a2b-ba37-24cb91c8a894.mp3": {
 *         "price": 1234,
 *         "position": 1
 *     },
 *     "a2c7b316-4675-4fa4-8d88-7ef88eed8cdc.mp3": {
 *         "price": 1234,
 *         "position": 2
 *     }
 * }
 * }
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true
 * }
 */

tracksRouter.get("/:releaseId", TracksController.getTracks);
/**
 * @api {get} /api/tracks/:releaseId Get Tracks
 * @apiName Get Get Tracks
 * @apiGroup API Track
 * @apiParam {number} releaseId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "success": true,
    "tracks": [
        {
            "id": 2489,
            "name": "Live ",
            "uniqueName": "a177eb8e-8c3f-4a9a-baac-b5cad6e63d96.mp3",
            "originalName": "a177eb8e-8c3f-4a9a-baac-b5cad6e63d96.mp3",
            "type": null,
            "price": "2.000",
            "info": {
                "status": "success",
                "result": {
                    "artist": "David Newton",
                    "title": "Temperance",
                    "album": "Pacific Heights",
                    "release_date": "2003-12-01",
                    "label": "Bright New Day Records",
                    "timecode": "00:45",
                    "song_link": "https://lis.tn/gGlnfK",
                    "apple_music": {
                        "previews": [
                            {
                                "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/bb/ab/3c/bbab3cc3-9567-ec76-a1e5-74e2b81c70a0/mzaf_11032452442755243355.plus.aac.p.m4a"
                            }
                        ],
                        "artwork": {
                            "width": 1500,
                            "height": 1500,
                            "url": "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/9c/dd/94/9cdd94ca-e0f4-21a8-5355-5cbcaac57514/5060074160319.png/{w}x{h}bb.jpg",
                            "bgColor": "54bff1",
                            "textColor1": "110a0b",
                            "textColor2": "242916",
                            "textColor3": "1f2e39",
                            "textColor4": "2d4742"
                        },
                        "artistName": "David Newton, Colin Oxley & Dave Chamberlain",
                        "url": "https://music.apple.com/us/album/temperance/1617358144?app=music&at=1000l33QU&i=1617358482&mt=1",
                        "discNumber": 1,
                        "genreNames": [
                            "Contemporary Jazz",
                            "Music",
                            "Jazz"
                        ],
                        "durationInMillis": 302053,
                        "releaseDate": "2003-12-01",
                        "name": "Temperance",
                        "isrc": "GBBET0702865",
                        "albumName": "Pacific Heights",
                        "playParams": {
                            "id": "1617358482",
                            "kind": "song"
                        },
                        "trackNumber": 8,
                        "composerName": "Unknown"
                    },
                    "spotify": {
                        "album": {
                            "name": "Pacific Heights",
                            "artists": [
                                {
                                    "name": "David Newton",
                                    "id": "3ecO9MnClCeQeRCPLzAEgy",
                                    "uri": "spotify:artist:3ecO9MnClCeQeRCPLzAEgy",
                                    "href": "https://api.spotify.com/v1/artists/3ecO9MnClCeQeRCPLzAEgy",
                                    "external_urls": {
                                        "spotify": "https://open.spotify.com/artist/3ecO9MnClCeQeRCPLzAEgy"
                                    }
                                },
                                {
                                    "name": "Colin Oxley",
                                    "id": "6Qs92KB5NHAzQ3NsLfZ6qs",
                                    "uri": "spotify:artist:6Qs92KB5NHAzQ3NsLfZ6qs",
                                    "href": "https://api.spotify.com/v1/artists/6Qs92KB5NHAzQ3NsLfZ6qs",
                                    "external_urls": {
                                        "spotify": "https://open.spotify.com/artist/6Qs92KB5NHAzQ3NsLfZ6qs"
                                    }
                                },
                                {
                                    "name": "Dave Chamberlain",
                                    "id": "39LRDjCTn1f255RhV5cmyF",
                                    "uri": "spotify:artist:39LRDjCTn1f255RhV5cmyF",
                                    "href": "https://api.spotify.com/v1/artists/39LRDjCTn1f255RhV5cmyF",
                                    "external_urls": {
                                        "spotify": "https://open.spotify.com/artist/39LRDjCTn1f255RhV5cmyF"
                                    }
                                }
                            ],
                            "album_group": "",
                            "album_type": "album",
                            "id": "0vKVxcAWjAbnjA9kxKZKny",
                            "uri": "spotify:album:0vKVxcAWjAbnjA9kxKZKny",
                            "href": "https://api.spotify.com/v1/albums/0vKVxcAWjAbnjA9kxKZKny",
                            "images": [
                                {
                                    "height": 640,
                                    "width": 640,
                                    "url": "https://i.scdn.co/image/ab67616d0000b27311918f21a0093dabb7bb9631"
                                },
                                {
                                    "height": 300,
                                    "width": 300,
                                    "url": "https://i.scdn.co/image/ab67616d00001e0211918f21a0093dabb7bb9631"
                                },
                                {
                                    "height": 64,
                                    "width": 64,
                                    "url": "https://i.scdn.co/image/ab67616d0000485111918f21a0093dabb7bb9631"
                                }
                            ],
                            "external_urls": {
                                "spotify": "https://open.spotify.com/album/0vKVxcAWjAbnjA9kxKZKny"
                            },
                            "release_date": "2003",
                            "release_date_precision": "year"
                        },
                        "external_ids": {
                            "isrc": "GBBET0702865"
                        },
                        "popularity": 1,
                        "is_playable": null,
                        "linked_from": null,
                        "artists": [
                            {
                                "name": "David Newton",
                                "id": "3ecO9MnClCeQeRCPLzAEgy",
                                "uri": "spotify:artist:3ecO9MnClCeQeRCPLzAEgy",
                                "href": "https://api.spotify.com/v1/artists/3ecO9MnClCeQeRCPLzAEgy",
                                "external_urls": {
                                    "spotify": "https://open.spotify.com/artist/3ecO9MnClCeQeRCPLzAEgy"
                                }
                            },
                            {
                                "name": "Colin Oxley",
                                "id": "6Qs92KB5NHAzQ3NsLfZ6qs",
                                "uri": "spotify:artist:6Qs92KB5NHAzQ3NsLfZ6qs",
                                "href": "https://api.spotify.com/v1/artists/6Qs92KB5NHAzQ3NsLfZ6qs",
                                "external_urls": {
                                    "spotify": "https://open.spotify.com/artist/6Qs92KB5NHAzQ3NsLfZ6qs"
                                }
                            },
                            {
                                "name": "Dave Chamberlain",
                                "id": "39LRDjCTn1f255RhV5cmyF",
                                "uri": "spotify:artist:39LRDjCTn1f255RhV5cmyF",
                                "href": "https://api.spotify.com/v1/artists/39LRDjCTn1f255RhV5cmyF",
                                "external_urls": {
                                    "spotify": "https://open.spotify.com/artist/39LRDjCTn1f255RhV5cmyF"
                                }
                            }
                        ],
                        "disc_number": 1,
                        "duration_ms": 302053,
                        "explicit": false,
                        "external_urls": {
                            "spotify": "https://open.spotify.com/track/1rLwx4a2IDwubjhQBsv6O6"
                        },
                        "href": "https://api.spotify.com/v1/tracks/1rLwx4a2IDwubjhQBsv6O6",
                        "id": "1rLwx4a2IDwubjhQBsv6O6",
                        "name": "Temperance",
                        "preview_url": "https://p.scdn.co/mp3-preview/ac70795c2a0a16496a07b8db4f9d328cff4b42e6?cid=e44e7b8278114c7db211c00ea273ac69",
                        "track_number": 8,
                        "uri": "spotify:track:1rLwx4a2IDwubjhQBsv6O6"
                    }
                },
                "preview": "https://p.scdn.co/mp3-preview/ac70795c2a0a16496a07b8db4f9d328cff4b42e6?cid=e44e7b8278114c7db211c00ea273ac69"
            },
            "position": 1,
            "socialLinks": "https://lis.tn/gGlnfK",
            "composers": "Unknown",
            "duration": 302053,
            "discNumber": 1,
            "isrc": "GBBET0702865",
            "lyrics": "0",
            "spotifyId": "1rLwx4a2IDwubjhQBsv6O6",
            "spotifyPreviewUrl": "https://p.scdn.co/mp3-preview/ac70795c2a0a16496a07b8db4f9d328cff4b42e6?cid=e44e7b8278114c7db211c00ea273ac69",
            "timeCode": "00:45",
            "albumSpotifyId": null,
            "explicit": false,
            "spotifyLink": "example",
            "createdAt": "2023-08-30T23:25:55.000Z",
            "updatedAt": "2023-08-30T23:29:22.000Z",
            "releaseId": 989,
            "bapId": 1816,
            "featureArtists": null,
            "evearaTrackId": null,
            "evearaPriceId": null,
            "evearaPreviewDuration": null,
            "featureArtists": [],
            "trackFull": "a177eb8e-8c3f-4a9a-baac-b5cad6e63d96.mp3",
            "trackPreview": "cut_a177eb8e-8c3f-4a9a-baac-b5cad6e63d96.mp3"
        }
    ]
}
 */

tracksRouter.delete("/release/:releaseId", authMiddleware, TracksController.removeTrackRelease);
/**
 * @api {delete} /api/tracks/release/:releaseId Remove track from release
 * @apiName Delete Remove track from release
 * @apiGroup API Track
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} releaseId
 * @apiQuery {number} trackId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true
 * }
 */

tracksRouter.post("/split/:splitId", authMiddleware, TracksController.addSplitTrack);

/**
 * @api {post} /api/tracks/split/:splitId Add track to split
 * @apiName Post Add track to split
 * @apiGroup API Track
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} splitId
 * @apiBody {number} trackIds
 * @apiParamExample {json} Request-Example:
 * {
 *   "trackIds": [1, 2, 3, 4]
 * }
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *  {
 *     "success": true
 * }
 */

tracksRouter.put("/release/audd", authMiddleware, TracksController.getInfoAuddByTrack);
/**
 * @api {put} /api/tracks/release/audd Get info by track from Audd
 * @apiName Post Get info by track from Audd
 * @apiGroup API Track
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiBody {files} track
 * @apiQuery {string} uniqueName
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     status: 'success',
 *     result: {
 *         artist: 'Imagine Dragons',
 *         title: 'Smoke And Mirrors',
 *         album: 'Smoke + Mirrors',
 *         release_date: '2015-10-30',
 *         label: 'Kid Ina Korner / Interscope',
 *         timecode: '00:19',
 *         song_link: 'https://lis.tn/jEYODY',
 *         apple_music: {
 *             previews: [Array],
 *             artwork: [Object],
 *             artistName: 'Imagine Dragons',
 *             url: 'https://music.apple.com/us/album/smoke-and-mirrors/1440831203?app=music&at=1000l33QU&i=1440831214&mt=1',
 *             discNumber: 1,
 *             genreNames: [Array],
 *             durationInMillis: 260907,
 *             releaseDate: '2014-09-18',
 *             name: 'Smoke and Mirrors',
 *             isrc: 'USUM71417930',
 *             albumName: 'Smoke + Mirrors (Deluxe)',
 *             playParams: [Object],
 *             trackNumber: 3,
 *             composerName: 'Dan Reynolds, Wayne Sermon, Ben McKee & Daniel Platzman'
 *         },
 *         deezer: {
 *             id: 94935176,
 *             readable: true,
 *             title: 'Smoke And Mirrors',
 *             title_short: 'Smoke And Mirrors',
 *             title_version: '',
 *             isrc: 'USUM71417930',
 *             link: 'https://www.deezer.com/track/94935176',
 *             share: 'https://www.deezer.com/track/94935176?utm_source=deezer&utm_content=track-94935176&utm_term=0_1692130309&utm_medium=web',
 *             duration: 260,
 *             track_position: 3,
 *             disk_number: 1,
 *             rank: 289022,
 *             release_date: '2015-02-17',
 *             explicit_lyrics: false,
 *             explicit_content_lyrics: 0,
 *             explicit_content_cover: 0,
 *             preview: 'https://cdns-preview-c.dzcdn.net/stream/c-c263c8223fafa42cd17bf29727050e7c-13.mp3',
 *             bpm: 110,
 *             gain: -8.4,
 *             contributors: [Array],
 *             md5_image: 'f778ecc964c57c30c082444c22bf3264',
 *             artist: [Object],
 *             album: [Object],
 *             type: 'track'
 *         },
 *         spotify: {
 *             album: [Object],
 *             external_ids: [Object],
 *             popularity: 48,
 *             is_playable: null,
 *             linked_from: null,
 *             artists: [Array],
 *             disc_number: 1,
 *             duration_ms: 260906,
 *             explicit: false,
 *             external_urls: [Object],
 *             href: 'https://api.spotify.com/v1/tracks/6Aiu4fCAEzvXpjmy1HsJxM',
 *             id: '6Aiu4fCAEzvXpjmy1HsJxM',
 *             name: 'Smoke And Mirrors',
 *             preview_url: '',
 *             track_number: 3,
 *             uri: 'spotify:track:6Aiu4fCAEzvXpjmy1HsJxM'
 *         }
 *     }
 * }
 */

tracksRouter.post("/release/platforms", authMiddleware, TracksController.getDataFromPlatformsByPreviewUrl);
/**
 * @api {post} /api/tracks/release/platforms Get data from platforms by preview url
 * @apiName Post Get data from platforms by preview url
 * @apiGroup API Track
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiBody {string} previewUrl
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     status: 'success',
 *     result: {
 *         artist: 'Imagine Dragons',
 *         title: 'Smoke And Mirrors',
 *         album: 'Smoke + Mirrors',
 *         release_date: '2015-10-30',
 *         label: 'Kid Ina Korner / Interscope',
 *         timecode: '00:19',
 *         song_link: 'https://lis.tn/jEYODY',
 *         apple_music: {
 *             previews: [Array],
 *             artwork: [Object],
 *             artistName: 'Imagine Dragons',
 *             url: 'https://music.apple.com/us/album/smoke-and-mirrors/1440831203?app=music&at=1000l33QU&i=1440831214&mt=1',
 *             discNumber: 1,
 *             genreNames: [Array],
 *             durationInMillis: 260907,
 *             releaseDate: '2014-09-18',
 *             name: 'Smoke and Mirrors',
 *             isrc: 'USUM71417930',
 *             albumName: 'Smoke + Mirrors (Deluxe)',
 *             playParams: [Object],
 *             trackNumber: 3,
 *             composerName: 'Dan Reynolds, Wayne Sermon, Ben McKee & Daniel Platzman'
 *         },
 *     }
 * }
 */

tracksRouter.put("/settings", authMiddleware, TracksController.editSettings);
/**
 * @api {put} /api/tracks/settings Edit settings of track
 * @apiName Post Edit settings of track
 * @apiGroup API Track
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiQuery {string} uniqueName `with format -> .mp3 / .wav`
 * @apiBody {string}    name
 * @apiBody {string}    type                       `"" or null to set null`
 * @apiBody {number}    position
 * @apiBody {string}    [socialLinks]              `"" or null to set null`
 * @apiBody {string}    [composers]                `"" or null to set null`
 * @apiBody {number}    [duration]
 * @apiBody {string}    [isrc]
 * @apiBody {string}    [lyrics]
 * @apiBody {boolean}   [explicit]                 `Example: true/false`
 * @apiBody {number}    [appleMusicDiscNumber]
 * @apiBody {string}    [spotifyId]
 * @apiBody {string}    [spotifyPreviewUrl]        `"" or null to set null`
 * @apiBody {string}    [timeCode]                 `Example: 00:19, "" or null to set null`
 * @apiBody {string}    [albumSpotifyId]           `albumSpotifyId same values as releaseSpotifyId`
 * @apiBody {string}    [spotifyLink]
 * @apiBody {number}    [evearaPreviewDuration]    `default 15`
 * @apiBody {number}    [evearaPreviewStartAt]     `default 15`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "tracks": {
 *         "id": 23,
 *         "name": "sdfsdfszfsfsf",
 *         "uniqueName": "53745fd5-b8f5-4a2b-ba37-24cb91c8a894.mp3",
 *         "type": null,
 *         "price": "0.000",
 *         "position": 1,
 *         "createdAt": "2023-03-14T08:42:26.000Z",
 *         "updatedAt": "2023-03-14T11:51:02.558Z",
 *         "releaseId": 1
 *     }
 * }
 */

tracksRouter.get("/listen/mp3/:uniqueName", TracksController.listenTrack);
/**
 * @api {get} /api/tracks/listen/mp3/:uniqueName Listen of track
 * @apiName Get Listen of track
 * @apiGroup API Track
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {string} uniqueName `with format -> .mp3 / .wav`
 */

tracksRouter.post("/free/download", authMiddleware, TracksController.downloadTrack);
/**
 * @api {get} /api/tracks/free/download Download track
 * @apiName Download track
 * @apiGroup API Track
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiQuery {string} trackId
 * @apiBody {boolean} [isFree] `true or false`
 * @apiSuccess {String} File `track`
 */

// Admin Router -----------------------------------------------------------------------------------------------------------------------------------------------------------------

tracksRouter.get("/admin/download", authMiddleware, authCheckRoleMiddleware, TracksController.downloadTrackASAdmin);
/**
 * @api {get} /api/tracks/admin/download Admin Download track
 * @apiName Admin Download track
 * @apiGroup API Track
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiQuery {string} trackId
 * @apiSuccess {String} File `track`
 */

tracksRouter.delete("/admin/:trackId", authMiddleware, authCheckRoleMiddleware, TracksController.deleteTrack);
/**
 * @api {delete} /api/tracks/admin/:trackId Admin Delete track
 * @apiName Admin Delete track
 * @apiGroup API Track
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} trackId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "success": true
}
 */

export default tracksRouter;
