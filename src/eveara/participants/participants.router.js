import { Router } from "express";
import participantsController from "./participants.controller.js";
import authMiddleware from "../../auth/auth.middleware.js";

const participantsRouter = new Router();

participantsRouter.post("/", authMiddleware, participantsController.addParticipant);
/**
 * @api {post} /api/eveara/participants Participants - Add participant
 * @apiName Add participant
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiBody {number} userId
 * @apiBody {string} name
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "participant": {
 *         "id": 3,
 *         "creatorId": 1225,
 *         "uuidEveara": "2A7339FF-E0ED-3EEE-9B018973A7AC12A9",
 *         "userId": 1225,
 *         "participantId": 73471,
 *         "updatedAt": "2023-10-05T08:54:51.267Z",
 *         "createdAt": "2023-10-05T08:54:51.267Z"
 *     }
 * }
 */

participantsRouter.get("/id", authMiddleware, participantsController.getParticipantsById);
/**
 * @api {get} /api/eveara/participants/id Participants - Get participants by id
 * @apiName Get Participants By Id
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiQuery {number} creatorId `this`
 * @apiQuery {number} userId `or this`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "participants": [
 *         {
 *             "id": 1,
 *             "creatorId": 1225,
 *             "userId": 1225,
 *             "participantId": 73469,
 *             "paypalEmailId": null,
 *             "createdAt": "2023-10-05T08:24:39.000Z",
 *             "updatedAt": "2023-10-05T08:24:39.000Z"
 *         },
 *         {
 *             "id": 2,
 *             "creatorId": 1225,
 *             "userId": 1225,
 *             "participantId": 73470,
 *             "paypalEmailId": null,
 *             "createdAt": "2023-10-05T08:27:29.000Z",
 *             "updatedAt": "2023-10-05T08:27:29.000Z"
 *         },
 *         ...
 *     }
 * }
 */

participantsRouter.get("/", authMiddleware, participantsController.getParticipant);
/**
 * @api {get} /api/eveara/participants Participants - Get participant
 * @apiName Get participant
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiQuery {string} uuidEveara
 * @apiQuery {number} [participantId] `to find only one participant`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "message": "The search terms have 1 record(s)",
 *     "success": true,
 *     "total_records": 1,
 *     "data": [
 *         {
 *             "participant_id": 73289,
 *             "ipn": "",
 *             "isni": "",
 *             "is_active": 1,
 *             "removable": true,
 *             "name": "name"
 *         }
 *     ]
 * }
 */

participantsRouter.get("/paypal/:participantId", authMiddleware, participantsController.getParticipantPaypal);
/**
 * @api {get} /api/eveara/participants/paypal/:participantId Participants - Get participant paypal
 * @apiName Get participant paypal
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {string} participantId `Participant Id`
 * @apiQuery {string} uuidEveara
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "message": "Successfully fetched paypal details",
 *     "success": true,
 *     "data": {
 *         "paypal_email_id": "test@gmail.com"
 *     }
 * }
 */

participantsRouter.post("/paypal/:participantId", authMiddleware, participantsController.addParticipantPaypal);
/**
 * @api {post} /api/eveara/participants/paypal/:participantId Participants - Add participant paypal
 * @apiName Add participant paypal
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {string} participantId `Participant Id`
 * @apiBody {string} uuid `User unique UuidEveara`
 * @apiBody {string} paypalEmailId `Same paypal id can't be duplicated with different participants`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "message": "Participant Paypal saved successfully",
 *     "success": true
 * }
 */

export default participantsRouter;
