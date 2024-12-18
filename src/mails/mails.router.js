import {Router} from "express";
import mailsController from "./mails.controller.js";
import authMiddleware from "../auth/auth.middleware.js";

const mailsRouter = new Router()

mailsRouter.post('/sendLinkPassword', mailsController.sendLinkRecoveryPassword)

/**
 * @api {post} /api/mails/sendLinkPassword/ Mail send link recovery password
 * @apiName Post Mail send link recovery password
 * @apiGroup API Mails
 * @apiBody {String} email
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "message": "Successfully",
 * }
 */


export default mailsRouter