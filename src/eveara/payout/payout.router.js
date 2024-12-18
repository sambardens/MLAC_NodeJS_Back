import { Router } from "express";
import authMiddleware from "../../auth/auth.middleware.js";
import payoutController from "./payout.controller.js";

const payoutRouter = new Router();

payoutRouter.get("/:uuidEveara/balance", authMiddleware, payoutController.getPayoutBalance);
/**
 * @api {get} /api/eveara/payout/:uuidEveara/balance Payout - Get payout balance
 * @apiName Get payout balance
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {string} uuidEveara
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "message": "Successfully fetched the payout balance details",
 *     "success": true,
 *     "data": [
 *         {
 *             "currency": "USD",
 *             "participant_id": 69334,
 *             "amount_to_pay": "0.3200",
 *             "name": "Raymond"
 *         },
 *         {
 *             "currency": "USD",
 *             "participant_id": 69196,
 *             "amount_to_pay": "0.1600",
 *             "name": "Daniel"
 *         }
 *     ]
 * }
 */

payoutRouter.get("/:uuidEveara/history", authMiddleware, payoutController.getPayoutHistory);
/**
 * @api {get} /api/eveara/payout/:uuidEveara/history Payout - Get payout history
 * @apiName Get payout history
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {string} uuidEveara
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "message": "Successfully fetched the payout history details",
 *     "success": true,
 *     "data": [
 *         {
 *             "payout_amount": 33.32,
 *             "currency": "USD",
 *             "participant_id": 70552,
 *             "paid_date": "25-05-2022",
 *             "payout_status": {
 *                 "status_code": 1111,
 *                 "status_name": "SUCCESS"
 *             },
 *             "name": "Stuart"
 *         },
 *         {
 *             "payout_amount": 48.02,
 *             "currency": "USD",
 *             "participant_id": 69331,
 *             "paid_date": "24-05-2022",
 *             "payout_status": {
 *                "status_code": 1121,
 *                "status_name": "PROCESSING"
 *             },
 *             "name": "Sheldon Cooper"
 *         }
 *     ]
 * }
 */

payoutRouter.post("/:uuidEveara", authMiddleware, payoutController.payout);
/**
 * @api {post} /api/eveara/payout/:uuidEveara Payout - Payout
 * @apiName Payout
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {string} uuidEveara
 * @apiBody {array} [participantId]
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "message": "Payout successfully initiated for the participants",
 *     "success": true,
 *     "participants_ids": [
 *         68038,
 *         70552
 *     ]
 * }
 */

export default payoutRouter;
