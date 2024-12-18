import { IncomesModel } from "./incomes.model.js";
import { Sequelize, where } from "sequelize";
import np from "number-precision";
import { IncomesTracksModel } from "./incomes-tracks.model.js";
import { TracksModel } from "../tracks/tracks.model.js";
import { ReleaseModel } from "../release/release.model.js";
import { BapsModel } from "../baps/baps.model.js";
import filterService from "../filter/filter.service.js";
import { GenresSubModel } from "../genres/genres.model.js";
import { allowedSortFieldsIncome, allowedSortOrders, incomeFilter } from "../../utils/global.variables.js";
import { SplitsModel } from "../splits/splits.model.js";
import { SplitUsersModel } from "../splits/split-users.model.js";
import { SplitTracksModel } from "../splits/split-tracks.model.js";
import usersService from "../users/users.service.js";
import { UsersModel } from "../users/users.model.js";
import { ApiError } from "../errors/errors.api.js";
import { PriceHistoryModel } from "./price_histories.model.js";
import splitsService from "../splits/splits.service.js";

class IncomesService {
    async addNewTrade(values, trackIds) {
        const income = await IncomesModel.create(values);
        const incomeTrack = trackIds.map((trackId) => ({
            trackId,
            incomeId: income.id,
        }));

        await IncomesTracksModel.bulkCreate(incomeTrack);

        return income;
    }

    async addPriceHistory(incomeId, trackIdsWithPrice) {
        const pricesHistory = [];

        for (const releaseId in trackIdsWithPrice) {
            if (trackIdsWithPrice[releaseId].releasePrice) {
                trackIdsWithPrice[releaseId].track = await this.applyDiscount(trackIdsWithPrice[releaseId].releasePrice, trackIdsWithPrice[releaseId].track);
            }

            for (let index = 0; index < trackIdsWithPrice[releaseId].track.length; index++) {
                const priceHistory = {
                    trackId: trackIdsWithPrice[releaseId].track[index].trackId,
                    releasePrice: trackIdsWithPrice[releaseId].releasePrice || trackIdsWithPrice[releaseId].trackPriceSum,
                    trackPrice: trackIdsWithPrice[releaseId].track[index].trackPrice,
                    incomeId: incomeId,
                };
                pricesHistory.push(priceHistory);
            }
        }

        await PriceHistoryModel.bulkCreate(pricesHistory);
    }

    async getIncomes(options) {
        const user = await usersService.getUserById(options.userId);

        options.userEmail = user ? `'${user.email}'` : undefined;
        const userId = options.userId;

        delete options.userId;

        options.userEmail = user ? `'${user.email}'` : undefined;
        options.userId = userId;

        let where = "";
        const optionsMap = {
            userEmail: "`tracks->split_tracks->split->split_users`.`email`",
            userId: "`release->bap`.`creatorId`",
            bapId: "incomes.bapId",
            releaseId: "incomes.releaseId",
        };

        for (const optionsKey in options) {
            if (options[optionsKey]) {
                if (optionsMap.hasOwnProperty(optionsKey))
                    if (optionsKey == "userEmail") {
                        where += `(${optionsMap[optionsKey]} = ${options[optionsKey]} OR `;
                    } else {
                        if (optionsKey == "userId") {
                            where += `${optionsMap[optionsKey]} = ${options[optionsKey]})`;
                        } else {
                            where += `${optionsMap[optionsKey]} = ${options[optionsKey]} AND `;
                        }
                    }
            }
        }

        const incomes = await IncomesModel.findAll({
            where: Sequelize.literal(where),
            attributes: [
                "id",
                "createdAt",
                [Sequelize.literal("`release->bap`.`name`"), "bapName"],
                [Sequelize.literal("`incomes`.`price`"), "gross"],
                [Sequelize.literal("`incomes`.`price` * (0.1 + 0.034 + (0.2 / `incomes`.`price`))"), "fees"],
                [Sequelize.literal("`incomes`.`price` - (`incomes`.`price` * (0.1 + 0.034 + (0.2 / `incomes`.`price`)))"), "net"],
                "tips",
            ],
            include: [
                {
                    model: ReleaseModel,
                    attributes: [],
                    include: [{ model: BapsModel, attributes: ["name", "creatorId"] }],
                },
                {
                    model: TracksModel,
                    attributes: ["name", "uniqueName", "id"],
                    through: { attributes: [] },
                    include: [
                        { model: ReleaseModel, attributes: ["name"] },
                        { model: SplitTracksModel, attributes: ["id"], include: { model: SplitsModel, include: SplitUsersModel } },
                    ],
                },
            ],
        });

        const updatedData = JSON.parse(JSON.stringify(incomes));
        for (const income of updatedData) {
            if (income.tracks) {
                for (const track of income.tracks) {
                    track.releaseName = track.release.name;
                    delete track.split_tracks;
                    delete track.release;
                }
            }
        }
        const incomeGross = this.getIncomeGross(incomes);
        return { incomes: updatedData, incomeGross };
    }

    async getIncomesForAnalytics(options) {
        let where = "";
        const optionsMap = {
            date: "`incomes`.createdAt",
            trackId: "`tracks`.`id`",
            releaseId: "`release`.`id`",
        };

        if (options.date) {
            const currentDate = new Date();
            const pastDate = new Date(currentDate);

            pastDate.setDate(pastDate.getDate() - options.date);

            where = `(${optionsMap.date} > '${pastDate.toISOString()}' AND ${optionsMap.date} < '${currentDate.toISOString()}') AND `;

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
                "createdAt",
                [Sequelize.literal("`release->bap`.`name`"), "bapName"],
                [Sequelize.literal("`incomes`.`price`"), "gross"],
                [Sequelize.literal("`incomes`.`price` * (0.1 + 0.034 + (0.2 / `incomes`.`price`))"), "fees"],
                [Sequelize.literal("`incomes`.`price` - (`incomes`.`price` * (0.1 + 0.034 + (0.2 / `incomes`.`price`)))"), "net"],
                "tips",
            ],
            include: [
                {
                    model: ReleaseModel,
                    attributes: [],
                    include: [{ model: BapsModel, attributes: ["name"] }],
                },
                {
                    model: TracksModel,
                    attributes: [[Sequelize.literal("`release`.`name`"), "releaseName"], "name", "uniqueName"],
                    through: { attributes: [] },
                },
            ],
        });

        return incomes;
    }

    async getIncomesByIdCheckUser(incomeId, user) {
        const checkUserAccess = await IncomesModel.findOne({
            where: { id: incomeId },
            include: [
                {
                    model: ReleaseModel,
                    attributes: ["id"],
                    include: [
                        { model: BapsModel, attributes: ["id"], include: { model: UsersModel, where: { email: user.email } } },
                        { model: SplitsModel, attributes: ["id"], include: { model: SplitUsersModel, where: { email: user.email } } },
                    ],
                },
            ],
        });

        if (!checkUserAccess?.release.bap && !checkUserAccess?.release.splits[0]) throw ApiError.forbidden("You do not have access to this info");

        const income = await this.getIncomesById(incomeId, user);

        return income;
    }

    async getIncomesById(incomeId, user) {
        const income = await IncomesModel.findOne({
            where: { id: incomeId },
            attributes: [
                "id",
                "invoiceId",
                "paymentEmail",
                [Sequelize.literal("`tracks->release->bap`.`name`"), "bapName"],
                ["createdAt", "date"],
                [Sequelize.literal("`incomes`.`price`"), "gross"],
                [Sequelize.literal("`incomes`.`price` * (0.1 + 0.034 + (0.2 / `incomes`.`price`))"), "fees"],
                [Sequelize.literal("`incomes`.`price` - (`incomes`.`price` * (0.1 + 0.034 + (0.2 / `incomes`.`price`)))"), "net"],
                "tips",
                [Sequelize.literal("`tracks->release->bap->user`.`email`"), "email"],
                [Sequelize.literal("`tracks->release->bap->user`.`firstName`"), "firstName"],
                [Sequelize.literal("`tracks->release->bap->user`.`lastName`"), "lastName"],
            ],
            include: [
                { model: PriceHistoryModel },
                {
                    model: TracksModel,
                    attributes: ["id", ["name", "trackName"], [Sequelize.literal("`tracks->release`.`name`"), "releaseName"], "price"],
                    include: [
                        { model: ReleaseModel, attributes: [], include: { model: BapsModel, include: { model: UsersModel } } },
                        { model: SplitTracksModel, attributes: ["id"], include: { model: SplitsModel, attributes: ["id"], include: { model: SplitUsersModel } } },
                        { model: PriceHistoryModel, attributes: [] },
                    ],
                    through: { attributes: [] },
                },
            ],
        });
        const updatedData = JSON.parse(JSON.stringify(income));

        if (updatedData) {
            const userCreator = {
                email: updatedData.email,
                firstName: updatedData.firstName,
                lastName: updatedData.lastName,
            };

            let customerPayment = 0;

            if (updatedData) {
                for (const track of updatedData.tracks) {
                    if (track.split_tracks.length) {
                        track.splitUsers = track.split_tracks[0].split.split_users;

                        for (const trackHistory of updatedData.price_histories) {
                            if (trackHistory.trackId === track.id) track.price = trackHistory.trackPrice;
                        }
                        for (const user of track.splitUsers) {
                            const userFromDb = await usersService.getUserByEmail(user.email);
                            user.firstName = userFromDb ? userFromDb.firstName : null;
                            user.lastName = userFromDb ? userFromDb.lastName : null;
                        }
                    } else {
                        track.splitUsers = [
                            {
                                id: null,
                                email: userCreator.email,
                                ownership: "100",
                                reviewed: null,
                                signature: null,
                                createdAt: null,
                                updatedAt: null,
                                splitId: null,
                                firstName: userCreator.firstName,
                                lastName: userCreator.lastName,
                            },
                        ];
                    }

                    delete track.split_tracks;

                    if (user) {
                        const totalPercentFee = np.plus(process.env.MAJOR_LABL_FEE, process.env.PAYPAL_PERCENT_FEE, np.divide(process.env.PAYPAL_FIXED_FEE, income.dataValues.gross));
                        const userPaymentPart = track.splitUsers.find((spliTuser) => spliTuser.email === user.email);
                        customerPayment = np.plus(np.times(np.minus(track.price, np.times(track.price, totalPercentFee)), np.divide(userPaymentPart.ownership, 100)), customerPayment);
                    }
                }
                if (user) {
                    let splitUsers = [];
                    if (updatedData.tips) {
                        for (const track of updatedData.tracks) {
                            const split = await splitsService.getSplit({ trackId: track.id });
                            splitUsers = await splitsService.getSplitUser(null, { splitId: split.splitId });
                        }
                        updatedData.customerPayment = np.plus(customerPayment, np.divide(updatedData.tips, splitUsers.length)).toFixed(3);
                    } else {
                        updatedData.customerPayment = customerPayment.toFixed(3);
                    }
                }
            }

            delete updatedData.price_histories;

            const { email, firstName, lastName, ...rest } = updatedData;

            return rest;
        }

        return {};
    }

    async uniqueFields() {
        const uniqueFields = await filterService.generateUniqueFields(incomeFilter);
        return uniqueFields;
    }

    getIncomeGross(incomes) {
        let sum = 0;
        for (const income of incomes) {
            sum = np.plus(sum, income.dataValues.gross);
        }
        return sum;
    }

    getIncomeFees(incomes) {
        let sum = 0;
        for (const income of incomes) {
            const fees = income.dataValues.fees ? income.dataValues.fees : 0
            sum = np.plus(sum, fees);
        }
        return sum;
    }

    getIncomeNet(incomes) {
        let sum = 0;
        for (const income of incomes) {
            const net = income.dataValues.net ? income.dataValues.net : 0
            sum = np.plus(sum, net);
        }
        return sum;
    }

    async getIncome(trackId, userId) {
        const income = await IncomesModel.findOne({
            where: {
                userId,
            },
            include: {
                model: TracksModel,
                through: {
                    where: { trackId },
                },
            },
        });
        return income;
    }

    async getTransactions(data, sortField = "createdAt", sortOrder = "DESC") {
        const whereClause = filterService.generateFilterForSQL(data);

        if (sortField && !allowedSortFieldsIncome.includes(sortField)) {
            throw new Error("Invalid sort field");
        }

        if (sortOrder && !allowedSortOrders.includes(sortOrder)) {
            throw new Error("Invalid sort order");
        }

        if (sortField != "id") {
            sortOrder = "DESC";
        }

        const order = sortField && sortOrder ? [[sortField, sortOrder]] : undefined;

        const incomes = await IncomesModel.findAll({
            where: whereClause,
            attributes: [
                "id",
                "createdAt",
                "paymentEmail",
                [Sequelize.literal("`release`.`type`"), "releaseType"],
                [Sequelize.literal("`release->bap`.`name`"), "bapName"],
                [Sequelize.literal("`incomes`.`price`"), "gross"],
                [Sequelize.literal("`incomes`.`price` * (0.1 + 0.034 + (0.2 / `incomes`.`price`))"), "fees"],
                [Sequelize.literal("`incomes`.`price` - (`incomes`.`price` * (0.1 + 0.034 + (0.2 / `incomes`.`price`)))"), "net"],
                "tips",
            ],
            include: [
                {
                    model: ReleaseModel,
                    attributes: ["subGenresIds", "type"],
                    include: ["mainGenere", { model: BapsModel, attributes: [] }],
                },
                {
                    model: TracksModel,
                    attributes: [[Sequelize.literal("`release`.`name`"), "releaseName"], "name", "uniqueName"],
                    through: { attributes: [] },
                },
            ],
            order,
        });
        const subGeneresIds = [];

        for (const income of incomes) if (income.release?.subGenresIds) subGeneresIds.push(...income.release.subGenresIds);

        let subGeneres;
        if (subGeneresIds.length) subGeneres = await GenresSubModel.findAll({ where: { id: subGeneresIds } });
        if (subGeneres && subGeneres.length) {
            const mapIds = subGeneres.toMapBy("id");
            for (const income of incomes) if (income.release?.subGenresIds) income.release.dataValues.subGenres = income.release.subGenresIds.map((id) => mapIds[id]?.dataValues);
        }

        const filteredReleases = incomes.filter((income) => {
            const mainGenreCondition = !data.mainGenre || (income.release?.mainGenere && income.release?.mainGenere.name === data.mainGenre);
            const subGenreCondition = !data.subGenres || (income.release?.dataValues.subGenres && income.release?.dataValues.subGenres.some((subGenre) => subGenre.name === data.subGenres));
            return mainGenreCondition && subGenreCondition;
        });

        const incomeGross = this.getIncomeGross(filteredReleases);
        const incomeFees = this.getIncomeFees(filteredReleases);
        const incomeNet = this.getIncomeNet(filteredReleases);
        return { filteredReleases, incomeGross, incomeFees, incomeNet };
    }

    async applyDiscount(releasePrice, tracks) {
        let totalPrice = 0;
        let checkRightDiscount = 0;

        for (const track of tracks) {
            totalPrice += +track.trackPrice;
        }

        const discount = ((totalPrice - releasePrice) / totalPrice).toFixed(5);

        for (const track of tracks) {
            track.trackPrice = (track.trackPrice * (1 - discount)).toFixed(2);
            checkRightDiscount += +track.trackPrice;
        }

        if (checkRightDiscount > releasePrice) tracks[tracks.length - 1].trackPrice = np.minus(tracks[tracks.length - 1].trackPrice, 0.01);

        if (checkRightDiscount < releasePrice) tracks[tracks.length - 1].trackPrice = np.plus(tracks[tracks.length - 1].trackPrice, 0.01);

        return tracks;
    }
}

export default new IncomesService();
