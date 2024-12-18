import { Router } from "express";
import ContractsController from "./contracts.controller.js";
import authMiddleware from "../auth/auth.middleware.js";

const contractsRouter = new Router();

contractsRouter.get("/:contractId", authMiddleware, ContractsController.getContract);
/**
 * @api {get} /api/contracts/:contractId Get contract
 * @apiName Get contract
 * @apiGroup API Contract
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} contractId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "contract": {
 *         "id": 4,
 *         "createdAt": "2023-04-25T06:25:08.000Z",
 *         "updatedAt": "2023-04-25T06:25:08.000Z",
 *         "releaseId": 337,
 *         "referenceContractId": 1,
 *         "splitId": 123,
 *         "tracksSplit": [
 *             {
 *                 "trackId": 639,
 *                 "releaseId": 337,
 *                 "splitId": 326,
 *                 "uniqueName": "d91ca1f5-fb06-4a5a-aaaa-bc6f3ff2a5a6.mp3",
 *                 "name": "DNDM__Hussein_Arbabi_-_Dubai_(Dj_Rauff_remix)_(ringon.site).mp3",
 *                 "type": null
 *             },
 *             {
 *                 "trackId": 640,
 *                 "releaseId": 337,
 *                 "splitId": 326,
 *                 "uniqueName": "b10c4946-1b77-41fe-8cfd-6c70acfda741.mp3",
 *                 "name": "ONEIL_ORGAN_FAVIA_-_Sweet_dreams_(ringon.site).mp3",
 *                 "type": null
 *             }
 *         ],
 *         "splitUsers": [
 *             {
 *                 "userId": 10,
 *                 "email": "test@gmail.com",
 *                 "firstName": "test",
 *                 "lastName": "test",
 *                 "ownership": "39",
 *                 "splitId": 326,
 *                 "signature": null,
 *                 "reviewed": 0
 *             },
 *             {
 *                 "userId": 571,
 *                 "email": "qqq@qqq.com",
 *                 "firstName": "qqq",
 *                 "lastName": "QQQ",
 *                 "ownership": "61",
 *                 "splitId": 326,
 *                 "signature": null,
 *                 "reviewed": 0
 *             }
 *         ]
 *     }
 * }
 */

contractsRouter.post("/:splitId", authMiddleware, ContractsController.createContracts);
/**
 * @api {post} /api/contracts/:splitId Create contract
 * @apiName Post Create contract
 * @apiGroup API Contract
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} splitId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "contract": {
 *         "id": 4,
 *         "createdAt": "2023-04-25T06:25:08.000Z",
 *         "updatedAt": "2023-04-25T06:25:08.000Z",
 *         "releaseId": 337,
 *         "tracksSplit": [
 *             {
 *                 "trackId": 639,
 *                 "releaseId": 337,
 *                 "splitId": 326,
 *                 "uniqueName": "d91ca1f5-fb06-4a5a-aaaa-bc6f3ff2a5a6.mp3",
 *                 "name": "DNDM__Hussein_Arbabi_-_Dubai_(Dj_Rauff_remix)_(ringon.site).mp3",
 *                 "type": null
 *             },
 *             {
 *                 "trackId": 640,
 *                 "releaseId": 337,
 *                 "splitId": 326,
 *                 "uniqueName": "b10c4946-1b77-41fe-8cfd-6c70acfda741.mp3",
 *                 "name": "ONEIL_ORGAN_FAVIA_-_Sweet_dreams_(ringon.site).mp3",
 *                 "type": null
 *             }
 *         ],
 *         "splitUsers": [
 *             {
 *                 "userId": 10,
 *                 "email": "test@gmail.com",
 *                 "firstName": "test",
 *                 "lastName": "test",
 *                 "ownership": "39",
 *                 "splitId": 326,
 *                 "signature": null,
 *                 "reviewed": 0
 *             },
 *             {
 *                 "userId": 571,
 *                 "email": "qqq@qqq.com",
 *                 "firstName": "qqq",
 *                 "lastName": "QQQ",
 *                 "ownership": "61",
 *                 "splitId": 326,
 *                 "signature": null,
 *                 "reviewed": 0
 *             }
 *         ]
 *     }
 * }
 */

contractsRouter.put("/signature/:contractId", authMiddleware, ContractsController.signatureContract);
/**
 * @api {put} /api/contracts/signature/:contractId Signature contract
 * @apiName Put Signature contract
 * @apiGroup API Contract
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} contractId
 * @apiBody {string} [content] `if you decline contract, you must write reason`
 * @apiBody {boolean} [isAccept] `true || false. If you don't specify parameters, so isAccept will be false`
 * @apiBody {files} [signature] `file signature of user`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "contractUser": [
 *         {
 *             "userId": 571,
 *             "email": "qqq@qqq.com",
 *             "firstName": "qqq",
 *             "lastName": "QQQ",
 *             "ownership": "80",
 *             "splitId": 189,
 *             "signature": "signature",
 *             "reviewed": 1
 *         }
 *     ]
 * }
 */

contractsRouter.get("/signature/:contractId/:userId", authMiddleware, ContractsController.getSignatureImage);
/**
 * @api {get} /api/contracts/signature/:contractId/:userId Get signature image
 * @apiName Get Get signature image
 * @apiGroup API Contract
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} contractId
 * @apiParam {number} userId
 * @apiSuccess {String} file
 */

contractsRouter.get("/splits/pending", ContractsController.getContractsNoCompletedSplits);
/**
 * @api {get} /api/contracts/splits/pending Get contracts and pending splits
 * @apiName Get Get contracts and pending splits
 * @apiGroup API Contract
 * @apiQuery {number} [userId] `this`
 * @apiQuery {number} [bapId] `or this`
 * @apiQuery {number} [releaseId] `or this`
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true,
 *     "contracts": [
 *         {
 *             "contractId": 110,
 *             "bapName": "B.A.P",
 *             "createdAt": "2023-05-16T09:20:16.000Z",
 *             "splitId": 491,
 *             "referenceContractId": 1,
 *             "releaseName": "Second RELEASE",
 *             "releaseId": 425,
 *             "bapId": 123,
 *             "creatorBapId": 123,
 *             "isOldContract": 0,
 *             "isCancelled": 1375,
 *             "tracks": [
 *                 {
 *                     "trackId": 814,
 *                     "releaseId": 425,
 *                     "splitId": 491,
 *                     "uniqueName": "1cb3facf-db33-45bf-b647-606dc7bc377c.mp3",
 *                     "name": "ONEIL_ORGAN_FAVIA",
 *                     "type": "Acoustic",
 *                     "credits": [
 *                         {
 *                             "name": "ivaan",
 *                             "creditIds": "[1]"
 *                         },
 *                         {
 *                             "email": "ivankovdrin7@gmail.com",
 *                             "userId": 1225,
 *                             "lastName": "lastname",
 *                             "creditIds": "[1,2,3]",
 *                             "firstName": "name"
 *                         }
 *                     ]
 *                 }
 *             ],
 *             "users": [
 *                 {
 *                     "userId": 899,
 *                     "email": "lepiv83352@carpetra.com",
 *                     "firstName": "Vlad",
 *                     "lastName": "t1",
 *                     "userAvatar": null,
 *                     "ownership": "100",
 *                     "splitId": 491,
 *                     "signature": null,
 *                     "reviewed": 0
 *                 }
 *             ]
 *         }
 *     ],
 *     "splits": [
 *         {
 *             "id": 493,
 *             "createdAt": "2023-05-16T09:44:22.000Z",
 *             "updatedAt": "2023-05-16T09:44:22.000Z",
 *             "releaseId": 425,
 *             "releaseName": "Second RELEASE",
 *             "bapName": "B.A.P",
 *             "bapId": 123,
 *             "creatorBapId": 123,
 *             "tracks": [
 *                 {
 *                     "trackId": 815,
 *                     "releaseId": 425,
 *                     "splitId": 493,
 *                     "uniqueName": "c964b5c9-3ca5-4891-97cb-bb7526c7e3b2.mp3",
 *                     "name": "DNDM__Hussein_Arbabi",
 *                     "type": null
 *                 },
 *                 {
 *                     "trackId": 816,
 *                     "releaseId": 425,
 *                     "splitId": 493,
 *                     "uniqueName": "6964c073-cb3e-4e75-9014-7c78e7a2ae8f.wav",
 *                     "name": "Bula_v_mene_parova_mashina.",
 *                     "type": null
 *                 }
 *             ],
 *             "users": [
 *                 {
 *                     "userId": 899,
 *                     "email": "lepiv83352@carpetra.com",
 *                     "firstName": "Vlad",
 *                     "lastName": "t1",
 *                     "userAvatar": null,
 *                     "ownership": "50",
 *                     "splitId": 493,
 *                     "signature": null,
 *                     "reviewed": 0
 *                 },
 *                 {
 *                     "userId": 4,
 *                     "email": "sname.parser123@gmail.com",
 *                     "firstName": "SASHA",
 *                     "lastName": "qwe",
 *                     "userAvatar": "28169604-e36e-47aa-a30d-3138f14e0b1e.jpg",
 *                     "ownership": "50",
 *                     "splitId": 493,
 *                     "signature": null,
 *                     "reviewed": 0
 *                 }
 *             ]
 *         }
 *     ]
 * }
 */

contractsRouter.post("/signature/remind/:contractId", authMiddleware, ContractsController.sendRemindParticipantsContract);
/**
 * @api {post} /api/contracts/signature/remind/:contractId send remind participants contract
 * @apiName Post send remind participants contract
 * @apiGroup API Contract
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} contractId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
 *     "success": true
 * }
 */

contractsRouter.delete("/:contractId", authMiddleware, ContractsController.removeContract);
/**
 * @api {delete} /api/contracts/:contractId Remove contract
 * @apiName Delete Remove contract
 * @apiGroup API Contract
 * @apiHeader (Authorization) {String} Authorization `JWT access token`
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzczEyM2Zkc2ZAc2Yuc2RmIiwiZmlyc3RfbmFtZSI6ImRzZmRzIiwibGFzdF9uYW1lIjoic2Rmc2RmIiwiaWF0IjoxNjc3ODM1NTI3LCJleHAiOjE2ODA0Mjc1Mjd9.6-qX5dk09trOOQ02TBGROZULJM02COtKVtCB5unoDk4"
 * }
 * @apiParam {number} contractId
 * @apiSuccess {String} JSON
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *  {
 *     "success": true
 * }
 */

export default contractsRouter;
