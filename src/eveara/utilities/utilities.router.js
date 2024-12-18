import { Router } from "express";
import authMiddleware from "../../auth/auth.middleware.js";
import UtilitiesController from "./utilities.controller.js";

const utilitiesRouter = new Router();

utilitiesRouter.get("/genres", authMiddleware, UtilitiesController.getGenres);
/**
 * @api {get} /api/eveara/utilities/genres Utilities - Get genres
 * @apiName Get genres
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "message": "Succesfully fetched genre details",
 *     "success": true,
 *     "data": [
 *         {
 *             "genre_id": 1,
 *             "name": "Alternative"
 *         },
 *         {
 *             "genre_id": 2,
 *             "name": "Alternative Rock"
 *         },
 *         {
 *             "genre_id": 3,
 *             "name": "Alternativo & Rock Latino"
 *         },
 *         ...
 *     ]
 * }
 */

utilitiesRouter.get("/languages", authMiddleware, UtilitiesController.getLanguages);
/**
 * @api {get} /api/eveara/utilities/languages Utilities - Get languages
 * @apiName Get languages
 * @apiGroup API Eveara
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
 *     "data": [
 *         {
 *             "language_code": "af",
 *             "language_name": "Afrikaans"
 *         },
 *         {
 *             "language_code": "sq",
 *             "language_name": "Albanian"
 *         },
 *         ...
 */

utilitiesRouter.get("/availabilities", authMiddleware, UtilitiesController.getAvailabilities);
/**
 * @api {get} /api/eveara/utilities/availabilities Utilities - Get availabilities
 * @apiName Get availabilities
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "message": "Succesfully fetched availability details",
 *     "success": true,
 *     "data": [
 *         {
 *             "availability_id": 1,
 *             "name": "Download"
 *         },
 *         {
 *             "availability_id": 2,
 *             "name": "Stream"
 *         }
 *     ]
 * }
 */

utilitiesRouter.get("/countries", authMiddleware, UtilitiesController.getCountries);
/**
 * @api {get} /api/eveara/utilities/countries Utilities - Get countries
 * @apiName Get Countries
 * @apiGroup API Eveara
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
 *     "data": [
 *         {
 *             "country_code": "AF",
 *             "country_name": "Afghanistan",
 *             "state": [
 *                 {
 *                     "state_code": "BDS",
 *                     "state_name": "Badakhshān"
 *                 },
 *                 {
 *                     "state_code": "BDG",
 *                     "state_name": "Bādghīs"
 *                 },
 *                 ...
 */

utilitiesRouter.get("/roles", authMiddleware, UtilitiesController.getRoles);
/**
 * @api {get} /api/eveara/utilities/roles Utilities - Get roles
 * @apiName Get Roles
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "message": "Succesfully fetched role details",
 *     "success": true,
 *     "data": [
 *         {
 *             "role_id": 1,
 *             "name": "Author (Lyrics)"
 *         },
 *         {
 *             "role_id": 2,
 *             "name": "Composer (Music)"
 *         },
 *         ...
 */

export default utilitiesRouter;
