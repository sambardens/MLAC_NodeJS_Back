import { Router } from "express";
import CreditsController from "./credits.controller.js";
import authMiddleware from "../auth/auth.middleware.js";

const creditsRouter = new Router();

creditsRouter.post("/", authMiddleware, CreditsController.addCredits);

/**
 * @api {post} /api/credits/ Add credits
 * @apiName Post Add credits
 * @apiGroup API Credit
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiBody {number} [userId] `this`
 * @apiBody {string} [name] `or this`
 * @apiBody {number} trackId
 * @apiBody {array} creditIds
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "credit": {
 *         "id": 14,
 *         "userId": "4",
 *         "trackId": "14",
 *         "updatedAt": "2023-04-05T09:46:41.537Z",
 *         "createdAt": "2023-04-05T09:46:41.537Z"
 *     }
 * }
 */

creditsRouter.get("/type", authMiddleware, CreditsController.getCreditTypes);

/**
 * @api {Get} /api/credits/type Get credit types
 * @apiName Get Get credit types
 * @apiGroup API Credit
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
 *     "creditTypes": [
 *         {
 *             "id": 1,
 *             "name": "No Credit"
 *         },
 *         {
 *             "id": 2,
 *             "name": "Composer"
 *         },
 *         {
 *             "id": 3,
 *             "name": "Lyricist"
 *         },
 *         {
 *             "id": 4,
 *             "name": "Producer"
 *         },
 *         {
 *             "id": 5,
 *             "name": "Remixer"
 *         }
 *     ]
 * }
 */

creditsRouter.get("/:trackId", authMiddleware, CreditsController.getCredits);

/**
 * @api {get} /api/credits/:trackId Get Credits
 * @apiName Get Credits
 * @apiGroup API Credit
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} trackId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "credits": [
 *         {
 *             "userId": 169,
 *             "firstName": "Jessica",
 *             "lastName": "Hammes",
 *             "email": "79390016@mail.com",
 *             "trackId": 348,
 *             "splitId": 153,
 *             "creditNames": [
 *                 "Composer",
 *                 "Lyricist",
 *                 "Producer",
 *                 "Remixer"
 *             ]
 *         }
 *     ]
 * }
 */

creditsRouter.delete("/", authMiddleware, CreditsController.removeCredits);

/**
 * @api {delete} /api/credits/ Remove credits
 * @apiName Delete Remove credits
 * @apiGroup API Credit
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiQuery {number} trackId
 * @apiQuery {number} userId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true
 * }
 */

export default creditsRouter;
