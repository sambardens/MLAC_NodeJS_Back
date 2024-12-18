import {Router} from "express";
import GenresController from "./genres.controller.js";
import authMiddleware from "../auth/auth.middleware.js";

const genresRouter = new Router()

genresRouter.get('/main', authMiddleware, GenresController.getMainGenres)
/**
 * @api {get} /api/genres/main Get main genres
 * @apiName Get Get main genres
 * @apiGroup API Genre
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
 *     "mainGenres": [
 *         {
 *             "id": 1,
 *             "name": "Alternative"
 *         },
 *         {
 *             "id": 2,
 *             "name": "Anime"
 *         }
 *     ]
 * }
 */

genresRouter.get('/sub', authMiddleware, GenresController.getSubGenres)
/**
 * @api {get} /api/genres/sub Get sub genres
 * @apiName Get Get sub genres
 * @apiGroup API Genre
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiQuery {number} firstGenreId
 * @apiQuery {number} [secondGenreId]
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "subGenres": [
 *         {
 *             "id": 1,
 *             "name": "Art Punk",
 *             "mainGenreId": 1
 *         },
 *         {
 *             "id": 2,
 *             "name": "Alternative Rock",
 *             "mainGenreId": 1
 *         },
 *     ]
 * }
 */

genresRouter.post('/:bapId', authMiddleware, GenresController.saveGenres)

/**
 * @api {Post} /api/genres/:bapId Save genres on bap
 * @apiName Post Save genres on bap
 * @apiGroup API Genre
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} bapId
 * @apiBody {number[]} [subGenereIds]
 * @apiBody {number} [mainGenereId] 
 * @apiBody {number} [sub_generes_ids] 
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 * }
 */

genresRouter.get('/:bapId', authMiddleware, GenresController.getGenresBap)
/**
 * @api {Get} /api/genres/:bapId Get genres of bap
 * @apiName Get Get genres of bap
 * @apiGroup API Genre
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
 *     "genresBap": {
 *      mainGenere: { id: 1, name: 'Alternative' },
 *      secondGeneres: { id: 2, name: 'Anime' },
 *      sub_genres: [
 *          {
 *              id: 1,
 *              name: 'Art Punk',
 *              mainGenreId: 1,
 *              genres_baps: {
 *                  id: 84,
 *                  createdAt: '2023-07-04T11:07:54.000Z',
 *                  updatedAt: '2023-07-04T11:07:54.000Z',
 *                  subGenreId: 1,
 *                  bapId: 6
 *              }
 *          },
 *          {
 *              id: 2,
 *              name: 'Alternative Rock',
 *              mainGenreId: 1,
 *              genres_baps: {
 *                  id: 85,
 *                  createdAt: '2023-07-04T11:07:54.000Z',
 *                  updatedAt: '2023-07-04T11:07:54.000Z',
 *                  subGenreId: 2,
 *                  bapId: 6
 *              }
 *          }
 *        ]
 *      }
 *  }
 */

genresRouter.delete('/:bapId', authMiddleware, GenresController.removeGenreBap)
/**
 * @api {delete} /api/genres/:bapId Remove genre bap
 * @apiName Delete Remove genre bap
 * @apiGroup API Genre
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} bapId
 * @apiQuery {number} subGenreId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true
 * }
 */

export default genresRouter