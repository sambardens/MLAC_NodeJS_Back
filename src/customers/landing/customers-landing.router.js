import {Router} from "express";
import CustomersLandingController from "./customers-landing.controller.js";
import authMiddleware from "../../auth/auth.middleware.js";

const customersLandingRouter = new Router()

customersLandingRouter.post('/basket/:landingPageId', authMiddleware, CustomersLandingController.addTrackToBasket)
/**
 * @api {post} /api/customers/landing/page/basket/:landingPageId Add track to basket
 * @apiName Post Add track to basket
 * @apiGroup API Customers-Landing
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} landingPageId
 * @apiBody {array} trackIds `[1, 2, 3, 4, 5, 6]`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true
 * }
 */

customersLandingRouter.delete('/basket/:landingPageId', authMiddleware, CustomersLandingController.removeTrackFromBasket)
/**
 * @api {delete} /api/customers/landing/page/basket/:landingPageId Remove track from basket
 * @apiName Delete Remove track from basket
 * @apiGroup API Customers-Landing
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} landingPageId
 * @apiBody {number} trackId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true
 * }
 */

customersLandingRouter.get('/basket/:landingPageId', authMiddleware, CustomersLandingController.getTracksFromBasket)
/**
 * @api {get} /api/customers/landing/page/basket/:landingPageId Get tracks from basket
 * @apiName Get Get tracks from basket
 * @apiGroup API Customers-Landing
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} landingPageId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 {
    "success": true,
    "tracks": [
        {
            "track": {
                "id": 2575,
                "name": "Charlie Brown",
                "uniqueName": "c4b829c4-3be2-4b66-b286-d09cc342a039.mp3",
                "preview": "cut_c4b829c4-3be2-4b66-b286-d09cc342a039.mp3",
                "originalName": "c4b829c4-3be2-4b66-b286-d09cc342a039.mp3",
                "type": null,
                "price": "10.000",
                "info": {
                    "status": "success",
                    "result": {
                        "artist": "Alice Merton",
                        "title": "Charlie Brown",
                        "album": "Charlie Brown",
                        "release_date": "2023-06-16",
                        "label": "Paper Plane Records International",
                        "timecode": "00:09",
                        "song_link": "https://lis.tn/tbFtkq",
                        "apple_music": {
                            "previews": [
                                {
                                    "url": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/7b/12/dd/7b12dd53-df3a-6186-3c9e-05f22bba3442/mzaf_13455979570281027305.plus.aac.p.m4a"
                                }
                            ],
                            "artwork": {
                                "width": 3000,
                                "height": 3000,
                                "url": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/6d/03/31/6d03311f-e804-bb9a-c563-a0c95c4f9f45/cover_4251917100987.jpg/{w}x{h}bb.jpg",
                                "bgColor": "fec200",
                                "textColor1": "130400",
                                "textColor2": "432413",
                                "textColor3": "422a00",
                                "textColor4": "68430f"
                            },
                            "artistName": "Alice Merton",
                            "url": "https://music.apple.com/us/album/charlie-brown/1690605786?app=music&at=1000l33QU&i=1690605787&mt=1",
                            "discNumber": 1,
                            "genreNames": [
                                "Indie Pop",
                                "Music",
                                "Alternative"
                            ],
                            "durationInMillis": 169893,
                            "releaseDate": "2023-06-16",
                            "name": "Charlie Brown",
                            "isrc": "DEVQ72300003",
                            "albumName": "Charlie Brown - Single",
                            "playParams": {
                                "id": "1690605787",
                                "kind": "song"
                            },
                            "trackNumber": 1,
                            "composerName": "Alice Merton, Christopher Wood, Matt Wills & William Farquarson"
                        },
                        "spotify": {
                            "album": {
                                "name": "Charlie Brown",
                                "artists": [
                                    {
                                        "name": "Alice Merton",
                                        "id": "7f0OLhGgBMX9fUjm1dcPip",
                                        "uri": "spotify:artist:7f0OLhGgBMX9fUjm1dcPip",
                                        "href": "https://api.spotify.com/v1/artists/7f0OLhGgBMX9fUjm1dcPip",
                                        "external_urls": {
                                            "spotify": "https://open.spotify.com/artist/7f0OLhGgBMX9fUjm1dcPip"
                                        }
                                    }
                                ],
                                "album_group": "",
                                "album_type": "single",
                                "id": "3vLHtJNQIxQJCQqcFE2d78",
                                "uri": "spotify:album:3vLHtJNQIxQJCQqcFE2d78",
                                "href": "https://api.spotify.com/v1/albums/3vLHtJNQIxQJCQqcFE2d78",
                                "images": [
                                    {
                                        "height": 640,
                                        "width": 640,
                                        "url": "https://i.scdn.co/image/ab67616d0000b27365dc0efa74bdb63e31b05ddf"
                                    },
                                    {
                                        "height": 300,
                                        "width": 300,
                                        "url": "https://i.scdn.co/image/ab67616d00001e0265dc0efa74bdb63e31b05ddf"
                                    },
                                    {
                                        "height": 64,
                                        "width": 64,
                                        "url": "https://i.scdn.co/image/ab67616d0000485165dc0efa74bdb63e31b05ddf"
                                    }
                                ],
                                "external_urls": {
                                    "spotify": "https://open.spotify.com/album/3vLHtJNQIxQJCQqcFE2d78"
                                },
                                "release_date": "2023-06-16",
                                "release_date_precision": "day"
                            },
                            "external_ids": {
                                "isrc": "DEVQ72300003"
                            },
                            "popularity": 43,
                            "is_playable": null,
                            "linked_from": null,
                            "artists": [
                                {
                                    "name": "Alice Merton",
                                    "id": "7f0OLhGgBMX9fUjm1dcPip",
                                    "uri": "spotify:artist:7f0OLhGgBMX9fUjm1dcPip",
                                    "href": "https://api.spotify.com/v1/artists/7f0OLhGgBMX9fUjm1dcPip",
                                    "external_urls": {
                                        "spotify": "https://open.spotify.com/artist/7f0OLhGgBMX9fUjm1dcPip"
                                    }
                                }
                            ],
                            "disc_number": 1,
                            "duration_ms": 169893,
                            "explicit": false,
                            "external_urls": {
                                "spotify": "https://open.spotify.com/track/16WnxfT3YRRQP6CA10CFcm"
                            },
                            "href": "https://api.spotify.com/v1/tracks/16WnxfT3YRRQP6CA10CFcm",
                            "id": "16WnxfT3YRRQP6CA10CFcm",
                            "name": "Charlie Brown",
                            "preview_url": "https://p.scdn.co/mp3-preview/b1e18feefdeec307afcb1a6bfb690701c52b0c44?cid=e44e7b8278114c7db211c00ea273ac69",
                            "track_number": 1,
                            "uri": "spotify:track:16WnxfT3YRRQP6CA10CFcm"
                        }
                    },
                    "preview": "https://p.scdn.co/mp3-preview/b1e18feefdeec307afcb1a6bfb690701c52b0c44?cid=e44e7b8278114c7db211c00ea273ac69"
                },
                "position": 1,
                "socialLinks": "https://lis.tn/tbFtkq",
                "composers": "Alice Merton, Christopher Wood, Matt Wills, William Farquarson",
                "duration": 169893,
                "discNumber": 1,
                "isrc": "DEVQ72300003",
                "lyrics": "0",
                "spotifyId": "16WnxfT3YRRQP6CA10CFcm",
                "spotifyPreviewUrl": "https://p.scdn.co/mp3-preview/b1e18feefdeec307afcb1a6bfb690701c52b0c44?cid=e44e7b8278114c7db211c00ea273ac69",
                "timeCode": "00:09",
                "albumSpotifyId": "3vLHtJNQIxQJCQqcFE2d78",
                "explicit": false,
                "spotifyLink": "https://open.spotify.com/track/16WnxfT3YRRQP6CA10CFcm",
                "createdAt": "2023-09-04T14:18:46.000Z",
                "updatedAt": "2023-09-05T09:49:20.000Z",
                "releaseId": 992,
                "bapId": 1811
            }
        }
    ]
}
 */

export default customersLandingRouter