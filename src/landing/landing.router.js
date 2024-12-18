import { Router } from "express";
import LandingController from "./landing.controller.js";
import authMiddleware from "../auth/auth.middleware.js";

const landingRouter = new Router();

landingRouter.post("/page/:releaseId", authMiddleware, LandingController.createLandingPage);
/**
 * @api {post} /api/landing/page/:releaseId Create landing page
 * @apiName Post Create landing page
 * @apiGroup API Landing
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} releaseId
 * @apiBody {string} name
 * @apiBody {string} facebookPixel
 * @apiBody {string} metaTitle
 * @apiBody {string} metaDescription
 * @apiBody {number} webpagesTypeId
 * @apiBody {number} backgroundBlur `0 <= x <= 100`
 * @apiBody {string} urlFavicon
 * @apiBody {string} urlLogo
 * @apiBody {string} [trackIdForStreaming] `only for webpagesTypeId 3`
 * @apiBody {files} favicon
 * @apiBody {files} logo
 * @apiBody {boolean} [showSocialLinks]
 * @apiBody {string} [socialLinksType] `must be a 'white', 'black' or 'colour'`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "landingPage": {
 *         "id": 13,
 *         "name": "123123",
 *         "releaseId": "400",
 *         "webpagesTypeId": 3,
 *         "trackIdForStreaming": "2222",
 *         "updatedAt": "2023-05-10T14:10:34.402Z",
 *         "createdAt": "2023-05-10T14:10:34.402Z",
 *         "backgroundBlur": 100,
 *         "showSocialLinks": false,
 *         "socialLinksType": "white",
 *         "releaseFullInfo": {
 *             "id": 400,
 *             "name": "Brand Kit",
 *             "type": "Standard-album",
 *             "logo": null,
 *             "createdAt": "2023-05-09T10:02:24.000Z",
 *             "updatedAt": "2023-05-09T10:02:24.000Z",
 *             "bapId": 1243,
 *             "description": null,
 *             "artist_bio": null,
 *             "avatar": null,
 *             "role": "Artist/Band member",
 *             "designId": null,
 *             "facebookPixel": 0,
 *             "creatorId": 410,
 *             "paletteName": "New palette",
 *             "tracks": [
 *                 {
 *                     "id": 784,
 *                     "uniqueName": "2ef3e687-468b-4987-b1bb-c58f35bd179d.mp3"
 *                 },
 *                 {
 *                     "id": 785,
 *                     "uniqueName": "c45ab78c-bc9b-44ad-a2ea-92633e1cb6eb.mp3"
 *                 }
 *             ]
 *         }
 *     }
 * }
 */

landingRouter.get("/page/", LandingController.getLandingPage);
/**
 * @api {get} /api/landing/page/ Get landing page
 * @apiName Get Get landing page
 * @apiGroup API Landing
 * @apiQuery {number} [id] `you must enter only one param. id || name`
 * @apiQuery {string} [name] `you must enter only one param. id || name`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "landingPage": {
 *         "id": 1,
 *         "name": "ggggооо",
 *         "favicon": "0892bbc0-697f-408c-8fde-b7666b76ccef.jpg",
 *         "logo": null,
 *         "metaTitle": "asd",
 *         "metaDescription": "description333",
 *         "facebookPixel": "pixel1111",
 *         "backgroundBlur": 29,
 *         "releaseId": 470,
 *         "webpagesTypeId": 1,
 *         "trackIdForStreaming": null,
 *         "bapName": "Image",
 *         "releaseName": "jyrfmrymrymry",
 *         "releaseLogo": "https://export-download.canva.com/lvAf8/DAFkAOlvAf8/2/0/0001-5508870526.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHKNGJLC2J7OGJ6Q%2F20230526%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230526T010218Z&X-Amz-Expires=34687&X-Amz-Signature=ce31d721e114fda2158980d1514b1719e368142f18f398f0da68540086f5ddef&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%2A%3DUTF-8%27%27%25D0%2594%25D0%25B8%25D0%25B7%25D0%25B0%25D0%25B9%25D0%25BD%2520%25D0%25B1%25D0%25B5%25D0%25B7%2520%25D0%25BD%25D0%25B0%25D0%25B7%25D0%25B2%25D0%25B0%25D0%25BD%25D0%25B8%25D1%258F.png&response-expires=Fri%2C%2026%20May%202023%2010%3A40%3A25%20GMT",
 *         "sumPriceTracks": 12,
 *         "showSocialLinks": false,
 *         "socialLinksType": "white",
 *         "tracks": [
 *             {
 *                 "id": 930,
 *                 "name": "qwertyuiop",
 *                 "uniqueName": "7053418a-c25e-4f83-a203-52944e075702.mp3",
 *                 "price": "7.000",
 *                 "info": {
 *                     "status": "success",
 *                     "result": {
 *                         "artist": "Eminem",
 *                         "title": "Lose Yourself",
 *                         "album": "8 Mile",
 *                         "release_date": "2002-01-01",
 *                         "label": "Universal Music",
 *                         "timecode": "05:18",
 *                         "song_link": "https://lis.tn/LoseYourself"
 *                     },
 *                     "preview": "https://p.scdn.co/mp3-preview/03b89cd457ff6f50e839a01873511b48e54c9c12?cid=e44e7b8278114c7db211c00ea273ac69"
 *                 }
 *             }
 *         ],
 *         "design": [
 *             {
 *                 "id": 1,
 *                 "hex": "#abcabc",
 *                 "font": "sdfdsf",
 *                 "size": 12,
 *                 "italic": 123,
 *                 "weight": 123,
 *                 "createdAt": "2023-05-31T11:57:52.000Z",
 *                 "updatedAt": "2023-05-31T11:57:52.000Z",
 *                 "landingDesignTypeId": null,
 *                 "landingPageId": 1
 *             },
 *         ],
 *         "socialLinks": [
 *             {
 *                 "id": 64,
 *                 "link": "first",
 *                 "position": 1,
 *                 "createdAt": "2023-08-24T15:27:54.000Z",
 *                 "updatedAt": "2023-08-24T15:27:54.000Z",
 *                 "landingPageId": 153
 *             }
 *         ],
 *         "streamingLinks": [
 *             {
 *                 "id": 33,
 *                 "link": "first",
 *                 "position": 1,
 *                 "createdAt": "2023-08-24T15:27:54.000Z",
 *                 "updatedAt": "2023-08-24T15:27:54.000Z",
 *                 "landingPageId": 153
 *             }
 *         ]
 *     }
 * }
 */

landingRouter.get("/linkName", LandingController.getLandingPageName);
/**
 * @api {get} /api/landing/linkName Get landing page names
 * @apiName Get Get landing page names
 * @apiGroup API SEO
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "landings": [
 *         "aaaa",
 *         "bbbb",
 *         "cccc",
 *         "dddd",
 *         "eeee",
 *         "shop1"
 *     ]
 * }
 */

landingRouter.put("/page/:landingPageId", authMiddleware, LandingController.editLandingPage);
/**
 * @api {put} /api/landing/page/:landingPageId Edit landing page
 * @apiName Put Edit landing page
 * @apiGroup API Landing
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} landingPageId
 * @apiBody {string} name
 * @apiBody {string} facebookPixel `if the string is empty, then the field is set to null`
 * @apiBody {string} metaTitle `if the string is empty, then the field is set to null`
 * @apiBody {string} metaDescription `if the string is empty, then the field is set to null`
 * @apiBody {string} [trackIdForStreaming] `only for webpagesTypeId 3, "" - for set null`
 * @apiBody {number} backgroundBlur `0 <= x <= 100`
 * @apiBody {string} urlFavicon
 * @apiBody {string} urlLogo
 * @apiBody {files} favicon
 * @apiBody {files} logo
 * @apiBody {boolean} [showSocialLinks]
 * @apiBody {string} [socialLinksType] `must be a 'white', 'black' or 'colour'`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "landingPage": {
 *         "id": 13,
 *         "name": "123123",
 *         "favicon": null,
 *         "releaseId": 400,
 *         "webpagesTypeId": 3,
 *         "trackIdForStreaming": "2222",
 *         "sumPriceTracks": 173,
 *         "backgroundBlur": 100,
 *         "showSocialLinks": false,
 *         "socialLinksType": "white",
 *         "tracks": [
 *             {
 *                 "id": 784,
 *                 "uniqueName": "2ef3e687-468b-4987-b1bb-c58f35bd179d.mp3",
 *                 "price": 123
 *             },
 *             {
 *                 "id": 785,
 *                 "uniqueName": "c45ab78c-bc9b-44ad-a2ea-92633e1cb6eb.mp3",
 *                 "price": 50
 *             }
 *         ]
 *     }
 * }
 */

landingRouter.get("/pages/", authMiddleware, LandingController.getLandingPages);
/**
 * @api {get} /api/landing/pages/ Get landing pages
 * @apiName Get Get landing pages
 * @apiGroup API Landing
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiQuery {number} [bapId] `you must enter only one param. bapId || releaseId`
 * @apiQuery {number} [releaseId] `you must enter only one param. bapId || releaseId`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "landingPage": [
 *         {
 *             "id": 3,
 *             "name": "123123",
 *             "favicon": null,
 *             "createdAt": "2023-05-09T08:44:04.000Z",
 *             "updatedAt": "2023-05-09T08:44:04.000Z",
 *             "releaseId": 400,
 *             "releaseLogo": "eea71804-44e6-425f-8660-c8da4680a4b4.jpg",
 *             "releaseThumbnail": "thumb_eea71804-44e6-425f-8660-c8da4680a4b4.jpg",
 *             "webpagesTypeId": 3,
 *             "trackIdForStreaming": "2222",
 *             "type": "Standard-album",
 *             "logo": null,
 *             "releaseSpotifyId": null,
 *             "bapId": 1243,
 *             "shopId": null,
 *             "description": "Landing page where you can place links to the release on streaming services\n\n\n",
 *             "webpagesTypeName": "Streaming links"
 *         }
 *     ]
 * }
 */

landingRouter.post("/design/", LandingController.addDesign);
/**
 * @api {post} /api/landing/design/ Add design to landing
 * @apiName POST Add design to landing
 * @apiGroup API Landing
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiQuery {number} landingPageId
 * @apiBody {string} font
 * @apiBody {string} hex
 * @apiBody {number} size
 * @apiBody {number} italic
 * @apiBody {number} weight
 * @apiBody {number} landingDesignTypeId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "design": {
 *         "id": 1,
 *         "landingPageId": "1",
 *         "hex": "#abcabc",
 *         "font": "sdfdsf",
 *         "size": 12,
 *         "italic": 123,
 *         "weight": 123,
 *         "updatedAt": "2023-05-31T11:57:52.436Z",
 *         "createdAt": "2023-05-31T11:57:52.436Z"
 *     }
 * }
 */

landingRouter.delete("/design", LandingController.removeDesign);
/**
 * @api {delete} /api/landing/design Remove design of landing page by id
 * @apiName Delete Remove design of landing page by id
 * @apiGroup API Landing
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiQuery {number} landingPageId
 * @apiQuery {number} designId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true
 * }
 */

landingRouter.delete("/page/:landingPageId", LandingController.removeLandingPage);
/**
 * @api {delete} /api/landing/page/:landingPageId Remove landing page by id
 * @apiName Delete Remove landing page by id
 * @apiGroup API Landing
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} landingPageId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true
 * }
 */

landingRouter.post("/page/social/:landingPageId", LandingController.addSocialLinks);
/**
 * @api {post} /api/landing/page/:landingPageId Add social links to landing page
 * @apiName Post Add social links to landing page
 * @apiGroup API Landing
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} landingPageId
 * @apiBOdy {array} data
 * @apiParamExample {json} Request-Example:
 * {
 *     "data": [
 *         {
 *             "link": "first",
 *             "position": 1
 *         },
 *         {
 *             "link": "second",
 *             "position": 12
 *         },
 *         {
 *             "link": "asdasd",
 *             "position": 13
 *         }
 *     ]
 * }
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "socialLinks": [
 *         {
 *             "link": "first",
 *             "position": 1
 *         },
 *         {
 *             "link": "second",
 *             "position": 12
 *         },
 *         {
 *             "link": "asdasd",
 *             "position": 13
 *         }
 *     ]
 * }
 */

landingRouter.post("/page/streaming/:landingPageId", LandingController.addStreamingLinks);
/**
 * @api {post} /api/landing/page/streaming/:landingPageId Add streaming links to landing page
 * @apiName Post Add streaming links to landing page
 * @apiGroup API Landing
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} landingPageId
 * @apiBOdy {array} data
 * @apiParamExample {json} Request-Example:
 * {
 *     "data": [
 *         {
 *             "link": "first",
 *             "position": 1
 *         },
 *         {
 *             "link": "second",
 *             "position": 12
 *         },
 *         {
 *             "link": "asdasd",
 *             "position": 13
 *         }
 *     ]
 * }
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "socialLinks": [
 *         {
 *             "link": "first",
 *             "position": 1
 *         },
 *         {
 *             "link": "second",
 *             "position": 12
 *         },
 *         {
 *             "link": "asdasd",
 *             "position": 13
 *         }
 *     ]
 * }
 */

export default landingRouter;
