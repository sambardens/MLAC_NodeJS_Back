import { Router } from "express";
import ReleaseController from "./release.controller.js";
import authMiddleware from "../auth/auth.middleware.js";
import authCheckRoleMiddleware from "../auth/auth.checkRoleMiddleware.js";

const releaseRouter = new Router();

releaseRouter.post("/:bapId", authMiddleware, ReleaseController.createRelease);
/**
 * @api {post} /api/release/:bapId Create release
 * @apiName Post Create release
 * @apiGroup API Release
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} bapId
 * @apiBody {string} name
 * @apiBody {string} type
 * @apiBody {file} logo
 * @apiBody {string} urlLogo `for upload image from Canva`
 * @apiBody {string} releaseSpotifyId `playlist id in spotify`
 * @apiBody {string} auddSocialLink `from audd`
 * @apiBody {string} [releaseDate]
 * @apiBody {string} [label]
 * @apiBody {string} [designId]
 * @apiBody {string} [mainGenreId]
 * @apiBody {string} [secondaryGenreId]
 * @apiBody {array} [subGenresIds]
 * @apiBody {number} [totalTracks]
 * @apiBody {string} [upc]
 * @apiBody {array}  [copyrights]
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "release": {
 *         "id": 285,
 *         "name": "naame",
 *         "type": "tyypeeee",
 *         "logo": "5287aac8-5843-4b07-939c-a523e7bb42f3.jpg",
 *         "thumbnail": "thumb_5287aac8-5843-4b07-939c-a523e7bb42f3.jpg"
 *         "bapId": "439",
 *         "releaseSpotifyId": "3cEYpjA9oz9GiPac4AsH4n",
 *         "auddSocialLink": "asdasdasd",
 *         "designId": "10",
 *         "totalTracks": 7,
 *         "upc": "615815161",
 *         "copyrights": [
 *             {
 *                 "text": "2023 MONOLIT",
 *                 "type": "C"
 *             }
 *         ],
 *         "updatedAt": "2023-04-14T08:56:00.534Z",
 *         "createdAt": "2023-04-14T08:56:00.534Z"
 *     }
 * }
 */

releaseRouter.get("/:bapId", authMiddleware, ReleaseController.getReleases);
/**
 * @api {get} /api/release/:bapId Get releases
 * @apiName Get Get releases
 * @apiGroup API Release
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} bapId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "releases": [
                {
                    subGenresIds: [ '1', '2' ],
                    id: 2,
                    name: 'First',
                    type: 'tyypeeee',
                    logo: '5287aac8-5843-4b07-939c-a523e7bb42f3.jpg',
                    thumbnail: "thumb_5287aac8-5843-4b07-939c-a523e7bb42f3.jpg"
                    releaseSpotifyId: null,
                    auddSocialLink: null,
                    releaseDate: '2023-06-27',
                    distributeDate: "2023-11-29T10:57:44.000Z",
                    copyrights: [
                        {
                            "text": "2023 MONOLIT",
                            "type": "C"
                        }
                    ],
                    label: 'label',
                    mainGenreId: 1,
                    secondaryGenreId: 1,
                    designId: '2',
                    createdAt: '2023-03-13T16:06:00.000Z',
                    updatedAt: '2023-06-27T14:31:33.000Z',
                    bapId: 74,
                    totalTracks: 7,
                    upc: "5468418158",
                    releasePrice: 0,
                    evearaReleaseId: null,
                    evearaLabelId: null,
                    evearaReleaseLogo: null,
                    appleMusicReleasePriceId: null,
                    appleMusicTrackPriceId: null,
                    amazonReleasePriceId: null,
                    amazonTrackPriceId: null,
                    evearaGenreIds: [
                        1,
                        2
                    ],
                    mainGenere: { id: 1, name: 'Alternative' },
                    secondGeneres: { id: 1, name: 'Alternative' },
                    subGenres: [
                    { id: 1, name: 'Art Punk', mainGenreId: 1 },
                    { id: 2, name: 'Alternative Rock', mainGenreId: 1 }
                    ]
                }
                ]
 * }
 */

releaseRouter.get("/:releaseSpotifyId/tracksStreamingLings", authMiddleware, ReleaseController.getTracksStreamingLinks);
/**
 * @api {get} /api/release/:releaseSpotifyId/tracksStreamingLings Get tracks streaming lings
 * @apiName Get Get tracks streaming lings
 * @apiGroup API Release
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} releaseSpotifyId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "success": true,
    "release": {
        "id": 983,
        "name": "No Roots - Single",
        "allTracksStreamingLinks": [
            {
                "trackName": 123,
                "song_link": "tewtwe",
                "spotifyLink": "frfewrew",
                "spotifyTrackId": 21312412
            }
        ]
    }
}
*/

releaseRouter.put("/:releaseId", authMiddleware, ReleaseController.editRelease);
/**
 * @api {put} /api/release/:releaseId Edit release
 * @apiName Put Edit release
 * @apiGroup API Release
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} releaseId
 * @apiBody {string}    [name]
 * @apiBody {string}    [type]
 * @apiBody {file}      [image]
 * @apiBody {string}    [urlImage]          `For upload image from Canva`
 * @apiBody {string}    [releaseSpotifyId]  `Playlist id in spotify`
 * @apiBody {date}      [releaseDate]
 * @apiBody {date}      [distributeDate]
 * @apiBody {string}    [label]
 * @apiBody {string}    [designId]
 * @apiBody {number}    [totalTracks]
 * @apiBody {string}    [upc]
 * @apiBody {string}    [spotifyUri]
 * @apiBody {string}    [mainGenreId]
 * @apiBody {string}    [secondaryGenreId]
 * @apiBody {array}     [subGenresIds]
 * @apiBody {array}     [copyrights]
 * @apiBody {number}    [releasePrice]
 * @apiBody {array}     [evearaGenreIds] `array of numbers, for example: [1, 2, 3]`
 * @apiBody {array}     [evearaLabelId]
 * @apiBody {number}    [appleMusicReleasePriceId]
 * @apiBody {number}    [appleMusicTrackPriceId]
 * @apiBody {number}    [amazonReleasePriceId]
 * @apiBody {number}    [amazonTrackPriceId]
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "releases": {
 *         "id": 43,
 *         "name": "aaaaa",
 *         "type": "tyypeeee",
 *         "logo": "a79d3c86-5d90-4254-a0e4-5ce63d9a38be.jpg",
 *         "thumbnail": "thumb_5287aac8-5843-4b07-939c-a523e7bb42f3.jpg"
 *         "releaseSpotifyId": "3cEYpjA9oz9GiPac4AsH4n",
 *         "designId": "3",
 *         "totalTracks": "7",
 *         "upc": "561588116",
 *         "evearaGenreIds": [1, 2, 3],
 *         "evearaLabelId": null,
 *         "appleMusicReleasePriceId": null,
 *         "appleMusicTrackPriceId": null,
 *         "amazonReleasePriceId": null,
 *         "amazonTrackPriceId": null,
 *         "createdAt": "2023-03-27T14:46:31.000Z",
 *         "updatedAt": "2023-03-27T14:54:39.555Z",
 *         "bapId": 432
 *     }
 * }
 */

releaseRouter.put("/:releaseSpotifyId/tracksStreamingLings", authMiddleware, ReleaseController.editReleaseAllTracksStreamingLinks);
/**
 * @api {put} /api/release/:releaseSpotifyId/tracksStreamingLings Edit release field allTracksStreamingLinks
 * @apiName Put Edit release field allTracksStreamingLinks
 * @apiGroup API Release
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam    {number} releaseSpotifyId
 * @apiBody     {array} [allTracksStreamingLinks]   `Array of objects. Example: [{trackName: 123, song_link: 'www/songLink', spotifyLink: 'www/spotifyLink', spotifyTrackId: '21312412'} ........] `
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "success": true,
    "release": {
        "id": 983,
        "name": "No Roots - Single",
        "allTracksStreamingLinks": [
            {
                "trackName": 123,
                "song_link": "tewtwe",
                "spotifyLink": "frfewrew",
                "spotifyTrackId": 21312412
            }
        ]
    }
}
 */

//ADMIN ROUTES------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

releaseRouter.get("/admin/all", authMiddleware, authCheckRoleMiddleware, ReleaseController.getAllReleases);
/**
 * @api {get} /api/release/admin/all Admin Get all releases
 * @apiName Get Admin Get all releases
 * @apiGroup API Release
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiQuery {string} orderBy `Example: "id", "name", "createdAt", "type", releaseDate`
 * @apiQuery {string} sortOrder `Example: "ASC", "DESC"`
 * @apiQuery {string} type
 * @apiQuery {string} performer
 * @apiQuery {string} mainGenre
 * @apiQuery {string} subGenres
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "success": true,
    "releases": [
        {
            "subGenresIds": [
                "1",
                "2"
            ],
            "id": 2,
            "name": "First",
            "type": "tyypeeee",
            "logo": null,
            "releaseSpotifyId": null,
            "auddSocialLink": null,
            "releaseDate": "2023-06-27",
            "label": "label",
            "mainGenreId": 1,
            "secondaryGenreId": 1,
            "designId": null,
            "releasesStatus": "ACTIVE",
            "createdAt": "2023-03-13T16:06:00.000Z",
            "updatedAt": "2023-07-28T13:18:50.000Z",
            "bapId": 74,
            "countTracks": 1,
            "mainGenere": {
                "id": 1,
                "name": "Alternative"
            },
            "secondGeneres": {
                "id": 1,
                "name": "Alternative"
            },
            "subGenres": [
                {
                    "id": 1,
                    "name": "Art Punk",
                    "mainGenreId": 1
                },
                {
                    "id": 2,
                    "name": "Alternative Rock",
                    "mainGenreId": 1
                }
            ]
        },
        {
            "subGenresIds": null,
            "id": 3,
            "name": "name",
            "type": "type",
            "logo": null,
            "releaseSpotifyId": null,
            "auddSocialLink": null,
            "releaseDate": null,
            "label": null,
            "mainGenreId": null,
            "secondaryGenreId": null,
            "designId": null,
            "releasesStatus": "ACTIVE",
            "createdAt": "2023-03-14T07:45:32.000Z",
            "updatedAt": "2023-03-14T07:45:32.000Z",
            "bapId": 80,
            "countTracks": 0,
            "mainGenere": null,
            "secondGeneres": null
        },
    ]
}
 */

releaseRouter.get("/admin/:releaseId", authMiddleware, authCheckRoleMiddleware, ReleaseController.getReleaseWithTrack);
/**
 * @api {get} /api/release/admin/:releaseId Admin Get release with track 
 * @apiName Get Admin Get release with track
 * @apiGroup API Release
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} releaseId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "success": true,
    "releases": {
        "id": 2,
        "name": "First",
        "type": "tyypeeee",
        "logo": null,
        "bapName": "dfsf",
        "tracks": [
            {
                "id": 59,
                "name": "sdfdsfasdasd",
                "uniqueName": "52a5d11a-3ef5-4887-ac20-10397da8a917.mp3",
                "type": null,
                "price": "0.000",
                "info": "{\"status\":\"success\",\"result\":{\"artist\":\"Eminem\",\"title\":\"Lose Yourself\",\"album\":\"8 Mile\",\"release_date\":\"2002-01-01\",\"label\":\"Universal Music\",\"timecode\":\"05:18\",\"song_link\":\"https://lis.tn/LoseYourself\"},\"preview\":\"https://p.scdn.co/mp3-preview/03b89cd457ff6f50e839a01873511b48e54c9c12?cid=e44e7b8278114c7db211c00ea273ac69\"}",
                "position": 100,
                "createdAt": "2023-03-17T08:29:31.000Z",
                "updatedAt": "2023-03-17T08:29:31.000Z",
                "releaseId": 2,
                "bapId": null
            }
        ]
    }
}
*/

releaseRouter.get("/filter/uniqueFields", authMiddleware, authCheckRoleMiddleware, ReleaseController.uniqueFields);
/**
 * @api {get} /api/release/filter/uniqueFields Get unique fields for relases
 * @apiName Get Get unique fields for relases
 * @apiGroup API Filter
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
        "uniqueFields": {
                "releaseTypes": [
                    "tyypeeee",
                    "type",
                    "typeName306416"
                ],
                "performers": [
                    "king",
                    "@mail.com885834686",
                    "babName359309951"
                ],
                "genres": [
                    "Alternative",
                    "Anime",
                    "Blues"
                ],
                "subGenres": [
                    "Art Punk",
                    "Alternative Rock",
                    "Britpunk"
                ]
        }
    }
 */

releaseRouter.delete("/admin/:releaseId", authMiddleware, authCheckRoleMiddleware, ReleaseController.deleteRelease);
/**
 * @api {delete} /api/release/admin/:releaseId Admin Delete release
 * @apiName Delete Admin Delete release
 * @apiGroup API Release
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} releaseId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "success": true,
}
 */

releaseRouter.put("/admin/:releaseId", authMiddleware, authCheckRoleMiddleware, ReleaseController.updateReleaseAsAdmin);
/**
 * @api {put} /api/release/admin/:releaseId Admin Update release
 * @apiName Put Admin Update release
 * @apiGroup API Release
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} releaseId
 * @apiBody {string} [releasesStatus] `ACTIVE or HIDDEN`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "success": true,
}
 */

export default releaseRouter;
