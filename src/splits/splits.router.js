import { Router } from "express";
import splitsController from "./splits.controller.js";
import authMiddleware from "../auth/auth.middleware.js";

const splitsRouter = new Router();

splitsRouter.post("/:releaseId", authMiddleware, splitsController.createSplits);

/**
 * @api {post} /api/splits/:releaseId Create split
 * @apiName Post Create split
 * @apiGroup API Split
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} releaseId
 * @apiBody {boolean} onlyContract
 * @apiBody {array} trackIds array of trackIds. Example: tracks: [1, 2, 3, 4]
 * @apiParamExample {json} Request-Example:
 * {
 *   "onlyContract": true,
 *   "trackIds": [1, 2, 3, 4]
 * }
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "result": {
 *         "split": {
 *             "id": 6,
 *             "releaseId": 1,
 *             "updatedAt": "2023-03-17T12:03:44.001Z",
 *             "createdAt": "2023-03-17T12:03:44.001Z"
 *         },
 *         "tracksSplit": [
 *             {
 *                 "id": 13,
 *                 "splitId": 6,
 *                 "trackId": 1,
 *                 "updatedAt": "2023-03-17T12:03:44.185Z",
 *                 "createdAt": "2023-03-17T12:03:44.185Z"
 *             },
 *             {
 *                 "id": 14,
 *                 "splitId": 6,
 *                 "trackId": 2,
 *                 "updatedAt": "2023-03-17T12:03:44.465Z",
 *                 "createdAt": "2023-03-17T12:03:44.465Z"
 *             }
 *         ]
 *     }
 * }
 */

splitsRouter.post("/reference/:splitId", authMiddleware, splitsController.createSplitRefference);
/**
 * @api {post} /api/splits/reference/:splitId Create split reference
 * @apiName Post Create split reference
 * @apiGroup API Split
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} splitId
 * @apiParamExample {json} Request-Example:
 * {
 *   "splitId": 1
 * }
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "result": {
 *         "split": {
 *             "id": 6,
 *             "releaseId": 1,
 *             "updatedAt": "2023-03-17T12:03:44.001Z",
 *             "createdAt": "2023-03-17T12:03:44.001Z"
 *         },
 *     }
 * }
 */

splitsRouter.post("/ownership/:splitId", authMiddleware, splitsController.addWriterOwnership);
/**
 * @api {post} /api/splits/ownership/:splitId Add writer ownership
 * @apiName Post Add writer ownership
 * @apiGroup API Split
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} splitId
 * @apiBody {object} ownership `object key - email, value - percent`
 * @apiParamExample {json} Request-Example:
 * {
 *   "ownership": {
 *       "temp@mail.com": 50,
 *       "temp2@mail.com": 30,
 *       "temp3@mail.com": 20
 *   }
 * }
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "splitUsers": [
 *         {
 *             "id": 3,
 *             "splitId": "1",
 *             "email": "temp@mail.com",
 *             "ownership": 50,
 *             "updatedAt": "2023-03-17T13:11:13.531Z",
 *             "createdAt": "2023-03-17T13:11:13.531Z"
 *         },
 *         {
 *             "id": 4,
 *             "splitId": "1",
 *             "email": "temp2@mail.com",
 *             "ownership": 30,
 *             "updatedAt": "2023-03-17T13:11:13.889Z",
 *             "createdAt": "2023-03-17T13:11:13.889Z"
 *         },
 *         {
 *             "id": 5,
 *             "splitId": "1",
 *             "email": "temp3@mail.com",
 *             "ownership": 20,
 *             "updatedAt": "2023-03-17T13:11:13.938Z",
 *             "createdAt": "2023-03-17T13:11:13.938Z"
 *         }
 *     ]
 * }
 */

splitsRouter.get("/:splitId", authMiddleware, splitsController.getFullInfoSplit);

/**
 * @api {Get} /api/splits/:splitId Get one split by id
 * @apiName Get Get one split by id
 * @apiGroup API Split
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} splitId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *  {
 *     "success": true,
 *     "split": {
 *         "id": 155,
 *         "createdAt": "2023-04-10T09:36:28.000Z",
 *         "updatedAt": "2023-04-10T09:36:28.000Z",
 *         "releaseId": 67,
 *         "tracksSplit": [
 *             {
 *                 "id": 125,
 *                 "name": "sdfdsfasdasd",
 *                 "uniqueName": "3d80b6a1-12f9-40e8-9442-5226b2fb9620.wav",
 *                 "type": null,
 *                 "createdAt": "2023-03-28T08:07:28.000Z",
 *                 "updatedAt": "2023-03-28T08:07:28.000Z",
 *                 "releaseId": 67
 *             },
 *             {
 *                 "id": 270,
 *                 "name": "sdfdsfasdasd",
 *                 "uniqueName": "6be2235b-041f-4833-a1f6-1765a5cbae83.wav",
 *                 "type": null,
 *                 "createdAt": "2023-04-06T08:11:09.000Z",
 *                 "updatedAt": "2023-04-06T08:11:09.000Z",
 *                 "releaseId": 67
 *             }
 *         ],
 *         "splitUsers": {
 *             "id": 173,
 *             "email": "xixito9939@necktai.com",
 *             "ownership": "100",
 *             "createdAt": "2023-04-10T10:10:32.000Z",
 *             "updatedAt": "2023-04-10T10:10:32.000Z",
 *             "splitId": 155
 *         }
 *     }
 * }
 */

splitsRouter.delete("/:splitId", authMiddleware, splitsController.removeSplit);
/**
 * @api {delete} /api/splits/:splitId Remove split
 * @apiName Delete Remove split
 * @apiGroup API Split
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} splitId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *  {
 *     "success": true
 * }
 */

export default splitsRouter;
