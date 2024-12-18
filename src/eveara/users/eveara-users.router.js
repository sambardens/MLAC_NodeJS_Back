import { Router } from "express";
import authMiddleware from "../../auth/auth.middleware.js";
import evearaUsersController from "./eveara-users.controller.js";

const usersRouter = new Router();

usersRouter.get("/", authMiddleware, evearaUsersController.getUser);
/**
 * @api {get} /api/eveara/users Users - Get user from Eveara
 * @apiName Get user from eveara
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiQuery {string} [email]
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
 *             "language": {
 *                 "iso": "en",
 *                "name": "English"
 *             },
 *             "sur_name": "lastname",
 *             "is_mail_subscribed": false,
 *             "state": {
 *                 "iso": "LND",
 *                 "name": "London, City of"
 *             },
 *             "email": "test8@gmail.com",
 *             "is_active": 1,
 *             "first_name": "name",
 *             "country": {
 *                 "iso": "GB",
 *                 "name": "United Kingdom"
 *             },
 *             "address": {
 *                 "zip": "",
 *                 "city": "",
 *                 "house": "",
 *                "street": "",
 *                 "mobile": ""
 *             },
 *             "gender": "M",
 *             "uuid": "856E9A38-FF7F-9C29-8C808270958E9BFB",
 *             "stripe_customer_id": ""
 *         }
 *     ]
 * }
 */

usersRouter.post("/", authMiddleware, evearaUsersController.createUser);
/**
 * @api {post} /api/eveara/users Users - Create user on Eveara
 * @apiName Create user on Eveara
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiBody {string} email
 * @apiBody {string} firstName
 * @apiBody {string} lastName
 * @apiBody {number} [isMailSubscribed] `1 (subscribed) or  0(not subscribed)`
 * @apiBody {object} [address]
 * @apiBody {string} [address.house] `House number of the user`
 * @apiBody {string} [address.street] `Street of the user`
 * @apiBody {string} [address.city] `City of the user`
 * @apiBody {string} [address.zip] `Zip code of the user, expecting a number between 5 - 8 digits long`
 * @apiBody {string} [address.mobile] `Mobile number of the user`
 * @apiBody {string} [country] `Country in ISO code`
 * @apiBody {string} [state] `State in ISO code`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "message": "User saved successfully",
 *     "success": true,
 *     "uuid": "88A54D95-AE42-0CC3-7DAFD4143CCDED4A"
 * }
 */

usersRouter.put("/", authMiddleware, evearaUsersController.updateUser);
/**
 * @api {put} /api/eveara/users Users - Update user on Eveara
 * @apiName Update user on Eveara
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiBody {string} uuidEveara
 * @apiBody {string} email
 * @apiBody {string} firstName
 * @apiBody {string} lastName
 * @apiBody {number} [isMailSubscribed] `1 (subscribed) or  0(not subscribed)`
 * @apiBody {object} [address]
 * @apiBody {string} [address.house] `House number of the user`
 * @apiBody {string} [address.street] `Street of the user`
 * @apiBody {string} [address.city] `City of the user`
 * @apiBody {string} [address.zip] `Zip code of the user, expecting a number between 5 - 8 digits long`
 * @apiBody {string} [address.mobile] `Mobile number of the user`
 * @apiBody {string} [country] `Country in ISO code`
 * @apiBody {string} [state] `State in ISO code`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "message": "User updated successfully",
 *     "success": true
 * }
 */

export default usersRouter;
