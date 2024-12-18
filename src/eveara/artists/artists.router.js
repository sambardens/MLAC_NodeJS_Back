import { Router } from "express";
import artistsController from "./artists.controller.js";
import authMiddleware from "../../auth/auth.middleware.js";

const artistsRouter = new Router();

artistsRouter.get("/", authMiddleware, artistsController.getArtist);
/**
 * @api {get} /api/eveara/artists Artists - Get artist
 * @apiName Get artist
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiQuery {number} [artistId] `to find only one artist`
 * @apiQuery {string} uuidEveara
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "message": "Currently showing 1 record(s)",
 *     "success": true,
 *     "total_records": 1,
 *     "data": [
 *         {
 *             "artist_id": 81880,
 *             "is_active": 1,
 *             "outlets": [
 *                 {
 *                     "outlet_name": "Spotify",
 *                     "outlet_id": "UAHDNAVX"
 *                 }
 *             ],
 *             "removable": true,
 *             "name": "Barret"
 *         }
 *     ]
 * }
 */

artistsRouter.post("/:artistId", authMiddleware, artistsController.updateArtist);
/**
 * @api {post} /api/eveara/artists/:artistId Artists - Update artist (not working yet)
 * @apiName Update artist (not working yet)
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} artistId
 * @apiBody {string} uuid
 * @apiBody {string} artistName
 * @apiBody {string} country
 * @apiBody {object} [outlets_profile]
 * @apiBody {string} [outlets_profile.spotify_profile] `Expecting a valid Spotify artist profile URI (Eg: spotify:artist:#############)`
 * @apiBody {string} [outlets_profile.soundcloudgo_profile] `Expecting a valid SoundCloud artist profile permalink (Eg: for "https://soundcloud.com/#############" just include "#############")`
 * @apiBody {string} [outlets_profile.applemusic_profile] `Expecting a valid Apple artist profile id (Eg: for "https://music.apple.com/us/artist/abcdefgh/#############" just include "#############")`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "message": "Artist saved successfully",
 *     "success": true,
 *     "artist_id": "85194",
 *     "artist_name": "name"
 * }
 */

artistsRouter.post("/", authMiddleware, artistsController.addArtist);
/**
 * @api {post} /api/eveara/artists Artists - Add artist
 * @apiName Add artist
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiBody {string} name
 * @apiBody {string} country
 * @apiBody {string} [bapId]
 * @apiBody {object} [outlets_profile]
 * @apiBody {string} [outlets_profile.spotify_profile] `Expecting a valid Spotify artist profile URI (Eg: spotify:artist:#############)`
 * @apiBody {string} [outlets_profile.soundcloudgo_profile] `Expecting a valid SoundCloud artist profile permalink (Eg: for "https://soundcloud.com/#############" just include "#############")`
 * @apiBody {string} [outlets_profile.applemusic_profile] `Expecting a valid Apple artist profile id (Eg: for "https://music.apple.com/us/artist/abcdefgh/#############" just include "#############")`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "message": "Artist saved successfully",
 *     "success": true,
 *     "artist_id": "85194",
 *     "artist_name": "name"
 * }
 */

export default artistsRouter;
