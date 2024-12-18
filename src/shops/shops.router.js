import { Router } from "express";
import ShopsController from "./shops.controller.js";

const shopsRouter = new Router();

shopsRouter.post("/create/:bapId", ShopsController.createShop);
/**
 * @api {post} /api/shops/create/:bapId Create shop
 * @apiName Post Create shop
 * @apiGroup API Shop
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} bapId
 * @apiBody {string} name
 * @apiBody {string} [metaTitle]
 * @apiBody {string} [metaDescription]
 * @apiBody {string} [facebookPixel]
 * @apiBody {string} [positionTypeId]
 * @apiBody {string} [urlFavicon]
 * @apiBody {string} [urlBackground]
 * @apiBody {number} backgroundBlur `0 <= x <= 100`
 * @apiBody {file} [favicon]
 * @apiBody {file} [background]
 * @apiBody {file} [logo]
 * @apiBody {file} [banner]
 * @apiBody {string} [bannerType] `must be a 'string' or 'video', reset - ''`
 * @apiBody {boolean} [showSocialLinks]
 * @apiBody {string} [socialLinksType] `must be a 'white', 'black' or 'colour'`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "shop": {
 *         "id": 4,
 *         "name": "asdasd",
 *         "banner": "69b8d284-f3a1-409a-a0d6-92fc7f2bb28f.jpg"
 *         "bannerType": "image",
 *         "showSocialLinks": false,
 *         "socialLinksType": "white",
 *         "favicon": "https://export-download.canva.com/dsfdsfsdf",
 *         "background": "https://export-download.canva.com/dsfdsfsdf",
 *         "updatedAt": "2023-05-16T12:44:51.252Z",
 *         "createdAt": "2023-05-16T12:44:51.252Z"
 *     }
 * }
 */

shopsRouter.put("/edit/:shopId", ShopsController.editSettings);
/**
 * @api {put} /api/shops/edit/:shopId Edit shop
 * @apiName Put Edit shop
 * @apiGroup API Shop
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} shopId
 * @apiBody {number} bapId
 * @apiBody {string} name
 * @apiBody {string} [metaTitle] `if the string is empty, then the field is set to null`
 * @apiBody {string} [metaDescription] `if the string is empty, then the field is set to null`
 * @apiBody {string} [facebookPixel] `if the string is empty, then the field is set to null`
 * @apiBody {string} [positionTypeId]
 * @apiBody {string} [urlFavicon]
 * @apiBody {string} [urlBackground]
 * @apiBody {string} [urlBanner]
 * @apiBody {string} [urlLogo]
 * @apiBody {file} [favicon]
 * @apiBody {file} [background]
 * @apiBody {file} [logo]
 * @apiBody {file} [banner]
 * @apiBody {string} [bannerType] `must be a 'string' or 'video', reset - ''`
 * @apiBody {boolean} [showSocialLinks]
 * @apiBody {string} [socialLinksType] `must be a 'white', 'black' or 'colour'`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "shop": {
 *         "id": 4,
 *         "name": "asdasd",
 *         "banner": "69b8d284-f3a1-409a-a0d6-92fc7f2bb28f.jpg"
 *         "bannerType": "image",
 *         "showSocialLinks": false,
 *         "socialLinksType": "white",
 *         "favicon": "https://export-download.canva.com/dsfdsfsdf",
 *         "background": "https://export-download.canva.com/dasdsadasdasdasd",
 *         "createdAt": "2023-05-16T12:44:51.000Z",
 *         "updatedAt": "2023-05-16T12:46:03.948Z",
 *         "positionTypeId": null
 *     }
 * }
 */

shopsRouter.put("/release", ShopsController.addReleaseToShop);
/**
 * @api {put} /api/shops/release Add release to shop
 * @apiName Put Add release to shop
 * @apiGroup API Shop
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiQuery {number} shopId
 * @apiBody {array} releaseIds
 * @apiParamExample {json} Request-Example:
 * {
 *     "releaseIds": [1, 2, 3, 4, 5]
 * }
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true
 * }
 */

shopsRouter.put("/release/settings", ShopsController.editSettingsReleaseShop);
/**
 * @api {put} /api/shops/release/settings Edit settings release shop
 * @apiName Put Edit settings release shop
 * @apiGroup API Shop
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiQuery {number} shopId
 * @apiQuery {number} releaseId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "settings": {
 *         "id": 2,
 *         "backgroundBlur": 10,
 *         "createdAt": "2023-05-30T15:17:53.000Z",
 *         "updatedAt": "2023-06-07T07:19:32.429Z",
 *         "shopId": 58,
 *         "releaseId": 481,
 *         "contractId": null
 *     }
 * }
 */

shopsRouter.delete("/release/:shopId", ShopsController.removeReleaseFromShop);
/**
 * @api {delete} /api/shops/release/:shopId Remove release to shop
 * @apiName Delete Remove release to shop
 * @apiGroup API Shop
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} shopId
 * @apiQuery {number} releaseId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true
 * }
 */

shopsRouter.get("/releases/:name", ShopsController.getShopReleases);
/**
 * @api {get} /api/shops/releases/:name Get shop releases
 * @apiName Get Get shop releases
 * @apiGroup API Shop
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {string} name
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "releases": [
 *          {
 *             "id": 494,
 *             "type": "Single",
 *             "createdAt": "2023-06-02T14:29:14.000Z",
 *             "bapId": 1415,
 *             "shopId": 80,
 *             "logo": "47da1bc1-9b2d-40a8-93d2-f3efada06a72.jpg",
 *             "name": "1",
 *             "backgroundBlur": 0,
 *             "releaseSpotifyId": null,
 *             "releaseDate": null
 *         }
 *     ],
 *     "design": [
 *         {
 *             "id": 1,
 *             "hex": "#abcabc",
 *             "font": "sdfdsf",
 *             "size": 12,
 *             "italic": 123,
 *             "weight": 123,
 *             "createdAt": "2023-06-06T06:40:15.000Z",
 *             "updatedAt": "2023-06-06T06:40:15.000Z",
 *             "shopDesignTypeId": 1,
 *             "shopId": 80
 *         }
 *     ]
 *     "shop": {
 *         "id": 80,
 *         "name": "test56587",
 *         "favicon": null,
 *         "background": null,
 *         "metaTitle": null,
 *         "metaDescription": null,
 *         "facebookPixel": null,
 *         "logo": null,
 *         "banner": "bf574dfd-3c6f-4983-84ca-b2de150026a9.jpg",
 *         "backgroundBlur": null,
 *         "createdAt": "2023-06-02T14:41:13.000Z",
 *         "updatedAt": "2023-06-02T14:41:13.000Z",
 *         "bapId": 1415,
 *         "bapName": "bap",
 *         "positionTypeId": 2,
 *         "webpagesTypeId": null,
 *         "showSocialLinks": false,
 *         "socialLinksType": "white",
 *         "socialLinks": [
 *             {
 *                 "id": 1,
 *                 "link": "first",
 *                 "position": 1,
 *                 "createdAt": "2023-08-24T13:48:30.000Z",
 *                 "updatedAt": "2023-08-24T13:48:30.000Z",
 *                 "shopId": 224
 *             }
 *         ]
 *     }
 * }
 */

shopsRouter.get("/", ShopsController.getShops);
/**
 * @api {get} /api/shops/ Get shops
 * @apiName Get Get shops
 * @apiGroup API Shop
 * @apiQuery {number} [bapId] `must enter only one query param`
 * @apiQuery {number} [releaseId] `must enter only one query param`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "shops": [
 *         {
 *             "id": 219,
 *             "name": "nameee",
 *             "favicon": null,
 *             "background": null,
 *             "metaTitle": "title",
 *             "metaDescription": "desssc",
 *             "backgroundBlur": null,
 *             "logo": null,
 *             "banner": "047243f8-e272-42a5-a50f-cce7e1f84ea9.mp4",
 *             "facebookPixel": null,
 *             "createdAt": null,
 *             "updatedAt": null,
 *             "bapId": 1773,
 *             "positionTypeId": null,
 *             "webpagesTypeId": null,
 *             "bannerType": "video",
 *             "shopId": null,
 *             "contractId": null,
 *             "description": null,
 *             "webpagesTypeName": null,
 *             "releaseIds": [
 *                 986,
 *                 1012
 *             ]
 *         }
 *     ]
 * }
 */

shopsRouter.get("/linkName", ShopsController.getShopsName);
/**
 * @api {get} /api/shops/linkName Get shops link name
 * @apiName Get Get shops link name
 * @apiGroup API SEO
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "shops": [
 *         {
 *             "linkName": "sophie",
 *             "bapName": "Sophie and the Giants"
 *         },
 *         {
 *             "linkName": "frost",
 *             "bapName": "Porcelain"
 *         },
 *         {
 *             "linkName": "shop111",
 *             "bapName": "test"
 *         },
 *         {
 *             "linkName": "shop",
 *             "bapName": "bap"
 *         }
 *     ]
 * }
 */

shopsRouter.post("/design/", ShopsController.addDesign);
/**
 * @api {post} /api/shops/design/ Add design to shop
 * @apiName POST Add design to shop
 * @apiGroup API Shop
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiQuery {number} shopId
 * @apiBody {string} font
 * @apiBody {string} hex
 * @apiBody {number} size
 * @apiBody {number} italic
 * @apiBody {number} weight
 * @apiBody {number} shopDesignTypeId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "design": {
 *         "id": 1,
 *         "releaseId": "1",
 *         "hex": "#abcabc",
 *         "font": "sdfdsf",
 *         "size": 12,
 *         "italic": 123,
 *         "weight": 123,
 *         "shopDesignTypeId": 1,
 *         "updatedAt": "2023-05-25T09:51:43.505Z",
 *         "createdAt": "2023-05-25T09:51:43.505Z"
 *     }
 * }
 */

shopsRouter.delete("/design/:designId", ShopsController.removeDesign);
/**
 * @api {delete} /api/shops/design/:designId Remove design of shop
 * @apiName Delete Remove design of shop
 * @apiGroup API Shop
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} designId
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "design": {
 *         "id": 1,
 *         "releaseId": "1",
 *         "hex": "#abcabc",
 *         "font": "sdfdsf",
 *         "size": 12,
 *         "italic": 123,
 *         "weight": 123,
 *         "shopDesignTypeId": 1,
 *         "updatedAt": "2023-05-25T09:51:43.505Z",
 *         "createdAt": "2023-05-25T09:51:43.505Z"
 *     }
 * }
 */

shopsRouter.delete("/:shopId", ShopsController.removeShop);
/**
 * @api {delete} /api/shops/:shopId Remove shop by id
 * @apiName Delete Remove shop by id
 * @apiGroup API Shop
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} shopId
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 * }
 */

shopsRouter.post("/social/:shopId", ShopsController.addSocialLinks);
/**
 * @api {post} /api/shops/social/:shopId Add social links to shop
 * @apiName Post Add social links to shop
 * @apiGroup API Shop
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} shopId
 * @apiBody {array} data
 * @apiParamExample {json} Request-Example:
 * {
 *     "data": [
 *         {
 *             "link": "first",
 *             "position": 1
 *         },
 *         {
 *             "link": "second",
 *             "position": 12
 *         },
 *         {
 *             "link": "asdasd",
 *             "position": 13
 *         }
 *     ]
 * }
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "socialLinks": [
 *         {
 *             "link": "first",
 *             "position": 1
 *         },
 *         {
 *             "link": "second",
 *             "position": 12
 *         },
 *         {
 *             "link": "asdasd",
 *             "position": 13
 *         }
 *     ]
 * }
 */

export default shopsRouter;
