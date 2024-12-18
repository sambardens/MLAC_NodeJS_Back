import { Router } from "express";
import IncomesController from "./incomes.controller.js";
import authMiddleware from "../auth/auth.middleware.js";
import authCheckRoleMiddleware from "../auth/auth.checkRoleMiddleware.js";

const incomesRouter = new Router();

incomesRouter.get("/", authMiddleware, IncomesController.getIncomes);
/**
 * @api {get} /api/incomes Get incomes
 * @apiName Get Get incomes
 * @apiGroup API Incomes
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiQuery {number} [bapId]
 * @apiQuery {number} [releaseId]
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "incomes": [
 *         {
 *             "id": 1534,
 *             "createdAt": "2023-09-22T16:46:56.000Z",
 *             "bapName": "bap",
 *             "gross": "0.000",
 *             "fees": "0.0000",
 *             "net": "0.0000",
 *             "tips": 0,
 *             "tracks": [
 *                 {
 *                     "name": "syluet",
 *                     "uniqueName": "e390d59e-7908-435a-8fca-a411282168af.mp3",
 *                     "id": 2724,
 *                     "releaseName": "release"
 *                 },
 *                 {
 *                     "name": "love",
 *                     "uniqueName": "7f936017-366b-4569-9fab-37dcde251abd.mp3",
 *                     "id": 2760,
 *                     "releaseName": "releaseee"
 *                 }
 *             ]
 *         },
 *     ],
 *     "incomeGross": 0
 * }
 */

incomesRouter.get("/:incomeId", authMiddleware, IncomesController.getIncomeById);
/**
 * @api {get} /api/incomes/:incomeId Get incomes by id
 * @apiName Get Get incomes by id
 * @apiGroup API Incomes
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} incomeId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "success": true,
    "income": {
        "id": 1350,
        "invoiceId": 0,
        "paymentEmail": "sb-kq9mi26003566-2@personal.example.com",
        "bapName": null,
        "date": "2023-07-25T08:28:00.000Z",
        "gross": "310.000",
        "fees": "31.0000",
        "net": "279.0000",
        "tips": 0,
        "tracks": [
            {
                "id": 1291,
                "trackName": "ONEIL_ORGAN_FAVIA",
                "releaseName": null,
                "price": "4.000",
                "splitUsers": [
                    {
                        "id": 1246,
                        "email": "Admin",
                        "ownership": "100",
                        "reviewed": null,
                        "signature": null,
                        "createdAt": null,
                        "updatedAt": null,
                        "splitId": null,
                        "firstName": "Admin",
                        "lastName": "Admin"
                    }
                ]
            },
            {
                "id": 1333,
                "trackName": "songWithoutSplit",
                "releaseName": null,
                "price": "101.000",
                "splitUsers": [
                    {
                        "id": 1257,
                        "email": "qwerty89@gmail.com",
                        "ownership": "100",
                        "reviewed": true,
                        "signature": "signature/367/944",
                        "createdAt": "2023-07-26T14:19:52.000Z",
                        "updatedAt": "2023-07-26T14:19:52.000Z",
                        "splitId": 835,
                        "firstName": "Vlad",
                        "lastName": "Sch"
                    }
                ]
            }
        ],
        "customerPayment": 279
    }
}
 */

// ADMIN ROUTS------------------------------------------------------------------------------------------------------------------------------------------------------

incomesRouter.get("/admin/transactions", authMiddleware, authCheckRoleMiddleware, IncomesController.getTransactions);
/**
 * @api {get} /api/incomes/admin/transactions Admin Get all transactions
 * @apiName Get Admin Get all transactions
 * @apiGroup API Incomes
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiQuery {String} orderBy `Example: "id", "paymentEmail", "createdAt", "price"`
 * @apiQuery {string} sortOrder `Example: "ASC", "DESC"`
 * @apiQuery {String} date `Number of days, for example date=30`
 * @apiQuery {String} buyer
 * @apiQuery {string} releaseType
 * @apiQuery {string} performer
 * @apiQuery {string} mainGenre
 * @apiQuery {string} subGenres
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "success": true,
    "income": {
        "incomes": [
            {
                "id": 2,
                "createdAt": "2023-06-12T11:50:51.000Z",
                "bapName": "random band name",
                "gross": "5.000",
                "fees": "0.5000",
                "net": "4.5000",
                "tracks": []
            },
            {
                "id": 1,
                "createdAt": "2023-06-12T10:56:03.000Z",
                "bapName": "random band name",
                "gross": "5.000",
                "fees": "0.5000",
                "net": "4.5000",
                "tracks": []
            }
        ],
        "incomeGross": 10,
        "incomeFees": 1,
        "incomeNet": 9
    }
}
 */

incomesRouter.get("/admin/transactions/:transactionId", authMiddleware, authCheckRoleMiddleware, IncomesController.getTransactionById);
/**
 * @api {get} /api/incomes/admin/transactions/:transactionId Admin Get transaction by id
 * @apiName Get Admin Get transaction by id
 * @apiGroup API Incomes
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {Number} transactionId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "success": true,
    "income": {
        "incomes": [
            {
                "id": 2,
                "createdAt": "2023-06-12T11:50:51.000Z",
                "bapName": "random band name",
                "gross": "5.000",
                "fees": "0.5000",
                "net": "4.5000",
                "tracks": []
            },
            {
                "id": 1,
                "createdAt": "2023-06-12T10:56:03.000Z",
                "bapName": "random band name",
                "gross": "5.000",
                "fees": "0.5000",
                "net": "4.5000",
                "tracks": []
            }
        ],
        "incomeGross": 10,
        "incomeFees": 1,
        "incomeNet": 9
    }
}
 */

incomesRouter.get("/filter/uniqueFields", authMiddleware, authCheckRoleMiddleware, IncomesController.uniqueFields);
/**
 * @api {get} /api/incomes/filter/uniqueFields Get unique fields for transactions
 * @apiName Get Get unique fields for transactions
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
                "paymentEmail": [
                    "qwerty89@gmail.com",
                    "sb-kq9mi26003566@personal.example.com",
                    "raceg14sf552@jwsuns.com"
                ],
                "releaseTypes": [
                    "tyypeeee",
                    "type",
                    "typeName306416"
                ],
                "performer": [
                    "king",
                    "@mail.com885834686",
                    "babName359309951"
                ],
                "genres": [
                    "Alternative",
                    "Anime",
                    "Blues"
                ],
                "subGenres": [
                    "Art Punk",
                    "Alternative Rock",
                    "Britpunk"
                ]
        }
    }
 */

export default incomesRouter;
