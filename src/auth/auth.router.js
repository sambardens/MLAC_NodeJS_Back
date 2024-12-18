import {Router} from 'express'
import authController from "./auth.controller.js";
import authMiddleware from "./auth.middleware.js";

const authRouter = new Router()

authRouter.post('/signup', authController.signUp)

/**
 * @api {post} /api/auth/signup/ User signUp
 * @apiName Post User signUp
 * @apiGroup API User
 * @apiBody {String} email
 * @apiBody {String} firstName
 * @apiBody {String} lastName
 * @apiBody {String} password
 * @apiBody {String} [provider] `The name of the service you are signUp with (Google, Facebook, Spotify). If email - not require`
 * @apiQuery {String} [token] `unique token for accept invite`
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
 *         "updatedAt": "2023-04-07T12:55:23.639Z",
 *         "createdAt": "2023-04-07T12:55:23.639Z"
 *     }
 * }
 */

authRouter.post('/signin', authController.signIn)

/**
 * @api {post} /api/auth/signin/ User signIn
 * @apiName Post User signIn
 * @apiGroup API User
 * @apiBody {String} email
 * @apiBody {String} password
 * @apiQuery {String} [token] `unique token for accept invite`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTM2LCJlbWFpbCI6Ijg2OTU2ODY2M0BtYWlsLmNvbSIsImZpcnN0TmFtZSI6Ik1lbGxpZSIsImxhc3ROYW1lIjoiSHlhdHQiLCJpc0VtYWlsQ29uZmlybWVkIjp0cnVlLCJpYXQiOjE2ODA4NzIzNDEsImV4cCI6MTY4MzQ2NDM0MX0.IaR0LB_5ti2ls99TlyA-JCvDzkqvUo4HzKtN_SCawIY",
 *     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTM2LCJlbWFpbCI6Ijg2OTU2ODY2M0BtYWlsLmNvbSIsImZpcnN0TmFtZSI6Ik1lbGxpZSIsImxhc3ROYW1lIjoiSHlhdHQiLCJpc0VtYWlsQ29uZmlybWVkIjp0cnVlLCJpYXQiOjE2ODA4NzIzNDEsImV4cCI6MTY4MzQ2NDM0MX0.29ArCHqPoBOBYl9vFuJFw06yfyIlUnDJnccJfzl5HJ4",
 *     "user": {
 *         "id": 536,
 *         "firstName": "Mellie",
 *         "lastName": "Hyatt",
 *         "email": "869568663@mail.com",
 *         "provider": "email",
 *         "avatar": null,
 *         "address": null,
 *         "phone": null,
 *         "password": "$2b$10$mILU77JsA/itBgrJSgyKlOMGbdQNXbQWv9.NliugDmKTaAhu/YtzS",
 *         "isEmailConfirmed": true,
 *         "createdAt": "2023-04-07T12:55:23.000Z",
 *         "updatedAt": "2023-04-07T12:58:58.000Z"
 *     }
 * }
 */

authRouter.post('/logout', authController.logout)

/**
 * @api {post} /api/auth/logout/ User logout
 * @apiName Post User logout
 * @apiGroup API User
 * @apiHeader (Cookies) {String} refreshToken `JWT refreshToken token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJzbmFtZS5wYXJzZXIxMjNAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiMTIzIiwibGFzdE5hbWUiOiJxd2UiLCJpc0VtYWlsQ29uZmlybWVkIjp0cnVlLCJpYXQiOjE2Nzk5MTkyNTEsImV4cCI6MTY4MjUxMTI1MX0.z6Qy2hijV6PJ01Dt3kBcEuSp2SEApfkgRcM92-Kdy6A"
 * }
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "message": "Logout successfully!"
 * }
 */

authRouter.get('/refresh', authController.refresh)

/**
 * @api {get} /api/auth/refresh/ User refresh
 * @apiName Post User refresh
 * @apiGroup API User
 * @apiHeader (Cookies) {String} refreshToken `JWT refreshToken token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJzbmFtZS5wYXJzZXIxMjNAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiMTIzIiwibGFzdE5hbWUiOiJxd2UiLCJpc0VtYWlsQ29uZmlybWVkIjp0cnVlLCJpYXQiOjE2Nzk5MTkyNTEsImV4cCI6MTY4MjUxMTI1MX0.z6Qy2hijV6PJ01Dt3kBcEuSp2SEApfkgRcM92-Kdy6A"
 * }
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "tokens": {
 *         "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJzbmFtZS5wYXJzZXIxMjNAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiZHNmZHMiLCJsYXN0TmFtZSI6InNkZnNkZiIsImlhdCI6MTY3ODQ0NjI4MiwiZXhwIjoxNjgxMDM4MjgyfQ.jj3Jrz0hIwznkpDCZ2jS_xY20WibMVTT9uDt5HvJTFg",
 *         "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJzbmFtZS5wYXJzZXIxMjNAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiZHNmZHMiLCJsYXN0TmFtZSI6InNkZnNkZiIsImlhdCI6MTY3ODQ0NjI4MiwiZXhwIjoxNjgxMDM4MjgyfQ.LjEK8PD5zzXVdKFxAo4W2lqM4MJIiBPLBEfFf5zOD5c"
 *     }
 * }
 */

authRouter.get('/activate', authController.activateAccount)

/**
 * @api {Get} /api/auth/activate/ User activate account
 * @apiName Get User activate account
 * @apiGroup API User
 * @apiQuery {string} token `activateToken from singUp`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 * }
 */

authRouter.post('/social', authController.signSocial)
/**
 * @api {post} /api/auth/social/ Sign with social
 * @apiName Post Sign with social
 * @apiGroup API User
 * @apiQuery {String} [token] `unique token for accept invite`
 * @apiBody {String} email
 * @apiBody {String} firstName
 * @apiBody {String} authToken
 * @apiBody {String} [lastName]
 * @apiBody {String} [urlAvatar]
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzAxLCJlbWFpbCI6InJleG9uaTM5MzhAcGl4aWlsLmNvbSIsImZpcnN0TmFtZSI6InNzaCIsImlzRW1haWxDb25maXJtZWQiOmZhbHNlLCJpYXQiOjE2ODI2NzEyNDksImV4cCI6MTY4NTI2MzI0OX0.mgSpwziMJmDHBYlrXvYl_8sbTF-q6H6KI4zJVL_U1_8",
 *     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzAxLCJlbWFpbCI6InJleG9uaTM5MzhAcGl4aWlsLmNvbSIsImZpcnN0TmFtZSI6InNzaCIsImlzRW1haWxDb25maXJtZWQiOmZhbHNlLCJpYXQiOjE2ODI2NzEyNDksImV4cCI6MTY4NTI2MzI0OX0.7SOh0aW-2vF1RKXCIXe3qOc9cV8rIoGvEE1WMkd9eO0",
 *     "user": {
 *         "provider": "email",
 *         "isEmailConfirmed": false,
 *         "id": 701,
 *         "firstName": "ssh",
 *         "email": "rexoni3938@pixiil.com",
 *         "password": "$2b$10$lQCDRFpgkTag2IxEHNypouz8/e0zPC.MohiJkAZXrj96OOo4Ojj3K",
 *         "updatedAt": "2023-04-28T08:40:49.364Z",
 *         "createdAt": "2023-04-28T08:40:49.364Z"
 *     }
 * }
 */


//ADMIN ROUTES----------------------------------------------------------------------------------------------------


authRouter.post('/admin/signin', authController.signInAsAdmin)

/**
 * @api {post} /api/auth/admin/signin/ Admin signIn
 * @apiName Post Admin signIn
 * @apiGroup API User
 * @apiBody {String} email
 * @apiBody {String} password
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTM2LCJlbWFpbCI6Ijg2OTU2ODY2M0BtYWlsLmNvbSIsImZpcnN0TmFtZSI6Ik1lbGxpZSIsImxhc3ROYW1lIjoiSHlhdHQiLCJpc0VtYWlsQ29uZmlybWVkIjp0cnVlLCJpYXQiOjE2ODA4NzIzNDEsImV4cCI6MTY4MzQ2NDM0MX0.IaR0LB_5ti2ls99TlyA-JCvDzkqvUo4HzKtN_SCawIY",
 *     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTM2LCJlbWFpbCI6Ijg2OTU2ODY2M0BtYWlsLmNvbSIsImZpcnN0TmFtZSI6Ik1lbGxpZSIsImxhc3ROYW1lIjoiSHlhdHQiLCJpc0VtYWlsQ29uZmlybWVkIjp0cnVlLCJpYXQiOjE2ODA4NzIzNDEsImV4cCI6MTY4MzQ2NDM0MX0.29ArCHqPoBOBYl9vFuJFw06yfyIlUnDJnccJfzl5HJ4",
 *     "user": {
 *         "id": 536,
 *         "firstName": "Mellie",
 *         "lastName": "Hyatt",
 *         "email": "869568663@mail.com",
 *         "provider": "email",
 *         "avatar": null,
 *         "address": null,
 *         "phone": null,
 *         "password": "$2b$10$mILU77JsA/itBgrJSgyKlOMGbdQNXbQWv9.NliugDmKTaAhu/YtzS",
 *         "isEmailConfirmed": true,
 *         "createdAt": "2023-04-07T12:55:23.000Z",
 *         "updatedAt": "2023-04-07T12:58:58.000Z"
 *     }
 * }
 */

export default authRouter