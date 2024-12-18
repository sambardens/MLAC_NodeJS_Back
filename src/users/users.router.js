import { Router } from "express";
import usersController from "./users.controller.js";
import authMiddleware from "../auth/auth.middleware.js";
import checkRoleMiddleware from "../auth/auth.checkRoleMiddleware.js";

const usersRouter = new Router();

usersRouter.put("/newPassword", usersController.setNewPassword);

/**
 * @api {put} /api/users/newPassword/ User set new password
 * @apiName Put User set new password
 * @apiGroup API User
 * @apiQuery {String} token `recovery token`
 * @apiBody {String} newPassword
 * @apiBody {String} confirmPassword
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "user": {
 *         "id": 505,
 *         "firstName": "firstName525824425",
 *         "lastName": "lastName497435752",
 *         "email": "421738512@mail.com",
 *         "provider": "email",
 *         "avatar": "a1d427e8-8fae-4ebc-ad94-8fc2d557024f.jpg",
 *         "address": "address481438621",
 *         "phone": "650704028",
 *         "password": "$2b$10$wOmP3VF0HTNNjJFtXAKF/um0baQnLYfalptJcKRsTc58VJOwU/yH6",
 *         "isEmailConfirmed": true,
 *         "createdAt": "2023-04-03T15:23:52.000Z",
 *         "updatedAt": "2023-04-07T13:04:41.584Z"
 *     }
 * }
 */

usersRouter.put("/newEmail", authMiddleware, usersController.setNewEmail);

/**
 * @api {put} /api/users/newEmail/ User set new email
 * @apiName Put User set new email
 * @apiGroup API User
 * @apiBody {String} newEmail
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 {
    "success": true,
    "user": {
        "id": 1156,
        "firstName": "Petro",
        "lastName": "Mosta",
        "email": "petromosta@gmail.com",
        "balance": "0.0000000000",
        "provider": "email",
        "avatar": null,
        "address": "sdafds",
        "phone": "15417083275",
        "password": "$2b$10$FhNVeWPMHFg26aMIWSU1SewrJHXJYCioF3i8L0BuBHna4kK1ECA5i",
        "isEmailConfirmed": true,
        "paymentEmail": "petromosta@gmail.com",
        "uuidEveara": "E1C0A422-CC11-39E2-40F11D4CEC98B685",
        "isSubscribedOnMailing": null,
        "accountStatus": "ACTIVE",
        "thumbnail": null,
        "newEmail": "waraba9253@nmaller.com",
        "createdAt": "2023-06-26T16:48:52.000Z",
        "updatedAt": "2023-07-26T09:34:24.000Z"
    }
}
 */

usersRouter.get("/activateNewEmail", usersController.activateNewEmail);

/**
 * @api {get} /api/users/activateNewEmail/ Activate a new email for user
 * @apiName Get Activate a new email for user
 * @apiGroup API User
 * @apiQuery {string} token `activateToken from email`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 * }
 */

usersRouter.put("/settings", authMiddleware, usersController.editSettings);
/**
 * @api {put} /api/users/settings/ User edit settings account
 * @apiName Put User edit settings account
 * @apiGroup API User
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiBody {String} [firstName]
 * @apiBody {String} [lastName]
 * @apiBody {String} [email]
 * @apiBody {String} [address]
 * @apiBody {String} [phone]
 * @apiBody {String} [paymentEmail] `"" - to set null`
 * @apiBody {String} [number]
 * @apiBody {String} [streetAddressOne] `"" - to set null`
 * @apiBody {String} [streetAddressTwo] `"" - to set null`
 * @apiBody {String} [city] `"" - to set null`
 * @apiBody {String} [regionState] `"" - to set null`
 * @apiBody {String} [postCodeZipCode] `"" - to set null`
 * @apiBody {String} [country] `"" - to set null`
 * @apiBody {String} [uuidEveara]
 * @apiBody {Files} [avatar]
 * @apiBody {boolean} [isNew]
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "settings": {
 *         "id": 536,
 *         "firstName": "firstName785289710",
 *         "lastName": "lastName104584820",
 *         "email": "869568663@mail.com",
 *         "provider": "email",
 *         "avatar": null,
 *         "address": "address505231707",
 *         "phone": "515276",
 *         "password": "$2b$10$mILU77JsA/itBgrJSgyKlOMGbdQNXbQWv9.NliugDmKTaAhu/YtzS",
 *         "isEmailConfirmed": true,
 *         "thumbnail": "thumb_24540144-3c9d-44f9-b922-85498c639de1.jpg",
 *         "number": "5151528",
 *         "streetAddressOne": "streetAddressOne",
 *         "streetAddressTwo": "streetAddressTwo",
 *         "city": "Kyiv",
 *         "regionState": "Region/State",
 *         "postCodeZipCode": "Post Code/Zip Code",
 *         "country": "Ukraine",
 *         "createdAt": "2023-04-07T12:55:23.000Z",
 *         "updatedAt": "2023-04-07T13:02:33.053Z"
 *     }
 * }
 */

usersRouter.get("/", authMiddleware, usersController.getUsers);
/**
 * @api {get} /api/users/ Get users by query params
 * @apiName Get Get users by query params
 * @apiGroup API User
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiQuery {string} search `your email, firstName, lastName or name(firstName or lastName)`
 * @apiQuery {string} type `"email", "firstName", "lastName" or "name" - search by both first and last name`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "users": [
 *         {
 *             "id": 1,
 *             "firstName": "ssfdsf",
 *             "lastName": "sdfsdf",
 *             "email": "ssfdsf@sf.sdf",
 *             "address": null,
 *             "phone": null,
 *             "provider": "email",
 *             "avatar": null,
 *             "isEmailConfirmed": 0,
 *             "password": "$2b$10$8jdzfYQDtTCryvjpWA7qTOvYvcobr.o.gJ2N/506x3.m6q81dgokm",
 *             "number": "5151528",
 *             "streetAddressOne": "streetAddressOne",
 *             "streetAddressTwo": "streetAddressTwo",
 *             "city": "Kyiv",
 *             "regionState": "Region/State",
 *             "postCodeZipCode": "Post Code/Zip Code",
 *             "country": "Ukraine",
 *             "createdAt": "2023-03-03T09:04:07.000Z",
 *             "updatedAt": "2023-03-03T09:04:07.000Z",
 *             "thumbnail": "thumb_24540144-3c9d-44f9-b922-85498c639de1.jpg"
 *         }
 *     ]
 * }
 */

usersRouter.post("/", authMiddleware, usersController.getUsersInfo);
/**
 * @api {post} /api/users/ Get users info by ids
 * @apiName Post Get users info by ids
 * @apiGroup API User
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiBody {array} userIds `array of numbers`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "users": [
 *         {
 *             "id": 1,
 *             "firstName": "ssfdsf",
 *             "lastName": "sdfsdf",
 *             "email": "ssfdsf@sf.sdf",
 *             "address": null,
 *             "phone": null,
 *             "provider": "email",
 *             "avatar": null,
 *             "isEmailConfirmed": 0,
 *             "password": "$2b$10$8jdzfYQDtTCryvjpWA7qTOvYvcobr.o.gJ2N/506x3.m6q81dgokm",
 *             "number": "5151528",
 *             "streetAddressOne": "streetAddressOne",
 *             "streetAddressTwo": "streetAddressTwo",
 *             "city": "Kyiv",
 *             "regionState": "Region/State",
 *             "postCodeZipCode": "Post Code/Zip Code",
 *             "country": "Ukraine",
 *             "createdAt": "2023-03-03T09:04:07.000Z",
 *             "updatedAt": "2023-03-03T09:04:07.000Z",
 *             "thumbnail": "thumb_24540144-3c9d-44f9-b922-85498c639de1.jpg"
 *         }
 *     ]
 * }
 */

usersRouter.delete("/", authMiddleware, usersController.removeAccount);
/**
 * @api {delete} /api/users/ Remove Account
 * @apiName Remove Account
 * @apiGroup API User
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true
 * }
 */

usersRouter.delete("/avatar", authMiddleware, usersController.removeAvatar);
/**
 * @api {delete} /api/users/avatar Remove avatar
 * @apiName Remove avatar
 * @apiGroup API User
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true
 * }
 */

usersRouter.get("/info", authMiddleware, usersController.getMyInfo);
/**
 * @api {get} /api/users/info/ User info yourself
 * @apiName User info yourself
 * @apiGroup API User
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "activateToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ijg2OTU2ODY2M0BtYWlsLmNvbSIsImlkIjo1MzYsImlhdCI6MTY4MDg3MjEyNCwiZXhwIjoxNjgzNDY0MTI0fQ.k3xY-IYA-ZnaiPinXTzeZC4yGjN9dwKqTtiMAM9Ha5M",
 *     "user": {
 *         "isEmailConfirmed": false,
 *         "id": 536,
 *         "firstName": "Mellie",
 *         "lastName": "Hyatt",
 *         "email": "869568663@mail.com",
 *         "password": "$2b$10$mILU77JsA/itBgrJSgyKlOMGbdQNXbQWv9.NliugDmKTaAhu/YtzS",
 *         "provider": "email",
 *         "thumbnail": "thumb_24540144-3c9d-44f9-b922-85498c639de1.jpg",
 *         "number": "5151528",
 *         "streetAddressOne": "streetAddressOne",
 *         "streetAddressTwo": "streetAddressTwo",
 *         "city": "Kyiv",
 *         "regionState": "Region/State",
 *         "postCodeZipCode": "Post Code/Zip Code",
 *         "country": "Ukraine",
 *         "updatedAt": "2023-04-07T12:55:23.639Z",
 *         "createdAt": "2023-04-07T12:55:23.639Z"
 *     }
 * }
 */

//ROUTES FOR ADMINS----------------------------------------------------------------------------------

usersRouter.get("/all", authMiddleware, checkRoleMiddleware, usersController.getUsersAsAdmin);
/**
 * @api {get} /api/users/all Admin Get all users
 * @apiName Get Admin Get all users
 * @apiGroup API User
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiQuery {string} orderBy `Example: "id", "firstName", "lastName", "email", "accountStatus", "signIn"`
 * @apiQuery {string} sortOrder `Example: "ASC", "DESC"`
 * @apiQuery {string} role
 * @apiQuery {string} performers
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "users": [
 *         {
 *             "id": 1,
 *             "firstName": "ssfdsf",
 *             "lastName": "sdfsdf",
 *             "email": "ssfdsf@sf.sdf",
 *             "address": null,
 *             "phone": null,
 *             "provider": "email",
 *             "avatar": null,
 *             "isEmailConfirmed": 0,
 *             "password": "$2b$10$8jdzfYQDtTCryvjpWA7qTOvYvcobr.o.gJ2N/506x3.m6q81dgokm",
 *             "createdAt": "2023-03-03T09:04:07.000Z",
 *             "updatedAt": "2023-03-03T09:04:07.000Z",
 *             "baps": [
 *                 {
 *                     "bapId": 1873,
 *                     "bapName": "bap",
 *                     "avatar": null,
 *                     "role": admin
 *                 }
 *             ],
 *             "token": {
 *                 "lastSignIn": "2023-10-09T11:47:35.000Z"
 *             }
 *         }
 *     ]
 * }
 */

usersRouter.get("/:userId", authMiddleware, usersController.getUserByIdAsAdmin);
/**
 * @api {get} /api/users/:userId Get users by userId as admin
 * @apiName Get Get users by userId as admin
 * @apiGroup API User
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {string} userId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 {
    "success": true,
    "user": {
        "id": 105,
        "firstName": "testName111",
        "lastName": "testName",
        "email": "aaa111@gmail.com",
        "avatar": "2669d0ba-7b25-4391-b8ad-4393f4a256d5.jpg",
        "address": "DFDS, Örnekulans Väg, Kärrdalen, Hisingen, Gothenburg, Göteborgs Stad, Västra Götaland County, 423 59, Sweden",
        "phone": "380637020793",
        "paymentEmail": null,
        "isSubscribedOnMailing": null,
        "accountStatus": "ACTIVE",
        "thumbnail": null,
        "totalAuddRequests": 6,
        "totalWeightTracks": 123,
        "totalInvites": 1,
        "createdAt": "2023-03-13T19:42:26.000Z",
        "updatedAt": "2023-03-14T14:39:18.000Z",
        "baps": [
            {
                "id": 92,
                "name": "fdf",
                "avatar": "3eb49679-8100-43d2-ba22-9d8935d1a953.jpg",
                "role": null
            }
        ],
        "token": {
            "lastSignIn": "2023-10-09T13:32:18.000Z"
        },
        "incomeFees": 886.69
    }
}
 */

usersRouter.get("/filter/uniqueFields", authMiddleware, checkRoleMiddleware, usersController.uniqueFields);
/**
 * @api {get} /api/users/filter/uniqueFields Get unique fields for users
 * @apiName Get unique fields for users
 * @apiGroup API Filter
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
        "uniqueFields": {
                "performers": [
                    "king",
                    "@mail.com885834686",
                    "babName359309951"
                ],
                "roles": [
                    "xxx",
                    "role",
                    "sdfdsf"
                ],
        }
    }
 */

usersRouter.post("/ban/:userId", authMiddleware, checkRoleMiddleware, usersController.banUser);
/**
 * @api {post} /api/users/ban/:userId Ban user by id as admin
 * @apiName Post Ban user by id as admin
 * @apiGroup API User
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {string} userId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true
 * }
 */

usersRouter.post("/unban/:userId", authMiddleware, checkRoleMiddleware, usersController.unbanUser);
/**
 * @api {post} /api/users/unban/:userId Unban user by id as admin
 * @apiName Post Unban user by id as admin
 * @apiGroup API User
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {string} userId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true
 * }
 */

usersRouter.delete("/:userId", authMiddleware, checkRoleMiddleware, usersController.deleteUser);
/**
 * @api {delete} /api/users/:userId Delete user by id as admin
 * @apiName Delete Delete user by id as admin
 * @apiGroup API User
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {string} userId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true
 * }
 */

export default usersRouter;
