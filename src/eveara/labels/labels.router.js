import { Router } from "express";
import labelsController from "./labels.controller.js";
import authMiddleware from "../../auth/auth.middleware.js";

const labelsRouter = new Router();

labelsRouter.get("/", authMiddleware, labelsController.getLabel);
/**
 * @api {get} /api/eveara/labels Labels - Get label
 * @apiName Get label
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiQuery {number} [labelId] `to find only one label`
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
 *             "label_id": 34247,
 *             "is_active": 1,
 *             "label_name": "mylabel",
 *             "removable": true
 *         }
 *     ]
 * }
 */

labelsRouter.post("/", authMiddleware, labelsController.addLabel);
/**
 * @api {post} /api/eveara/labels Labels - Add label
 * @apiName Add label
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiBody {string} releaseId
 * @apiBody {string} name
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "message": "Label saved successfully",
 *     "success": true,
 *     "label_id": "34247",
 *     "label_name": "mylabel"
 * }
 */

export default labelsRouter;
