import {Router} from "express";
import brandsController from "./brands.controller.js";
import authMiddleware from "../auth/auth.middleware.js";

const brandsRouter = new Router()

brandsRouter.get('/:bapId', authMiddleware, brandsController.getBrandInfo)
/**
 * @api {get} /api/brands/:bapId Get brand info by bap
 * @apiName Get Get brand info by bap
 * @apiGroup API Brand
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} bapId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "brand": {
 *         "id": 7,
 *         "name": "Brand Kit",
 *         "paletteName": "New palette",
 *         "logo": null,
 *         "designId": null,
 *         "createdAt": "2023-04-27T07:56:58.000Z",
 *         "updatedAt": "2023-04-27T07:56:58.000Z",
 *         "bapId": 560,
 *         "fonts": [],
 *         "palette": [
 *             {
 *                 "id": 1,
 *                 "hex": "sfsdf",
 *                 "createdAt": "2222-11-11T00:00:00.000Z",
 *                 "updatedAt": "2222-11-11T00:00:00.000Z",
 *                 "brandId": 7
 *             }
 *         ]
 *     }
 * }
 */

brandsRouter.put('/:brandId', authMiddleware, brandsController.editBrandFullInfo)
/**
 * @api {put} /api/brands/:brandId Edit brand main info
 * @apiName Put Edit brand main info
 * @apiGroup API Brand
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} brandId
 * @apiBody {string} [paletteName]
 * @apiBody {string} [name]
 * @apiBody {string} [urlLogo] `url to image from canva`
 * @apiBody {file} [logo]
 * @apiBody {string} [designId] `id of image from canva`
 * @apiBody {array} [fonts] `array with fields: "font", "size", "italic", "weight"`
 * @apiParamExample {json} Request-Example:
 * {
 *     "fonts": [{
 *         "font": "Arial",
 *         "size": 25
 *     }],
 *     "name": "btc",
 *     "paletteName": "eth",
 *     "urlLogo": "https://export-download.canva.com/sdfzsdf",
 *     "designId": "AJsd514s"
 * }
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "brand": {
 *         "palette": [
 *             {
 *                 "id": 41,
 *                 "hex": "FFFF00",
 *                 "createdAt": "2023-04-28T11:16:32.000Z",
 *                 "updatedAt": "2023-04-28T11:16:32.000Z",
 *                 "brandId": 7
 *             },
 *             {
 *                 "id": 44,
 *                 "hex": "#FFF000",
 *                 "createdAt": "2023-04-28T11:18:56.000Z",
 *                 "updatedAt": "2023-04-28T11:18:56.000Z",
 *                 "brandId": 7
 *             }
 *         ],
 *         "fonts": [
 *             {
 *                 "id": 77,
 *                 "font": "Arial",
 *                 "size": 25,
 *                 "italic": null,
 *                 "weight": null,
 *                 "createdAt": "2023-04-28T11:16:32.000Z",
 *                 "updatedAt": "2023-04-28T11:16:32.000Z",
 *                 "brandId": 7
 *             }
 *         ],
 *         "main": {
 *             "id": 7,
 *             "name": "btc",
 *             "paletteName": "eth",
 *             "logo": "https://export-download.canva.com/sdfzsdf",
 *             "designId": "AJsd514s",
 *             "createdAt": "2023-04-27T07:56:58.000Z",
 *             "updatedAt": "2023-04-28T11:17:39.000Z",
 *             "bapId": 560
 *         }
 *     }
 * }
 */

brandsRouter.delete('/:brandId', authMiddleware, brandsController.removeBrand)
/**
 * @api {delete} /api/brands/:brandId Remove brand
 * @apiName Delete Remove brand
 * @apiGroup API Brand
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} brandId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true
 * }
 */

brandsRouter.put('/palette/:brandId', authMiddleware, brandsController.editBrandPalette)
/**
 * @api {put} /api/brands/palette/:brandId Edit palette of brand
 * @apiName Put Edit palette of brand
 * @apiGroup API Brand
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} brandId
 * @apiBody {string} brandPaletteName
 * @apiBody {array} hex
 * @apiParamExample {json} Request-Example:
 * {
 *     "brandPaletteName": "asdasd",
 *     "hex": [
 *         "#FFFF00",
 *         "#FF0000",
 *     ]
 * }
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "palette": [
 *         {
 *             "id": 3,
 *             "name": "asddd",
 *             "createdAt": "2023-05-17T09:56:27.000Z",
 *             "updatedAt": "2023-05-17T09:56:27.000Z",
 *             "brandId": 7,
 *             "colours": [
 *                 {
 *                     "id": 8,
 *                     "hex": "asdasdasd",
 *                     "createdAt": "2023-05-17T09:56:35.000Z",
 *                     "updatedAt": "2023-05-17T09:56:35.000Z",
 *                     "brandPaletteNameId": 3,
 *                     "brandId": 7
 *                 },
 *                 {
 *                     "id": 9,
 *                     "hex": "testttttt",
 *                     "createdAt": "2023-05-17T09:56:46.000Z",
 *                     "updatedAt": "2023-05-17T09:56:46.000Z",
 *                     "brandPaletteNameId": 3,
 *                     "brandId": 7
 *                 }
 *             ]
 *         }
 *     ]
 * }
 */

brandsRouter.delete('/palette/:brandId', authMiddleware, brandsController.removeBrandPalette)
/**
 * @api {delete} /api/brands/palette/:brandId Remove palette of brand
 * @apiName Delete Remove palette of brand
 * @apiGroup API Brand
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} brandId
 * @apiBody {string} brandPaletteName
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true
 * }
 */

export default brandsRouter