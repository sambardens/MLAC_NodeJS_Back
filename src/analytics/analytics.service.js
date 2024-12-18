import dotenv from "dotenv";
import fs from "fs";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { AnalyticsModel } from "./analytics.model.js";
import { AnalyticsUniqueActionsModel } from "./analyticsUniqueActions.model.js";
import { Op, Sequelize } from "sequelize";
import bapsService from "../baps/baps.service.js";
import { IncomesModel } from "../incomes/incomes.model.js";
import { ReleaseModel } from "../release/release.model.js";
import { TracksModel } from "../tracks/tracks.model.js";
import { SplitTracksModel } from "../splits/split-tracks.model.js";
import { SplitsModel } from "../splits/splits.model.js";
import { SplitUsersModel } from "../splits/split-users.model.js";
import { BapsModel } from "../baps/baps.model.js";
import { DownloadsModel } from "./downloads.model.js";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

class AnalyticsService {
    async createAnalytics(trackId, releaseId) {
        console.log(trackId);
        await AnalyticsModel.create({
            trackId: trackId,
            releaseId: releaseId,
        });
    }

    async createUniqueActionsAnalytics(value) {
        const uniqueActions = await AnalyticsUniqueActionsModel.create(value);
        return uniqueActions;
    }

    async createDownloadHistory(value) {
        const download = await DownloadsModel.create(value);
        return download;
    }

    async getAnalytics(options, user) {
        let where = `'release->track->split_track->split->split_user.email' = '${user.email}' OR bap.creatorId = ${user.id} AND `;

        const optionsMap = {
            date: "`incomes`.createdAt",
            trackId: "`tracks`.`id`",
            releaseId: "`release`.`id`",
            bapId: "`bap`.`id`",
        };

        if (options.date) {
            const currentDate = new Date();
            const pastDate = new Date(currentDate);

            pastDate.setDate(pastDate.getDate() - options.date);
            pastDate.setHours(0, 0, 0, 0);

            where += `(${optionsMap.date} > '${pastDate.toISOString()}' AND ${optionsMap.date} < '${currentDate.toISOString()}') AND `;

            delete options.date;
        }

        for (const optionsKey in options) {
            if (options[optionsKey] && optionsMap.hasOwnProperty(optionsKey)) {
                where += `${optionsMap[optionsKey]} = ${options[optionsKey]} AND `;
            }
        }

        where = where.substring(0, where.lastIndexOf(" AND"));

        const incomes = await IncomesModel.findAndCountAll({
            where: Sequelize.literal(where),
            attributes: [
                "id",
                [Sequelize.literal("`incomes`.`price`"), "gross"],
                [Sequelize.literal("`incomes`.`price` * (0.1 + 0.034 + (0.2 / `incomes`.`price`))"), "fees"],
                [Sequelize.literal("`incomes`.`price` - (`incomes`.`price` * (0.1 + 0.034 + (0.2 / `incomes`.`price`)))"), "net"],
                [Sequelize.literal("`tracks`.`price`"), "price"],
                "tips",
                "paymentEmail",
                "createdAt",
                "updatedAt",
                "invoiceId",
                "purchaseLocationId",
                "contractId",
                "userId",
                "purchaseLocationTypeId",
                "releaseId",
                "bapId",
            ],
            include: [
                {
                    model: ReleaseModel,
                    attributes: ["id"],
                    include: { model: TracksModel, attributes: ["id"], include: { model: SplitTracksModel, attributes: ["id"], include: { model: SplitsModel, attributes: ["id"], include: { model: SplitUsersModel } } } },
                },
                {
                    model: TracksModel,
                },
                {
                    model: BapsModel,
                },
            ],
            distinct: true,
        });

        if (where.includes("(")) {
            function replaceIncomeWithDownloads(match, p1) {
                return "(" + p1.replace(/incomes/g, "downloads") + ")";
            }
            where = where.replace(/\((.*?)\)/g, replaceIncomeWithDownloads);
        }

        if (options.trackId) {
            where = where.replace(/tracks/g, "track");
        }

        const downloads = await DownloadsModel.findAndCountAll({
            where: Sequelize.literal(where),
            include: [
                {
                    model: ReleaseModel,
                    attributes: ["id"],
                    include: { model: TracksModel, attributes: ["id"], include: { model: SplitTracksModel, attributes: ["id"], include: { model: SplitsModel, attributes: ["id"], include: { model: SplitUsersModel } } } },
                },
                {
                    model: TracksModel,
                },
                {
                    model: BapsModel,
                },
            ],
            distinct: true,
        });

        const updatedIncomes = JSON.parse(JSON.stringify(incomes));

        const uniqueIncomesUserIds = new Set();

        for (const item of updatedIncomes.rows) {
            if (item.userId !== null) {
                uniqueIncomesUserIds.add(item.userId);
            }
            delete item.release;
            delete item.bap;
        }

        const updatedDownloads = JSON.parse(JSON.stringify(downloads));

        const uniqueDownloadsUserIds = new Set();

        for (const item of updatedDownloads.rows) {
            if (item.userId !== null) {
                uniqueDownloadsUserIds.add(item.userId);
            }
            delete item.release;
            delete item.bap;
        }

        return { uniqueUserDownloads: uniqueDownloadsUserIds.size, totalDownloads: updatedDownloads.count, uniqueUserPurchase: uniqueIncomesUserIds.size, totalPurchase: updatedIncomes.count, incomes: updatedIncomes.rows };
    }

    async getAnalyticsFromDb(options) {
        const databaseAnalytics = await AnalyticsModel.findAll({
            where: options,
        });
        return databaseAnalytics;
    }

    async findUniqueActionById(id) {
        return await AnalyticsUniqueActionsModel.findOne({
            where: { id },
        });
    }

    async findAndCountUniqueActionByTrackId(trackId) {
        return await AnalyticsUniqueActionsModel.findAndCountAll({
            where: { trackId },
        });
    }

    async updateTotalPurchases(trackIds, userId) {
        const analytics = await this.getAnalyticsFromDb({ trackId: { [Op.in]: trackIds } });

        for (const iterator of analytics) {
            const uniqueAction = await this.findUniqueActionById(iterator.dataValues?.analyticsUniqueActionId);

            if (uniqueAction && uniqueAction.dataValues.purchases === false) {
                uniqueAction.purchases = true;
                await uniqueAction.save();
            }
            if (!uniqueAction) {
                const uniqueAnalytics = await this.createUniqueActionsAnalytics({
                    purchases: true,
                    releaseId: iterator.dataValues.releaseId,
                    userId,
                    trackId: iterator.dataValues.trackId,
                });
                iterator.dataValues.analyticsUniqueActionId = uniqueAnalytics.id;
            }

            const totalCustomersPurchases = await this.findAndCountUniqueActionByTrackId(iterator.dataValues.trackId);
            ++iterator.dataValues.totalPurchases;
            iterator.totalCustomersPurchases = totalCustomersPurchases ? totalCustomersPurchases.count : iterator.dataValues.totalCustomersPurchases;
        }

        await this.updateAnalytics(analytics, userId);
    }

    async updateTotalDownloads(trackIds, userId) {
        let totalCustomersDownloads = undefined;
        const analytics = await this.getAnalyticsFromDB(trackIds);
        const uniqueAction = await this.findUniqueActionById(analytics[0].dataValues.releaseId, userId);

        if (uniqueAction && uniqueAction.dataValues.downloads != false) {
            uniqueAction.dataValues.downloads = true;
        }

        if (!uniqueAction) {
            AnalyticsUniqueActionsModel.create({
                downloads: true,
                releaseId: analytics[0].dataValues.releaseId,
                userId,
            });
        }

        totalCustomersDownloads = await this.findAndCountUniqueActionByTrackId(analytics[0].dataValues.releaseId);

        ++item.totalPurchases;
        item.totalCustomersDownloads = totalCustomersDownloads ? totalCustomersDownloads.count : item.totalCustomersDownloads;

        await this.updateAnalytics(analytics, userId);
    }

    async updateAnalytics(analytics, userId = null) {
        for (let item of analytics) {
            await AnalyticsModel.update(item.dataValues, {
                where: {
                    id: item.id,
                },
            });
        }
    }

    async getAnalyticsFromGoogle(date = 30, type, user, bapId) {
        const fileContent = fs.readFileSync(process.cwd() + "/APIkey/GoogleApiKey.json", "utf8");
        const apiCredentials = JSON.parse(fileContent);

        const client = new BetaAnalyticsDataClient({
            keyFilename: "APIkey/GoogleApiKey.json",
        });
        const countryGoogleRequest = {
            property: `properties/${process.env.GOOGLE_PRODUCT_ID}`,
            dimensions: [
                {
                    name: "country",
                },
                {
                    name: "pagePath",
                },
                {
                    name: "customEvent:event_category",
                },
            ],
            metrics: [
                {
                    name: "totalUsers",
                },
            ],
            dateRanges: [
                {
                    startDate: `${date}daysAgo`,
                    endDate: "today",
                },
            ],
        };
        const deviceCategoryGoogleRequest = {
            property: `properties/${process.env.GOOGLE_PRODUCT_ID}`,
            dimensions: [
                {
                    name: "deviceCategory",
                },
                {
                    name: "pagePath",
                },
                {
                    name: "customEvent:event_category",
                },
            ],
            metrics: [
                {
                    name: "totalUsers",
                },
            ],
            dateRanges: [
                {
                    startDate: `${date}daysAgo`,
                    endDate: "today",
                },
            ],
        };
        const operatingSystemGoogleRequest = {
            property: `properties/${process.env.GOOGLE_PRODUCT_ID}`,
            dimensions: [
                {
                    name: "operatingSystem",
                },
                {
                    name: "pagePath",
                },
                {
                    name: "customEvent:event_category",
                },
            ],
            metrics: [
                {
                    name: "totalUsers",
                },
            ],
            dateRanges: [
                {
                    startDate: `${date}daysAgo`,
                    endDate: "today",
                },
            ],
        };
        const pagePathGoogleRequest = {
            property: `properties/${process.env.GOOGLE_PRODUCT_ID}`,
            dimensions: [
                {
                    name: "pagePath",
                },
                {
                    name: "customEvent:event_category",
                },
            ],
            metrics: [
                {
                    name: "totalUsers",
                },
            ],
            dateRanges: [
                {
                    startDate: `${date}daysAgo`,
                    endDate: "today",
                },
            ],
        };
        const eventsDataRequest = {
            property: `properties/${process.env.GOOGLE_PRODUCT_ID}`,
            dimensions: [
                {
                    name: "eventName",
                },
                {
                    name: "pagePath",
                },
                {
                    name: "customEvent:event_category",
                },
            ],
            metrics: [
                {
                    name: "eventValue",
                },
                {
                    name: "activeUsers",
                },
            ],
            dateRanges: [
                {
                    startDate: `${date}daysAgo`,
                    endDate: "today",
                },
            ],
        };

        const baps = await bapsService.getBapShopByUserId(user.id);
        const uniqueShopNames = [];
        baps.forEach((item) => {
            item.shops.forEach((shop) => {
                if (!uniqueShopNames.includes(shop.name)) {
                    uniqueShopNames.push(shop.name);
                }
            });
        });

        const landings = await bapsService.getBapLandingByUserId(user.id);
        const uniqueLandingNames = [];
        landings.forEach((item) => {
            const releases = item.releases || [];
            releases.forEach((release) => {
                const landings = release.landings || [];
                landings.forEach((landing) => {
                    const name = landing.name;
                    if (name) {
                        uniqueLandingNames.push(name);
                    }
                });
            });
        });

        const userLinks = uniqueShopNames.concat(uniqueLandingNames);

        // const regex = new RegExp(/^\/music(\/shop\/[^\/]+)?$/);
        // const regex = new RegExp(/^\/music(\/[^\/]+)?$/);
        // const regex = new RegExp(/^\/music(\/(shop(\/[^\/]+)?)?|\/[^\/]+)?$/);
        const regex = new RegExp(/^\/music(\/(shop(\/[^\/]+)+)?|\/[^\/]+)?$/);

        const checking = (row, regex, userLinks) => {
            return row.dimensionValues.some((dimension) => {
                return (
                    row.dimensionValues.some((dimension) => dimension.value === bapId) &&
                    regex.test(dimension.value) &&
                    userLinks.some((linkPart) => {
                        if (!type || type === "all") {
                            return dimension.value.includes(linkPart);
                        } else {
                            if (type === "landing") {
                                return dimension.value.includes(linkPart) && !dimension.value.includes("shop");
                            } else {
                                return dimension.value.includes(linkPart) && dimension.value.includes("shop");
                            }
                        }
                    })
                );
            });
        };

        const filterResponseData = (responseData, regex, userLinks, events) => {
            return responseData.rows.filter((row) => {
                if (events) {
                    return events.some((event) => event === row.dimensionValues[0].value) && checking(row, regex, userLinks);
                } else {
                    return checking(row, regex, userLinks);
                }
            });
        };

        const [operatingSystemGoogleResponse] = await client.runReport(operatingSystemGoogleRequest);
        const filteredOperatingSystemGoogleResponse = filterResponseData(operatingSystemGoogleResponse, regex, userLinks);

        const [pagePathGoogleResponse] = await client.runReport(pagePathGoogleRequest);
        const filteredPagePathGoogleResponse = filterResponseData(pagePathGoogleResponse, regex, userLinks);

        const [deviceCategoryGoogleResponse] = await client.runReport(deviceCategoryGoogleRequest);
        const filteredDeviceCategoryGoogleResponse = filterResponseData(deviceCategoryGoogleResponse, regex, userLinks);

        const [countryGoogleResponse] = await client.runReport(countryGoogleRequest);
        const filteredCountryGoogleResponse = filterResponseData(countryGoogleResponse, regex, userLinks);

        const [eventsDataResponse] = await client.runReport(eventsDataRequest);
        const filteredEventsDataResponse = filterResponseData(eventsDataResponse, regex, userLinks, ["click", "streaming", "download"]);

        const uniqueClicks = filteredEventsDataResponse.reduce((sum, item) => {
            if (item.dimensionValues[0].value === "click") return sum + Number(item.metricValues[1].value);
            return sum;
        }, 0);

        return { filteredOperatingSystemGoogleResponse, filteredPagePathGoogleResponse, filteredDeviceCategoryGoogleResponse, filteredCountryGoogleResponse, filteredEventsDataResponse, uniqueClicks };
    }
}

export default new AnalyticsService();
