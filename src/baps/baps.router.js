import { Router } from "express";
import BapsController from "./baps.controller.js";
import authMiddleware from "../auth/auth.middleware.js";
import checkRoleMiddleware from "../auth/auth.checkRoleMiddleware.js";

const bapsRouter = new Router();

bapsRouter.post("/", authMiddleware, BapsController.createBap);

/**
 * @api {post} /api/baps/ Create bap
 * @apiName Post Create bap
 * @apiGroup API Bap
 * @apiBody {string} name
 * @apiBody {string} role
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "bap": {
 *         "id": 12,
 *         "name": "sfsdf",
 *         "role": "qwe",
 *         "creatorId": 2,
 *         "updatedAt": "2023-03-03T16:02:23.354Z",
 *         "createdAt": "2023-03-03T16:02:23.354Z"
 *     }
 * }
 */

bapsRouter.get("/", authMiddleware, BapsController.getAllBaps);

/**
 * @api {get} /api/baps/ Get all baps
 * @apiName Get Get all baps
 * @apiGroup API Bap
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
 *     "baps": [
 *         {
 *             "bapId": 1038,
 *             "bapName": "sas",
 *             "bapAvatar": "https://i.scdn.co/image/adasdasdasd",
 *             "thumbnail": "thumb_24540144-3c9d-44f9-b922-85498c639de1.jpg"
 *             "bapDescription": "change",
 *             "bapArtistBio": null,
 *             "designId": "123",
 *             "napsterId": null,
 *             "deezerId": null,
 *             "appleMusicId": null,
 *             "spotifyUri": null,
 *             "evearaBapId": null,
 *             "country": ukraine
 *         },
 *         {
 *             "bapId": 974,
 *             "bapName": "zsdfzsdfzsdf",
 *             "bapAvatar": null,
 *             "thumbnail": "thumb_24540144-3c9d-44f9-b922-85498c639de1.jpg"
 *             "bapDescription": null,
 *             "bapArtistBio": null,
 *             "designId": null,
 *             "facebookPixel": null,
 *             "napsterId": null,
 *             "deezerId": null,
 *             "appleMusicId": null,
 *             "spotifyUri": null,
 *             "evearaBapId": null,
 *             "country": null
 *         }
 *     ]
 * }
 */

bapsRouter.put("/info/:bapId", authMiddleware, BapsController.editBap);
/**
 * @api {put} /api/baps/info/:bapId Edit info of bap
 * @apiName Post Edit info of bap
 * @apiGroup API Bap
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} bapId
 * @apiBody {string} [name]
 * @apiBody {string} [description]
 * @apiBody {string} [artist_bio]
 * @apiBody {string} [designId] `id of image from canva`
 * @apiBody {string} [urlAvatar] `url to image from spotify / this field or avatar`
 * @apiBody {number} [facebookPixel]
 * @apiBody {string} [spotifyId]
 * @apiBody {files} [avatar]
 * @apiBody {string} [napsterId]
 * @apiBody {string} [deezerId]
 * @apiBody {string} [appleMusicId]
 * @apiBody {string} [soundCloudId]
 * @apiBody {string} [spotifyUri]
 * @apiBody {string} [country]
 * @apiBody {string} [evearaBapId]
 * @apiBody {string} [removeAvatar] `"true" - to delete avatar`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "bap": {
 *         "id": 11,
 *         "name": "sas",
 *         "description": "chan123ge",
 *         "artist_bio": "sss",
 *         "avatar": null,
 *         "role": "qwe",
 *         "designId": null,
 *         "facebookPixel": null,
 *         "spotifyId": null,
 *         "napsterId": "2345",
 *         "deezerId": "6565165",
 *         "appleMusicId": null,
 *         "soundCloudId": null,
 *         "spotifyUri": null,
 *         "evearaBapId": "23",
 *         "country": "Ukraine",
 *         "thumbnail": "thumb_24540144-3c9d-44f9-b922-85498c639de1.jpg",
 *         "createdAt": "2023-03-03T15:51:15.000Z",
 *         "updatedAt": "2023-03-06T13:23:28.236Z",
 *         "creatorId": 2
 *     }
 * }
 */

bapsRouter.get("/spotify/:artistId", authMiddleware, BapsController.getArtistFromSpotifyById);
/**
 * @api {get} /api/baps/spotify/:artistId Get artist from Spotify by id
 * @apiName Get artist from Spotify by id
 * @apiGroup API Bap
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} artistId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "artist": {
 *         "external_urls": {
 *             "spotify": "https://open.spotify.com/artist/2LRoIwlKmHjgvigdNGBHNo"
 *         },
 *         "followers": {
 *             "href": null,
 *             "total": 6859765
 *         },
 *         "genres": [
 *             "colombian pop",
 *             "pop reggaeton",
 *             "reggaeton colombiano",
 *             "trap latino",
 *             "urbano latino"
 *         ],
 *         "href": "https://api.spotify.com/v1/artists/2LRoIwlKmHjgvigdNGBHNo",
 *         "id": "2LRoIwlKmHjgvigdNGBHNo",
 *         "images": [
 *             {
 *                 "height": 640,
 *                 "url": "https://i.scdn.co/image/ab6761610000e5ebba48bd734c25b2d41de6d099",
 *                 "width": 640
 *             },
 *             {
 *                 "height": 320,
 *                 "url": "https://i.scdn.co/image/ab67616100005174ba48bd734c25b2d41de6d099",
 *                 "width": 320
 *             },
 *             {
 *                 "height": 160,
 *                 "url": "https://i.scdn.co/image/ab6761610000f178ba48bd734c25b2d41de6d099",
 *                 "width": 160
 *             }
 *         ],
 *         "name": "Feid",
 *         "popularity": 89,
 *         "type": "artist",
 *         "uri": "spotify:artist:2LRoIwlKmHjgvigdNGBHNo"
 *     }
 * }
 */

bapsRouter.post("/invite/:bapId", authMiddleware, BapsController.sendInviteBap);

/**
 * @api {post} /api/baps/invite/:bapId Send invite to bap
 * @apiName Post Send invite to bap
 * @apiGroup API Bap
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} bapId
 * @apiBody {string} email
 * @apiBody {string} role
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "notification": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZW5kZXJJZCI6NCwiYmFwSWQiOiI3ODQiLCJyb2xlIjoic2RmZHNlZiIsInR5cGVOb3RpZmljYXRpb25JZCI6MSwiaWF0IjoxNjgxNzI0NDc0LCJleHAiOjE2ODQzMTY0NzR9.0Eg5SimOQU2jNhwbbs6AclHVXQbIe-EHCOh4eUmNV68"
 * }
 */

bapsRouter.put("/admin/:bapId", authMiddleware, BapsController.setPermissionBap);

/**
 * @api {put} /api/baps/admin/:bapId Set permission of user on bap
 * @apiName Put Set permission of user on bap
 * @apiGroup API Bap
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} bapId
 * @apiBody {string} userId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "member": {
 *         "id": 416,
 *         "isFullAdmin": true,
 *         "role": "role",
 *         "createdAt": "2023-04-07T12:22:07.000Z",
 *         "updatedAt": "2023-04-07T12:24:55.547Z",
 *         "userId": 533,
 *         "bapId": 715,
 *         "notificationId": 485
 *     }
 * }
 */

bapsRouter.get("/members/:bapId", authMiddleware, BapsController.getMembers);
/**
 * @api {get} /api/baps/members/:bapId Get members of bap
 * @apiName Ge Get members of bap
 * @apiGroup API Bap
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
 *     "members": [
 *         {
 *             "userId": 4,
 *             "firstName": "SASHA",
 *             "lastName": "qwe",
 *             "email": "sname.parser123@gmail.com",
 *             "bapId": 370,
 *             "avatar": "28169604-e36e-47aa-a30d-3138f14e0b1e.jpg",
 *             "role": "sfdsfsdf",
 *             "uuidEveara": null,
 *             "thumbnail": "thumb_24540144-3c9d-44f9-b922-85498c639de1.jpg",
 *             "isFullAdmin": 0
 *         },
 *         {
 *             "userId": 269,
 *             "firstName": "Lelah",
 *             "lastName": "Braun",
 *             "email": "848799261@mail.com",
 *             "bapId": 370,
 *             "avatar": null,
 *             "role": "qwe",
 *             "uuidEveara": null,
 *             "thumbnail": "thumb_24540144-3c9d-44f9-b922-85498c639de1.jpg",
 *             "isCreator": true,
 *             "isFullAdmin": 1
 *         }
 *     ]
 * }
 */

bapsRouter.delete("/confirm/", authMiddleware, BapsController.confirmDeletionBap);

/**
 * @api {delete} /api/baps/confirm/ Confirm deletion bap (ONLY FOR BAP WITH ONE USER)
 * @apiName Delete Confirm deletion bap
 * @apiGroup API Bap
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiQuery {string} token `from Apply to deletion bap`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true
 * }
 */

bapsRouter.delete("/:bapId", authMiddleware, BapsController.tryDeletionBap);

/**
 * @api {delete} /api/baps/:bapId Apply to deletion bap
 * @apiName Delete Apply to deletion bap
 * @apiGroup API Bap
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} bapId
 * @apiBody {string} [emailFutureCreator] `ONLY FOR BAP WITH MULTIPLY USER`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImVtYWlsIjoic25hbWUucGFyc2VyMTIzQGdtYWlsLmNvbSIsImJhcElkIjoiOTE1IiwiYWxsVXNlcnMiOmZhbHNlLCJpYXQiOjE2ODIwMTYzMzYsImV4cCI6MTY4NDYwODMzNn0.A88yFC11bGze8BLSVl8lsDrhRAJQn3RSJ79ZFJYJYIA"
 * }
 */

bapsRouter.get("/future", authMiddleware, BapsController.acceptToBeFutureCreator);

/**
 * @api {get} /api/baps/future Accept to be future creator of bap
 * @apiName Get Accept to be future creator of bap
 * @apiGroup API Bap
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiQuery {number} token
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "futureCreator": {
 *         "id": 916,
 *         "name": "zsdfzsdfzsdf",
 *         "description": null,
 *         "artist_bio": null,
 *         "avatar": null,
 *         "role": "qwe",
 *         "createdAt": "2023-04-20T18:49:33.000Z",
 *         "updatedAt": "2023-04-20T18:54:23.929Z",
 *         "creatorId": 611
 *     }
 * }
 */

//ADMIN ROUTES------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

bapsRouter.get("/all", authMiddleware, checkRoleMiddleware, BapsController.getAllBapsAsAdmin);

/**
 * @api {get} /api/baps/all Admin Get all baps
 * @apiName Get Admin Get all baps
 * @apiGroup API Bap
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 {
    "success": true,
    "baps": {
        "id": 1707,
        "name": "Topic",
        "description": null,
        "artist_bio": null,
        "avatar": "7cb20418-bd08-4874-9426-c34c3b61ac5c.jpg",
        "role": "Artist/Band member",
        "designId": null,
        "mainGenereId": 1,
        "secondGenereId": null,
        "facebookPixel": null,
        "spotifyId": "0u6GtibW46tFX7koQ6uNJZ",
        "thumbnail": null,
        "bapStatus": "ACTIVE",
        "createdAt": "2023-07-24T11:28:06.000Z",
        "updatedAt": "2023-07-24T11:28:33.000Z",
        "creatorId": 1254
    }
 }
 */

bapsRouter.get("/detail/:bapId", authMiddleware, checkRoleMiddleware, BapsController.getBapsDetailAsAdmin);

/**
 * @api {get} /api/baps/detail/:bapId Admin Get baps detail
 * @apiName Get Admin Get baps detail
 * @apiGroup API Bap
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} bapId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 {
    "success": true,
        "baps": [
            {
            "id": 12,
            "name": "sfsdf",
            "bapStatus": "ACTIVE",
            "countMembers": 2,
            "countReleases": 0
            },
            {
                "id": 13,
                "name": "sas",
                "bapStatus": "ACTIVE",
                "countMembers": 18,
                "countReleases": 0
            },
    *     ]
    * }
    */

bapsRouter.get("/allMembers/:bapId", authMiddleware, checkRoleMiddleware, BapsController.getMembersAsAdmin);
/**
 * @api {get} /api/baps/allMembers/:bapId Admin Get members of bap
 * @apiName Get Admin Get members of bap
 * @apiGroup API Bap
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} bapId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "success": true,
    "members": [
        {
            "id": 753,
            "role": "Artist/Band member",
            "userId": 1239,
            "firstName": "Дмитрий",
            "lastName": "Кашуба",
            "email": "dmitrij.kashuba@gmail.com",
            "accountStatus": "ACTIVE"
        },
        {
            "id": null,
            "role": "creator",
            "userId": 1254,
            "firstName": "Advocate10",
            "lastName": "test",
            "email": "advocate101234567@gmail.com",
            "accountStatus": "ACTIVE"
        }
    ]
}
 */

bapsRouter.get("/releases/:bapId", authMiddleware, checkRoleMiddleware, BapsController.getReleasesAsAdmin);
/**
 * @api {get} /api/baps/releases/:bapId Admin Get releases of bap
 * @apiName Get Admin Get releases of bap
 * @apiGroup API Bap
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} bapId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "success": true,
    "baps": [
        {
            "id": 505,
            "name": "New",
            "type": "Single",
            "logo": "c5d6aa6c-808b-482d-9662-80f1f0e87c86.jpg"
        }
    ]
}
 */

bapsRouter.put("/update/:bapId", authMiddleware, checkRoleMiddleware, BapsController.updateBapAsAdmin);
/**
 * @api {put} /api/baps/update/:bapId Admin Update bap
 * @apiName Put Admin Update bap
 * @apiGroup API Bap
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} bapId
 * @apiBody {string} [name]
 * @apiBody {string} [description]
 * @apiBody {string} [artist_bio]
 * @apiBody {string} [bapStatus] `ACTIVE OR HIDDEN`
 * @apiBody {string} [designId] `id of image from canva`
 * @apiBody {string} [urlAvatar] `url to image from spotify / this field or avatar`
 * @apiBody {number} [facebookPixel]
 * @apiBody {string} [spotifyId]
 * @apiBody {files} [avatar]
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "success": true,
    "bap": {
        "id": 1597,
        "name": "Author",
        "description": null,
        "artist_bio": null,
        "avatar": null,
        "role": "Admin",
        "designId": null,
        "mainGenereId": null,
        "secondGenereId": null,
        "facebookPixel": null,
        "spotifyId": "sadasd134123",
        "thumbnail": "thumb_null",
        "bapStatus": "ACTIVE",
        "createdAt": "2023-06-27T12:37:59.000Z",
        "updatedAt": "2023-07-26T18:39:11.000Z",
        "creatorId": 1156
    }
}
 */

bapsRouter.delete("/admin/:bapId", authMiddleware, checkRoleMiddleware, BapsController.deleteBaps);
/**
 * @api {delete} /api/baps/admin/:bapId Admin Delete bap by id
 * @apiName Delete Admin Delete bap by id
 * @apiGroup API Bap
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} bapId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "success": true,
}
 */

export default bapsRouter;
