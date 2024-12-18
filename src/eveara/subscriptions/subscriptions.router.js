import { Router } from "express";
import subscriptionsController from "./subscriptions.controller.js";
import authMiddleware from "../../auth/auth.middleware.js";

const subscriptionsRouter = new Router();

subscriptionsRouter.get("/partner", authMiddleware, subscriptionsController.getPartnerSubscriptions);
/**
 * @api {get} /api/eveara/subscriptions/partner Subscriptions - Get partner subscriptions
 * @apiName Get Partner Subscriptions
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiQuery {number} [subscriptionId] `to find only one subscription`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "message": "Currently showing 1 record(s)",
 *     "success": true,
 *     "total_records": 1,
 *     "data": [
 *         {
 *             "total_number_of_albums": "Unlimited",
 *             "currency": "USD",
 *             "max_artists_per_product": 20,
 *             "total_number_of_tracks": "Unlimited",
 *             "subscription_limit_per_year": 20,
 *             "name": "EVEARA Test",
 *             "max_tracks_per_product": 20,
 *             "amount": 0,
 *             "subscription_id": 571,
 *             "total_number_of_artist": "Unlimited",
 *             "subscription_product_type": [
 *                 "Album",
 *                 "Single",
 *                 "Compilation Album",
 *                 "EP"
 *             ],
 *             "sku": "EVEA0001",
 *             "track_file_quality": [
 *                 "Stereo"
 *             ],
 *             "duration": "Forever"
 *         }
 *     ]
 * }
 */

subscriptionsRouter.get("/user", authMiddleware, subscriptionsController.getUserSubscriptions);
/**
 * @api {get} /api/eveara/subscriptions/user Subscriptions - Get user subscriptions
 * @apiName Get User Subscriptions
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiQuery {number} [subscriptionId] `to find only one subscription`
 * @apiQuery {string} uuidEveara
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "message": "Currently showing 2 record(s)",
 *     "success": true,
 *     "total_records": 2,
 *     "data": [
 *         {
 *             "deactivate_enabled": true,
 *             "artists_added": 0,
 *             "status": "Active",
 *             "expiration_date": "",
 *             "subscription_details": {
 *                 "total_number_of_albums": "Unlimited",
 *                 "total_number_of_tracks": "Unlimited",
 *                 "subscription_id": 571,
 *                 "total_number_of_artist": "Unlimited",
 *                 "sku": "EVEA0001",
 *                 "duration": "Forever",
 *                 "name": "EVEARA Test"
 *             },
 *             "reactivate_enabled": false,
 *             "my_subscription_id": 36390,
 *             "albums_added": 0,
 *             "tracks_added": 0,
 *             "cancel_enabled": false
 *         },
 *         {
 *             "deactivate_enabled": true,
 *             "artists_added": 0,
 *             "status": "Active",
 *             "expiration_date": "",
 *             "subscription_details": {
 *                 "total_number_of_albums": "Unlimited",
 *                 "total_number_of_tracks": "Unlimited",
 *                 "subscription_id": 571,
 *                 "total_number_of_artist": "Unlimited",
 *                 "sku": "EVEA0001",
 *                 "duration": "Forever",
 *                 "name": "EVEARA Test"
 *             },
 *             "reactivate_enabled": false,
 *             "my_subscription_id": 36389,
 *             "albums_added": 1,
 *             "tracks_added": 0,
 *             "cancel_enabled": false
 *         }
 *     ]
 * }
 */

subscriptionsRouter.post("/user", authMiddleware, subscriptionsController.addUserSubscription);
/**
 * @api {post} /api/eveara/subscriptions/user Subscriptions - Add user subscription
 * @apiName Add User Subscription
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiBody {array} subscriptions
 * @apiBody {number} subscriptions.subscription_id
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "message": "subscription added sucessfully",
 *     "success": true,
 *     "data": [
 *         {
 *             "subscription_id": "571",
 *             "my_subscription_id": 36259
 *        }
 *     ]
 * }
 */

export default subscriptionsRouter;
