import { Router } from "express";
import WithdrawController from "./withdrawals.controller.js";
import authMiddleware from "../auth/auth.middleware.js";
import authCheckRoleMiddleware from "../auth/auth.checkRoleMiddleware.js";

const withdrawalsRouter = new Router();

withdrawalsRouter.post("/", authMiddleware, WithdrawController.createWithdraw);
/**
 * @api {put} /api/withdrawals/ Create withdrawals
 * @apiName Create withdrawals
 * @apiGroup API Withdrawals
 * @apiBody {number} amount `amount cash for withdrawal`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "withdraw": {
 *         "isReviewed": false,
 *         "isApproved": false,
 *         "id": 5,
 *         "userId": 4,
 *         "amount": 100,
 *         "paymentEmail": "werewrwerwerwer@sdfs.dfdsf",
 *         "updatedAt": "2023-06-22T13:18:05.218Z",
 *         "createdAt": "2023-06-22T13:18:05.218Z"
 *     }
 * }
 */

withdrawalsRouter.get("/", authMiddleware, WithdrawController.getWithdrawals);
/**
 * @api {get} /api/withdrawals/ Get withdrawals
 * @apiName Get withdrawals
 * @apiGroup API Withdrawals
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "withdraws": [
            {
                "id": 1,
                "amount": "10.000",
                "isReviewed": true,
                "isApproved": false,
                "paymentEmail": "sname.parser123@gmail.com",
                "createdAt": "2023-06-01T07:49:38.000Z",
                "updatedAt": "2023-06-01T07:49:38.000Z",
                "userId": 4,
            },
            {
                "id": 2,
                "amount": "10.000",
                "isReviewed": true,
                "isApproved": false,
                "paymentEmail": "sname.parser123@gmail.com",
                "createdAt": "2023-06-01T07:59:16.000Z",
                "updatedAt": "2023-06-01T07:59:16.000Z",
                "userId": 4,
            }
 *     ]
 * }
 */

//ROUTES FOR ADMINS----------------------------------------------------------------------------------------------

withdrawalsRouter.get("/admin", authMiddleware, authCheckRoleMiddleware, WithdrawController.getAllWithdrawsAsAdmin);
/**
 * @api {get} /api/withdrawals/admin Get withdrawals as Admin
 * @apiName Get withdrawals as Admin
 * @apiGroup API Withdrawals
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "withdraws": [
 *          {
                "id": 1,
                "amount": "10.000",
                "isReviewed": true,
                "isApproved": false,
                "paymentEmail": "sname.parser123@gmail.com",
                "createdAt": "2023-06-01T07:49:38.000Z",
                "updatedAt": "2023-06-01T07:49:38.000Z",
                "userId": 4,
                "firstName": "SASHA",
                "lastName": "qwe"
            },
            {
                "id": 2,
                "amount": "10.000",
                "isReviewed": true,
                "isApproved": false,
                "paymentEmail": "sname.parser123@gmail.com",
                "createdAt": "2023-06-01T07:59:16.000Z",
                "updatedAt": "2023-06-01T07:59:16.000Z",
                "userId": 4,
                "firstName": "SASHA",
                "lastName": "qwe"
            }
 *     ]
 * }
 */

withdrawalsRouter.put("/admin/:withdrawalId", authMiddleware, authCheckRoleMiddleware, WithdrawController.updateWithdrawal);
/**
 * @api {Put} /api/withdrawals/admin/:withdrawalId Update withdrawal as Admin
 * @apiName Update withdrawal as Admin
 * @apiGroup API Withdrawals
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *  }
 * @apiParam {string} withdrawalId
 * @apiBody {string} [isReviewed] `true/false`
 * @apiBody {string} [isApproved] `true/false`
 */

export default withdrawalsRouter;
