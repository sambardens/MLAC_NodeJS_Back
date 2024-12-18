import { Router } from "express";
import authMiddleware from "../../auth/auth.middleware.js";
import outletsController from "./outlets.controller.js";

const outletsRouter = new Router();

outletsRouter.get("/", authMiddleware, outletsController.getOutlets);
/**
 * @api {get} /api/eveara/outlets Outlets - Get outlets
 * @apiName Get outlets
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiQuery {string} uuidEveara
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *    "message": "Successfully fetched Outlet details",
 *    "success": true,
 *    "data": [
 *        {
 *            "process_duration_dates": 10,
 *            "dolby_enabled": false,
 *            "store_name": "Outlet Group 1",
 *            "is_presales_date_enabled": false,
 *            "sony360_enabled": false,
 *            "store_id": 4073,
 *            "child_stores": [
 *                "7 Digital",
 *                "Digster",
 *                "Electric Jukebox / Roxi",
 *                "eMusic",
 *                "Exlibris",
 *                "Fan Label",
 *                "Global Eagle",
 *                "Global Radio",
 *                "Grandpad",
 *                "Jazzed",
 *                "Klassik Radio",
 *                "Moodagent",
 *                "Mus.uy",
 *                "MuzArcade",
 *                "MyMelo",
 *                "NEC",
 *                "Snap",
 *                "Songclip (Audiobyte LLC",
 *                "Soundhound",
 *                "Soundmouse",
 *                "Soundtrack",
 *                "Trebel Music MX/M&M Media",
 *                "Trebel Music US/M&M Media",
 *                "Triller",
 *                "Weltbild Radio",
 *                "Xite"
 *            ]
 *        },
 *        ...
 *    ]
 * }
 */

outletsRouter.get("/:releaseId", authMiddleware, outletsController.getOutletsDetailsByAlbum);
/**
 * @api {get} /api/eveara/outlets/:releaseId Outlets - Get outlets details by album
 * @apiName Get Outlets Details By Album
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} releaseId `Release Id of the Album`
 * @apiQuery {string} uuidEveara
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *    "message": "Successfully fetched Outlet details",
 *    "success": true,
 *    "data": [
 *        {
 *            "process_duration_dates": 10,
 *             "release_start_date": "19-09-2023",
 *             "store_name": "Outlet Group 1",
 *             "is_presales_date_enabled": false,
 *             "pre_sales_date": "",
 *             "release_end_date": "",
 *             "store_id": 4073,
 *             "outlet_status": {
 *                 "status_code": 1021,
 *                 "status_name": "Draft"
 *             },
 *             "child_stores": [
 *                 "7 Digital",
 *                 "Digster",
 *                 "Electric Jukebox / Roxi",
 *                 "eMusic",
 *                 "Klassik Radio",
 *                 "Moodagent",
 *                 "Mus.uy",
 *                 "MuzArcade",
 *                 "MyMelo",
 *                 "NEC",
 *                 "Snap",
 *                 "Xite"
 *             ],
 *             "price_code_list": {
 *                 "album": [],
 *                 "track": []
 *             },
 *             "price_code": {
 *                 "track_price_id": 0,
 *                 "album_price_id": 0
 *             }
 *        },
 *    ]
 * }
 */

outletsRouter.patch("/:releaseId/distribute", authMiddleware, outletsController.distribute);
/**
 * @api {patch} /api/eveara/outlets/:releaseId/distribute Outlets - Distribute
 * @apiName Distribute
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} releaseId
 * @apiBody {string} uuid
 * @apiBody {array} outlets_details
 * @apiBody {number} outlets_details.store_id `Store Id obtained from get Outlets`
 * @apiBody {date} outlets_details.release_start_date `Release Start Date of the album on store (dd-mm-yyyy)`
 * @apiBody {date} [outlets_details.pre_sales_date] `Pre Sales Date for album to distirbute on store (dd-mm-yyyy)`
 * @apiBody {date} [outlets_details.release_end_date] `Release End Date of the album on store (dd-mm-yyyy)`
 * @apiBody {object} [price_code]
 * @apiBody {number} [price_code.album_price_id] `Album Price Id obtained from get Outlets by Album API`
 * @apiBody {number} [price_code.track_price_id ] `Track Price Id obtained from get Outlets by Album API`
 * @apiBody {object} [evearaPriceId]
 * @apiBody {number} [evearaPriceId.appleMusicReleasePriceId]
 * @apiBody {number} [evearaPriceId.appleMusicTrackPriceId]
 * @apiBody {number} [evearaPriceId.amazonReleasePriceId]
 * @apiBody {number} [evearaPriceId.amazonTrackPriceId]
 * @apiParamExample {json} Request-Example:
 * {
 *     "uuid": "2A7339FF-E0ED-3EEE-9B018973A7AC12A9",
 *     "outlets_details": [
 *         {
 *             "store_id": 2,
 *             "pre_sales_date": "02-03-2020",
 *             "release_start_date": "08-05-2020",
 *             "release_end_date": "06-08-2020",
 *             "price_code" : {
 *                 "album_price_id" : 361,
 *                 "track_price_id" : 374
 *             }
 *         }
 *     ],
 *     "evearaPriceId":  {
 *         "appleMusicReleasePriceId": 123,
 *         "appleMusicTrackPriceId": 321,
 *         "amazonReleasePriceId": 456,
 *         "amazonTrackPriceId": 654
 *     }
 * }
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "message": "Album distribution initiated successfully",
 *     "success": true
 * }
 */

export default outletsRouter;
