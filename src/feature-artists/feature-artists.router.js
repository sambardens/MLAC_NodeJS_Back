import { Router } from "express";
import authMiddleware from "../auth/auth.middleware.js";
import featureArtistsController from "./feature-artists.controller.js";

const featureArtistsRouter = new Router();

featureArtistsRouter.post("/:trackId", authMiddleware, featureArtistsController.addFeatureArtist);
/**
 * @api {post} /api/artists/:trackId Add featured artist to track
 * @apiName Post Add featured artist to track
 * @apiGroup API Artists
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} trackId
 * @apiBody {string} name
 * @apiBody {string} spotifyId
 * @apiBody {string} [soundCloudId]
 * @apiBody {string} [appleMusicId]
 * @apiBody {string} [country]
 * @apiBody {string} [avatar] `url`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "featureArtist": {
 *         "id": 16,
 *         "trackId": "2648",
 *         "name": "artist",
 *         "spotifyId": "1pU40mNxB72IERMSbGwCBm",
 *         "soundCloudId": "asdf123",
 *         "appleMusicId": "as123",
 *         "country": "Ukraine",
 *         "avatar": "https://api-major-labl.pixy.pro/b32865a9-e6d2-47a1-a79f-8a3c1f412124.jpg",
 *         "onMajorLabl": true,
 *         "avatarMin": "thumb_17a46669-2b99-4671-a883-e8d47945d4a0.jpg",
 *         "updatedAt": "2023-09-18T10:47:45.287Z",
 *         "createdAt": "2023-09-18T10:47:45.287Z"
 *     }
 * }
 */

featureArtistsRouter.put("/edit", authMiddleware, featureArtistsController.editFeatureArtist);
/**
 * @api {put} /api/artists/edit Edit featured artist
 * @apiName Post Edit featured artist
 * @apiGroup API Artists
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiQuery {number} artistId
 * @apiBody {string} [country]
 * @apiBody {string} [soundCloudId]
 * @apiBody {string} [appleMusicId]
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "featureArtist": {
 *         "id": 132,
 *         "name": "artist",
 *         "spotifyId": "1pU40mNxB72IERMSbGwCBm",
 *         "avatar": "https://api-major-labl.pixy.pro/b32865a9-e6d2-47a1-a79f-8a3c1f412124.jpg",
 *         "onMajorLabl": false,
 *         "avatarMin": "thumb_7a8e5514-653a-40aa-a4e7-d07306af1a6e.jpg",
 *         "soundCloudId": 1111111111,
 *         "appleMusicId": 22222222222222,
 *         "country": "ukkk",
 *         "createdAt": "2023-10-26T15:15:33.000Z",
 *         "updatedAt": "2023-10-26T15:17:30.476Z",
 *         "trackId": 3062
 *     }
 * }
 */

featureArtistsRouter.delete("/", authMiddleware, featureArtistsController.removeFeatureArtistFromTrack);
/**
 * @api {delete} /api/artists Remove featured artists from track
 * @apiName Delete Remove featured artists from track
 * @apiGroup API Artists
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiQuery {number} trackId
 * @apiQuery {number} artistId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true
 * }
 */

export default featureArtistsRouter;
