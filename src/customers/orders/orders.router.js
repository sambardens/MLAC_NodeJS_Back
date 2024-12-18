import {Router} from "express";
import OrdersController from "./orders.controller.js";
import authMiddleware from "../../auth/auth.middleware.js";

export const ordersRouter = new Router()

ordersRouter.get('/', authMiddleware, OrdersController.getOrders)
/**
 * @api {get} /api/customers/orders/ Get orders
 * @apiName Get Get orders
 * @apiGroup API Customers-Order
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
 *     "orders": [
 *         {
 *             "id": 25,
 *             "createdAt": "2023-06-13T08:49:25.000Z",
 *             "bapName": "creamy",
 *             "releaseName": "test",
 *             "trackName": "1473123940.mp3",
 *             "gross": "10.000",
 *             "contractId": null,
 *             "trackId": 1051,
 *             "releaseLogo": "https://export-download.canva.com/tA_EI/DAFkrFtA_EI/2/0/0001-328029038307322220.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHKNGJLC2J7OGJ6Q%2F20230602%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230602T064400Z&X-Amz-Expires=23364&X-Amz-Signature=acf5e9bae7c99de4850ea64c5a67d18e990fd71d34e95afc03bfed10e6dbda81&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%2A%3DUTF-8%27%27Untitled%2520design.png&response-expires=Fri%2C%2002%20Jun%202023%2013%3A13%3A24%20GMT"
 *         }
 *     ]
 * }
 */

export default ordersRouter