import { Router } from "express";
import MailingController from "./mailing.controller.js";
import authMiddleware from "../auth/auth.middleware.js";

const mailingRouter = new Router();

mailingRouter.post("/subscribe", MailingController.subscribe);

/**
 * @api {post} /api/mailing/subscribe User subscribe
 * @apiName Post User subscribe
 * @apiGroup API Mailing
 * @apiBody {number} userId
 * @apiBody {number} bapId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *         "id": 1,
 *         "userId": 1222,
 *         "bapId": 123,
 *         "firstName": "Molly",
 *         "lastName": "Smit",
 *         "email": "test@mail.com",
 *         "createdAt": "2023-04-07T12:55:36.000Z",
 *         "updatedAt": "2023-04-07T12:55:36.000Z"
 * }
 */

mailingRouter.get("/:bapId", MailingController.getMailingList);

/**
 * @api {get} /api/mailing/:bapId Get mailing list
 * @apiName Get mailing list
 * @apiGroup API Mailing
 * @apiParam {number} bapId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * [
 *      {
 *         "id": 1,
 *         "userId": 1222,
 *         "bapId": 123,
 *         "firstName": "Molly",
 *         "lastName": "Smit",
 *         "email": "869568663@mail.com",
 *         "createdAt": "2023-04-07T12:55:36.000Z",
 *         "updatedAt": "2023-04-07T12:55:36.000Z"
 *      },
 *      {
 *         "id": 2,
 *         "userId": 1223,
 *         "bapId": 124,
 *         "firstName": "Molly2",
 *         "lastName": "Smit2",
 *         "email": "869568000@mail.com",
 *         "createdAt": "2023-04-07T12:57:36.000Z",
 *         "updatedAt": "2023-04-07T12:57:36.000Z"
 *      }
 * ]
 */

mailingRouter.get("/subscribes/:userId", MailingController.getUserSubscribes);

/**
 * @api {get} /api/mailing/subscribes/:userId Get user subscribes
 * @apiName Post Get user subscribes
 * @apiGroup API Mailing
 * @apiParam {number} userId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "bapIds": [
 *         111,
 *         112,
 *         113
 *      ]
 * }
 */

mailingRouter.delete("/", MailingController.deleteUsersFromMailList);

/**
 * @api {delete} /api/mailing/ Delete users from mailing list
 * @apiName Delete users from mailing list
 * @apiGroup API Mailing
 * @apiBody {number} bapId
 * @apiBody {array} userIds `[1, 2, 3, 4, 5]`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *         "message": "these users deleted"
 * }
 */

export default mailingRouter;
