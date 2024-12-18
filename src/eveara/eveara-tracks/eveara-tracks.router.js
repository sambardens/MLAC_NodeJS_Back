import { Router } from "express";
import EvearaTracksController from "./eveara-tracks.controller.js";
import authMiddleware from "../../auth/auth.middleware.js";

const tracksRouter = new Router();

tracksRouter.post("/", authMiddleware, EvearaTracksController.addTracks);
/**
 * @api {post} /api/eveara/tracks Tracks - Add tracks
 * @apiName Add tracks
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiBody {string} releaseId `releaseId on majorlabl`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "tracks": [
 *         {
 *             "id": 2749,
 *             "message": "track already exist on Eveara",
 *             "originalName": "cacc2943-b3c4-4355-b8cd-ef356cfe5bba.flac",
 *             "evearaTrackId": "358651"
 *         },
 *         {
 *             "id": 2753,
 *             "message": "track added and updated on Eveara successfully",
 *             "originalName": "1fa4f345-8d98-4d7e-9752-75a0443193b0.flac",
 *             "evearaTrackId": 358660
 *         }
 *     ]
 * }
 */

tracksRouter.put("/:trackId", authMiddleware, EvearaTracksController.updateTrack);
/**
 * @api {put} /api/eveara/tracks/:trackId Tracks - Update track on Eveara
 * @apiName Update track on Eveara
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} trackId
 * @apiBody {string} uuid
 * @apiBody {string} name
 * @apiBody {string} [stereo_isrc] `Expecting a unique ISRC code in standared format (CCXXXYYNNNNN)`
 * @apiBody {string} [iswc] `ISWC of the track`
 * @apiBody {array} [genre] `Supported genres can be obtained using the "Get Genres" endpoint (genre_id)`
 * @apiBody {string} [language] `The supported language can be obtained using the "Get Language List" endpoint && Expected value is the language ISO code (language_code)`
 * @apiBody {number} [explicit] `Explicit : 0-Clean, 1-Explicit, 2-Not Required`
 * @apiBody {array} [availability] `Supported availability options can be obtained using the "Get Availability" endpoint (availability_id)`
 * @apiBody {array} [artists] `Artist For: Single Track`
 * @apiBody {array} [featured_artists] `Feature artist must be upto 5`
 * @apiBody {boolean} [album_only] `Available For: Single Track- False, With Album Only -True`
 * @apiBody {string} [lyrics] `Lyrics for the tracks`
 * @apiBody {string} [dolby_atmos_isrc] `Expecting a unique ISRC code in standared format (CCXXXYYNNNNN)`
 * @apiBody {string} [sony_360ra_isrc] `Expecting a unique ISRC code in standared format (CCXXXYYNNNNN)`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "message": "Track updated successfully",
 *     "success": true
 * }
 */

tracksRouter.get("/", authMiddleware, EvearaTracksController.getTrack);
/**
 * @api {get} /api/eveara/tracks Tracks - Get track from Eveara
 * @apiName Get track from Eveara
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiQuery {number} evearaTrackId
 * @apiQuery {string} uuidEveara
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "message": "Currently showing 1 records",
 *     "success": true,
 *     "total_records": 1,
 *     "data": [
 *        {
 *            "language": "en",
 *            "featured_artists": [],
 *            "album_only": "false",
 *            "sony_360ra_isrc": "",
 *            "artists": [],
 *            "stereo_isrc": "IELOI2301190",
 *            "genres": [
 *                {
 *                    "genre_id": 1,
 *                    "name": "Alternative"
 *                },
 *                {
 *                    "genre_id": 2,
 *                    "name": "Alternative Rock"
 *                }
 *             ],
 *            "extention": "flac",
 *            "name": "name",
 *            "track_id": 358435,
 *            "track_url": "https://s3.amazonaws.com/eveara-bucket/staging/contents/54228/music_catalog_tracks/358435.flac?AWSAccessKeyId=AKIA56KZMVANEUHP7T5B&Expires=1691454184&Signature=6d5RICffVw7ZVa80RCs5X94%2FpRk%3D",
 *            "iswc": "",
 *            "availability": [],
 *            "dolby_atmos_isrc": "",
 *            "removable": false,
 *            "explicit": "true"
 *        }
 *    ]
 * }
 */

tracksRouter.delete("/:trackId", authMiddleware, EvearaTracksController.removeTrack);
/**
 * @api {delete} /api/eveara/tracks/:trackId Tracks - Remove track from Eveara
 * @apiName Remove track from Eveara
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} trackId
 * @apiQuery {string} uuidEveara
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "message": "Track deleted successfully",
 *     "success": true
 * }
 */

export default tracksRouter;
