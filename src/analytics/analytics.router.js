import { Router } from "express";
import authMiddleware from "../auth/auth.middleware.js";
import analyticsController from "./analytics.controller.js";

const analyticsRouter = new Router();

analyticsRouter.get("/", authMiddleware, analyticsController.getAnalytics);

/**
 * @api {get} /api/analytics Get analytics 
 * @apiName Get analytics
 * @apiGroup API analytics
 * @apiQuery {string} trackId
 * @apiQuery {string} releaseId
 * @apiQuery {string} bapId
 * @apiQuery {number} date
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "success": true,
    "analytics": {
        "uniqueUserDownloads": 1,
        "totalDownloads": 2,
        "uniqueUserPurchase": 1,
        "totalPurchase": 2,
        "incomes": [
            {
                "id": 1395,
                "gross": "10.000",
                "fees": "1.0000",
                "net": "9.0000",
                "tips": 0,
                "paymentEmail": "sb-kq9mi26003566-1@personal.example.com",
                "createdAt": "2023-08-01T07:46:14.000Z",
                "updatedAt": "2023-08-01T07:46:14.000Z",
                "invoiceId": 0,
                "purchaseLocationId": 144,
                "contractId": null,
                "userId": 1254,
                "purchaseLocationTypeId": 1,
                "releaseId": 819,
                "bapId": 1720
            },
            {
                "id": 1450,
                "gross": "10.000",
                "fees": "1.0000",
                "net": "9.0000",
                "tips": 0,
                "paymentEmail": "sb-kq9mi26003566-1@personal.example.com",
                "createdAt": "2023-08-02T11:02:36.000Z",
                "updatedAt": "2023-08-02T11:02:36.000Z",
                "invoiceId": 0,
                "purchaseLocationId": 144,
                "contractId": null,
                "userId": 1254,
                "purchaseLocationTypeId": 1,
                "releaseId": 819,
                "bapId": 1720
            }
        ]
    }
}
 */

analyticsRouter.get("/google", authMiddleware, analyticsController.getAnalyticsFromGoogle);

/**
 * @api {get} /api/analytics/google analytics from google
 * @apiName Get analytics from google
 * @apiGroup API analytics
 * @apiQuery {number} date
 * @apiQuery {string} type  `Example: all, landing, shop`
 * @apiQuery {string} bapId
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "success": true,
    "analytics": {
        "filteredOperatingSystemGoogleResponse": [
            {
                "dimensionValues": [
                    {
                        "value": "Windows",
                        "oneValue": "value"
                    },
                    {
                        "value": "/music/my",
                        "oneValue": "value"
                    },
                    {
                        "value": "1971",
                        "oneValue": "value"
                    }
                ],
                "metricValues": [
                    {
                        "value": "1",
                        "oneValue": "value"
                    }
                ]
            },
            {
                "dimensionValues": [
                    {
                        "value": "Windows",
                        "oneValue": "value"
                    },
                    {
                        "value": "/music/streamiiiiiiiiing",
                        "oneValue": "value"
                    },
                    {
                        "value": "1971",
                        "oneValue": "value"
                    }
                ],
                "metricValues": [
                    {
                        "value": "1",
                        "oneValue": "value"
                    }
                ]
            }
        ],
        "filteredPagePathGoogleResponse": [
            {
                "dimensionValues": [
                    {
                        "value": "/music/my",
                        "oneValue": "value"
                    },
                    {
                        "value": "1971",
                        "oneValue": "value"
                    }
                ],
                "metricValues": [
                    {
                        "value": "1",
                        "oneValue": "value"
                    }
                ]
            },
            {
                "dimensionValues": [
                    {
                        "value": "/music/shop/shop123/1249",
                        "oneValue": "value"
                    },
                    {
                        "value": "1971",
                        "oneValue": "value"
                    }
                ],
                "metricValues": [
                    {
                        "value": "1",
                        "oneValue": "value"
                    }
                ]
            }
        ],
        "filteredDeviceCategoryGoogleResponse": [
            {
                "dimensionValues": [
                    {
                        "value": "desktop",
                        "oneValue": "value"
                    },
                    {
                        "value": "/music/my",
                        "oneValue": "value"
                    },
                    {
                        "value": "1971",
                        "oneValue": "value"
                    }
                ],
                "metricValues": [
                    {
                        "value": "1",
                        "oneValue": "value"
                    }
                ]
            },
            {
                "dimensionValues": [
                    {
                        "value": "desktop",
                        "oneValue": "value"
                    },
                    {
                        "value": "/music/streamiiiiiiiiing",
                        "oneValue": "value"
                    },
                    {
                        "value": "1971",
                        "oneValue": "value"
                    }
                ],
                "metricValues": [
                    {
                        "value": "1",
                        "oneValue": "value"
                    }
                ]
            }
        ],
        "filteredCountryGoogleResponse": [
            {
                "dimensionValues": [
                    {
                        "value": "Ukraine",
                        "oneValue": "value"
                    },
                    {
                        "value": "/music/my",
                        "oneValue": "value"
                    },
                    {
                        "value": "1971",
                        "oneValue": "value"
                    }
                ],
                "metricValues": [
                    {
                        "value": "1",
                        "oneValue": "value"
                    }
                ]
            },
            {
                "dimensionValues": [
                    {
                        "value": "Ukraine",
                        "oneValue": "value"
                    },
                    {
                        "value": "/music/myyyyyyyyy",
                        "oneValue": "value"
                    },
                    {
                        "value": "1971",
                        "oneValue": "value"
                    }
                ],
                "metricValues": [
                    {
                        "value": "1",
                        "oneValue": "value"
                    }
                ]
            }
        ],
        "filteredEventsDataResponse": [
            {
                "dimensionValues": [
                    {
                        "value": "click",
                        "oneValue": "value"
                    },
                    {
                        "value": "/music/shop/shop123",
                        "oneValue": "value"
                    },
                    {
                        "value": "1971",
                        "oneValue": "value"
                    }
                ],
                "metricValues": [
                    {
                        "value": "24",
                        "oneValue": "value"
                    },
                    {
                        "value": "1",
                        "oneValue": "value"
                    }
                ]
            },
            {
                "dimensionValues": [
                    {
                        "value": "download",
                        "oneValue": "value"
                    },
                    {
                        "value": "/music/myyyyyyyyy",
                        "oneValue": "value"
                    },
                    {
                        "value": "1971",
                        "oneValue": "value"
                    }
                ],
                "metricValues": [
                    {
                        "value": "10",
                        "oneValue": "value"
                    },
                    {
                        "value": "1",
                        "oneValue": "value"
                    }
                ]
            },
            {
                "dimensionValues": [
                    {
                        "value": "streaming",
                        "oneValue": "value"
                    },
                    {
                        "value": "/music/streamiiing",
                        "oneValue": "value"
                    },
                    {
                        "value": "1971",
                        "oneValue": "value"
                    }
                ],
                "metricValues": [
                    {
                        "value": "6",
                        "oneValue": "value"
                    },
                    {
                        "value": "1",
                        "oneValue": "value"
                    }
                ]
            }
        ],
        "uniqueClicks": 5
    }
}
 */

export default analyticsRouter;
