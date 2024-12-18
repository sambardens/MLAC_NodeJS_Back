import { Router } from "express";
import authMiddleware from "../../auth/auth.middleware.js";
import reportsController from "./reports.controller.js";

const reportsRouter = new Router();

reportsRouter.get("/stream", authMiddleware, reportsController.streamReport);
/**
 * @api {get} /api/eveara/reports/stream Reports - Stream report
 * @apiName Stream report
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiQuery {string} uuidEveara
 * @apiQuery {string} reportType `Report type determines the type of stream report. Accepted values are country, store, album and track`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "message": "2 records found",
 *     "success": true,
 *     "data": [
 *         {
 *             "play_count": 1,
 *            "country_name": "Angola",
 *             "country_code": "AO"
 *         },
 *         {
 *             "play_count": 3,
 *             "country_name": "Antigua and Barbuda",
 *             "country_code": "AG"
 *         }
 *     ],
 *     "status_code": 200
 * }
 */

reportsRouter.get("/sales", authMiddleware, reportsController.salesReport);
/**
 * @api {get} /api/eveara/reports/sales Reports - Sales report
 * @apiName Sales report
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiQuery {string} uuidEveara
 * @apiQuery {string} reportType `Report type determines the type of stream report. Accepted values are country, store, album and track`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "currency": "USD",
 *     "message": "1 records found",
 *     "success": true,
 *     "data": [
 *         {
 *             "album_name": "MyTest",
 *             "eanupc": "5055829872111",
 *             "release_id": 100000314902,
 *             "amount": "0.0016541561",
 *             "play_count": 3
 *         }
 *     ],
 *     "status_code": 200
 * }
 */

reportsRouter.get("/download", authMiddleware, reportsController.downloadReport);
/**
 * @api {get} /api/eveara/reports/download Reports - Download report
 * @apiName Download report
 * @apiGroup API Eveara
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiQuery {string} uuidEveara
 * @apiQuery {string} reportType `Report type determines the type of stream report. Accepted values are country, store, album and track`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "message": "1 records found",
 *     "success": true,
 *     "data": [
 *         {
 *             "album_name": "MyTest",
 *             "eanupc": "5055829872111",
 *             "release_id": 100000314902,
 *             "download_count": 0
 *         }
 *     ],
 *     "status_code": 200
 * }
 */

reportsRouter.get("/summary/total/stream/:uuidEveara", authMiddleware, reportsController.getSummary);
/**
 * @api {get} /api/eveara/reports/stream/:uuidEveara Reports - Get summary
 * @apiName Get summary
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
 *     "message": "Succesfully fetched total stream details",
 *     "success": true,
 *     "data": {
 *         "total_streams": 6020598
 *     }
 * }
 */

export default reportsRouter;
