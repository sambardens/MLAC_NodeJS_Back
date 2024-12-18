import { Router } from "express";
import albumsController from "./albums.controller.js";
import authMiddleware from "../../auth/auth.middleware.js";

const albumsRouter = new Router();

albumsRouter.post("/", authMiddleware, albumsController.addAlbum);
/**
 * @api {post} /api/eveara/albums Albums - Add album
 * @apiName Add album
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiBody {number} releaseId `release id on majorlabl`
 * @apiBody {number} subscription_id
 * @apiBody {array} [artists] `Artist(s) Id of the Album, for example: [123, 124]`
 * @apiBody {number} [ean_upc] `EAN or UPC number of the Album`
 * @apiBody {number} [label_id] `Label of the Album`
 * @apiBody {date} [original_release_date] `Original Release Date of the Album (dd-mm-yyyy)`
 * @apiBody {string} [product_type] `Acceptable product types are album,single,compilation_album,ep`
 * @apiBody {string} [product_code_type] `Acceptable product type codes are ean, upc and jan`
 * @apiBody {boolean} [code_auto_generate] `code auto generate for enable/disable`
 * @apiBody {number} [spatial_ean_upc] `EAN or UPC number of the spatial audio`
 * @apiBody {string} [spatial_product_code_type] `Acceptable product type codes are ean, upc and jan`
 * @apiBody {boolean} [spatial_code_auto_generate] `spatial product code auto generate for enable/disable`
 * @apiBody {string} [product_format] `Acceptable product formats are Stereo, Stereo and Dolby Atmos and Stereo and 360RA`
 * @apiBody {object} [cover_image]
 * @apiBody {string} [cover_image.url] `URL of the file. File size should be between 100KB and 10 MB. The image must be of 1:1 ratio (square), and size can range from 1400px to 4000px`
 * @apiBody {string} [cover_image.extension] `File extension, Acceptable extensions are JPG, JPEG, PNG, BMP, TIF, TIFF or GIF`
 * @apiBody {array} [tracks]
 * @apiBody {number} [tracks.track_id]
 * @apiBody {array} [tracks.artists] `Artist(s) Id of the Track`
 * @apiBody {array} [tracks.featured_artists]
 * @apiBody {object} [tracks.preview]
 * @apiBody {number} [preview.start_at]
 * @apiBody {number} [preview.duration]
 * @apiBody {array} [tracks.participant]
 * @apiBody {number} [participant.id]
 * @apiBody {number} [participant.role_id]
 * @apiBody {number} [participant.payout_share_percentage] `Participant payout share percentage , total share percentage per track should be equal to 100`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "data": {
 *         "message": "Album saved successfully",
 *         "success": true,
 *         "release_id": 100000469648
 *     }
 * }
 */

albumsRouter.put("/:releaseId", authMiddleware, albumsController.updateAlbum);
/**
 * @api {put} /api/eveara/albums/:releaseId Albums - Update album
 * @apiName Update album
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiBody {string} uuidEveara
 * @apiBody {number} subscription_id `Subscription Id of Album`
 * @apiParam {number} releaseId `Release Id generated on time of album creation`
 * @apiBody {string} [name]
 * @apiBody {array} [artists] `Artist(s) Id of the Album, for example: [12345, 12346]`
 * @apiBody {number} [ean_upc] `EAN or UPC number of the Album`
 * @apiBody {number} [label_id] `Label of the Album`
 * @apiBody {date} [original_release_date] `Original Release Date of the Album (dd-mm-yyyy)`
 * @apiBody {string} [product_type] `Acceptable product types are album,single,compilation_album,ep`
 * @apiBody {string} [product_code_type] `Acceptable product type codes are ean, upc and jan`
 * @apiBody {boolean} [code_auto_generate] `code auto generate for enable/disable`
 * @apiBody {number} [spatial_ean_upc] `EAN or UPC number of the spatial audio`
 * @apiBody {string} [spatial_product_code_type] `Acceptable product type codes are ean, upc and jan`
 * @apiBody {boolean} [spatial_code_auto_generate] `spatial product code auto generate for enable/disable`
 * @apiBody {string} [product_format] `Acceptable product formats are Stereo, Stereo and Dolby Atmos and Stereo and 360RA`
 * @apiBody {object} [cover_image]
 * @apiBody {string} [cover_image.url] `URL of the file. File size should be between 100KB and 10 MB. The image must be of 1:1 ratio (square), and size can range from 1400px to 4000px`
 * @apiBody {string} [cover_image.extension] `File extension, Acceptable extensions are JPG, JPEG, PNG, BMP, TIF, TIFF or GIF`
 * @apiBody {array} [tracks]
 * @apiBody {number} [tracks.track_id]
 * @apiBody {array} [tracks.artists] `Artist(s) Id of the Track, for example: [22621]`
 * @apiBody {array} [tracks.featured_artists]
 * @apiBody {object} [tracks.preview]
 * @apiBody {number} [preview.start_at]
 * @apiBody {number} [preview.duration]
 * @apiBody {array} [tracks.participant]
 * @apiBody {number} [participant.id]
 * @apiBody {number} [participant.role_id]
 * @apiBody {number} [participant.payout_share_percentage] `Participant payout share percentage , total share percentage per track should be equal to 100`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "message": "Album updated successfully",
 *     "success": true
 * }
 */

albumsRouter.get("/:releaseId/validate", authMiddleware, albumsController.validateAlbum);
/**
 * @api {get} /api/eveara/albums/:releaseId/validate Albums - Validate album
 * @apiName Validate album
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} releaseId
 * @apiQuery {string} uuidEveara
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "message": "You can't distribute this album now. Please enter all required details for this album",
 *     "success": true,
 *     "data": {
 *         "album_status": {
 *             "status_code": 1021,
 *             "status_name": "Draft"
 *         },
 *         "error_fields": [
 *             {
 *                 "fields": "Artists",
 *                 "message": "Album artist is empty"
 *             },
 *             {
 *                 "fields": "label_id",
 *                 "message": "Label Id is empty"
 *             }
 *         ]
 *     }
 * }
 */

albumsRouter.get("/", authMiddleware, albumsController.getAlbum);
/**
 * @api {get} /api/eveara/albums Albums - Get album
 * @apiName Get album
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
 *     "message": "Currently showing 1 record(s)",
 *     "success": true,
 *     "total_records": 1,
 *     "data": [
 *         {
 *             "cover_image": "",
 *             "subscription": {
 *                 "expiration_date": "",
 *                 "subscription_id": 36389,
 *                 "subscription_name": "EVEARA Test"
 *             },
 *             "ean_upc": "",
 *             "is_active": 1,
 *             "product_format": "",
 *             "original_release_date": "",
 *             "name": "",
 *             "release_id": 100000471465,
 *             "spatial_ean_upc": "",
 *             "pre_save_link": "",
 *             "tracks": [],
 *             "product_type": "Album",
 *             "album_status": {
 *                 "status_code": 1021,
 *                 "status_name": "Draft"
 *             },
 *             "artist": [],
 *             "spatial_product_code_type": "",
 *             "disapprove_message": "",
 *             "product_code_type": "EAN",
 *             "outlets": [],
 *             "removable": "true",
 *             "track_count": 0
 *         }
 *     ]
 * }
 */

export default albumsRouter;
