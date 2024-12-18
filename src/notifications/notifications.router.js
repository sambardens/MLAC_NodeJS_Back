import {Router} from "express";
import notificationsController from "./notifications.controller.js";
import authMiddleware from "../auth/auth.middleware.js";

const notificationsRouter = new Router()

notificationsRouter.get('/', authMiddleware, notificationsController.getAllNotifications)

/**
 * @api {get} /api/notifications Get all not reviewed notifications
 * @apiName Post Get all not reviewed notifications
 * @apiGroup API Notifications
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
 *     "notifications": [
 *         {
 *             "id": 530,
 *             "isAccept": 0,
 *             "reviewed": 0,
 *             "senderId": 4,
 *             "senderFirstName": "SASHA",
 *             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZW5kZXJJZCI6NCwicmVjaXBpZW50SWQiOjU5MiwiYmFwSWQiOiI3ODQiLCJyb2xlIjoic2RmZHNlZiIsImVtYWlsIjoieG92YWdpMjgyNkBtb21vc2hlLmNvbSIsInR5cGVOb3RpZmljYXRpb25JZCI6MSwiaWF0IjoxNjgxNzIyNTkxLCJleHAiOjE2ODQzMTQ1OTF9.SE--JftemeH0OkE2ejtkst6OKs_IXWooWQfCE2k7dr0",
 *             "senderLastName": "qwe",
 *             "bapName": "zsdfzsdfzsdf",
 *             "typeNotificationId": 1,
 *             "userId": 592,
 *             "bapAvatar": null,
 *             "createdAt": "2023-04-20T18:16:07.000Z"
 *          }
 *     ]
 * }
 */

notificationsRouter.get('/pending/:bapId', authMiddleware, notificationsController.getPendingNotificationsBap)

/**
 * @api {get} /api/notifications/pending/:bapId Get pending notifications bap
 * @apiName Get Get pending notifications bap
 * @apiGroup API Notifications
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
 *     "users": [
 *         {
 *             "id": 1332,
 *             "email": null,
 *             "role": null,
 *             "createdAt": "2023-05-16T14:18:07.000Z",
 *             "updatedAt": "2023-05-16T14:18:07.000Z",
 *             "bapId": 1315,
 *             "userId": null,
 *             "notificationId": 1332,
 *             "isAccept": 0,
 *             "isViaEmail": 0,
 *             "reviewed": 0,
 *             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZW5kZXJJZCI6MzcyLCJiYXBJZCI6IjEzMTUiLCJyb2xlIjoiQXJ0aXN0L0JhbmQgbWVtYmVyIiwidHlwZU5vdGlmaWNhdGlvbklkIjoxLCJpYXQiOjE2ODQyNDY2ODcsImV4cCI6MTY4NjgzODY4N30.Sw7YXOS6xDeg1TzG9knjN2PvvH9Zr0j-gtMclodhePA",
 *             "content": null,
 *             "typeNotificationId": 1,
 *             "senderId": 372
 *         }
 *     ]
 * }
 */

notificationsRouter.put('/', authMiddleware, notificationsController.checkNotification)

/**
 * @api {put} /api/notifications/ Check notification
 * @apiName Put Check notification
 * @apiGroup API Notifications
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiBody {boolean} [isAccept] `true || false. If you don't specify parameters, so isAccept will be false`
 * @apiBody {number} typeNotificationId `from get all not reviewed notifications`
 * @apiQuery {string} token `from get all not reviewed notifications`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "notification": {
 *         "id": 530,
 *         "isAccept": true,
 *         "reviewed": true,
 *         "email": "xovagi2826@momoshe.com",
 *         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZW5kZXJJZCI6NCwicmVjaXBpZW50SWQiOjU5MiwiYmFwSWQiOiI3ODQiLCJyb2xlIjoic2RmZHNlZiIsImVtYWlsIjoieG92YWdpMjgyNkBtb21vc2hlLmNvbSIsInR5cGVOb3RpZmljYXRpb25JZCI6MSwiaWF0IjoxNjgxNzIyNTkxLCJleHAiOjE2ODQzMTQ1OTF9.SE--JftemeH0OkE2ejtkst6OKs_IXWooWQfCE2k7dr0",
 *         "createdAt": "2023-04-17T09:09:51.000Z",
 *         "updatedAt": "2023-04-17T09:10:10.438Z",
 *         "userId": 592,
 *         "senderId": 4,
 *         "typeNotificationId": 1
 *     }
 * }
 */

notificationsRouter.delete('/:notificationId', authMiddleware, notificationsController.removingSentNotification)

/**
 * @api {delete} /api/notifications/:notificationId Remove a sent notification
 * @apiName Delete Remove a sent notification
 * @apiGroup API Notifications
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} notificationId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true
 * }
 */

export default notificationsRouter