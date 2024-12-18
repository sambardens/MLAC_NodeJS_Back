import {Router} from "express";
import PaymentController from "./payment.controller.js";
import authMiddleware from "../../auth/auth.middleware.js";

const paymentRouter = new Router()

paymentRouter.post('/', authMiddleware, PaymentController.payment)
/**
 * @api {post} /api/customers/payment/ Payment for tracks
 * @apiName Post Payment for tracks
 * @apiGroup API Customers-Payment
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiQuery {number} purchaseLocationTypeId `id: 1 - shop. id: 2 - landing`
 * @apiQuery {number} purchaseLocationId `it's of shop or landing`
 * @apiBody {string} paymentEmail
 * @apiBody {number} invoiceId  `Invoice from PayPal`
 * @apiBody {object} trackIds    `Object keys is releaseId and value is trackIds as array`
 * @apiParamExample {json} Request-Example:
 * {
 *     "paymentEmail": "raceg14sf552@jwsuns.com",
 *     "trackIds": {
 *          1984: [2358, 15489]
 *      },
 *     "invoiceId: "6789"
 *     "tips": 12
 * }
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true
 * }
 */

export default paymentRouter