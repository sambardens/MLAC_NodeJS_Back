import {Router} from "express";
import CustomersShopController from "./customers-shop.controller.js";
import authMiddleware from "../../auth/auth.middleware.js";

const customersShopRouter = new Router()

customersShopRouter.post('/basket/:shopId', authMiddleware, CustomersShopController.addTrackToBasket)
/**
 * @api {post} /api/customers/shops/basket/:shopId Add track to basket
 * @apiName Post Add track to basket
 * @apiGroup API Customers-Shop
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} shopId
 * @apiBody {array} trackIds `[1, 2, 3, 4, 5, 6]`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true
 * }
 */

customersShopRouter.delete('/basket/:shopId', authMiddleware, CustomersShopController.removeTrackFromBasket)
/**
 * @api {delete} /api/customers/shops/basket/:shopId Remove track from basket
 * @apiName Delete Remove track from basket
 * @apiGroup API Customers-Shop
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} shopId
 * @apiBody {number} trackId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true
 * }
 */

customersShopRouter.get('/basket/:shopId', authMiddleware, CustomersShopController.getTracksFromBasket)
/**
 * @api {get} /api/customers/shops/basket/:shopId Get tracks from basket
 * @apiName Get Get tracks from basket
 * @apiGroup API Customers-Shop
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} shopId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "basket": [
 *         {
 *             "shopId": 1,
 *             "shopName": "sfsdfz",
 *             "trackName": "name",
 *             "uniqueName": "98747c7a-da04-49c6-a792-0287d5606af4.mp3",
 *             "trackId": 33,
 *             "basketId": 7
 *         }
 *     ]
 * }
 */

export default customersShopRouter