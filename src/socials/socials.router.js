import {Router} from "express";
import authMiddleware from "../auth/auth.middleware.js";
import SocialsController from "./socials.controller.js";

const socialsRouter = new Router()

socialsRouter.get('/:bapId', authMiddleware, SocialsController.getSocialLinksOfBap)

/**
 * @api {get} /api/socials/:bapId Get social links of bap
 * @apiName Get Get social links of bap
 * @apiGroup API Social
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
 *     "socialLinks": [
 *         {
 *             "id": 4,
 *             "social": "dasd",
 *             "createdAt": "2023-03-07T17:10:23.000Z",
 *             "updatedAt": "2023-03-07T17:10:23.000Z",
 *             "bapId": 1
 *         },
 *         {
 *             "id": 5,
 *             "social": "dasd",
 *             "createdAt": "2023-03-07T17:14:36.000Z",
 *             "updatedAt": "2023-03-07T17:14:36.000Z",
 *             "bapId": 1
 *         }
 *     ]
 * }
 */

socialsRouter.put('/:bapId', authMiddleware, SocialsController.editSocialLinks)

/**
 * @api {put} /api/socials/:bapId Edit social links
 * @apiName Put Edit social links
 * @apiGroup API Social
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} bapId
 * @apiBody {array} socialData
 * @apiParamExample {json} Request-Example:
 * {
 *     "socialData": [
 *         {
 *             "social": "https://spotify.com/qwertyui",
 *             "position": 1
 *         },
 *         {
 *             "social": "https://example.com/89wdhn3mxax",
 *             "position": 3
 *         }
 *     ]
 * }
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "socials": [
 *         {
 *             "id": 454,
 *             "social": "https://spotify.com/qwertyui",
 *             "position": 1,
 *             "createdAt": "2023-05-01T15:04:00.000Z",
 *             "updatedAt": "2023-05-01T15:04:00.000Z",
 *             "bapId": 84
 *         },
 *         {
 *             "id": 455,
 *             "social": "https://example.com/89wdhn3mxax",
 *             "position": 3,
 *             "createdAt": "2023-05-01T15:04:00.000Z",
 *             "updatedAt": "2023-05-01T15:04:00.000Z",
 *             "bapId": 84
 *         }
 *     ]
 * }
 */

export default socialsRouter