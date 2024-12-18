import { SplitsModel } from "./splits.model.js";
import releaseService from "../release/release.service.js";
import { ApiError } from "../errors/errors.api.js";
import { SplitUsersModel } from "./split-users.model.js";
import { SplitTracksModel } from "./split-tracks.model.js";
import tracksService from "../tracks/tracks.service.js";
import usersService from "../users/users.service.js";
import notificationsService from "../notifications/notifications.service.js";
import bapsService from "../baps/baps.service.js";
import scheme from "../../database/scheme.js";
import { QueryTypes, Sequelize } from "sequelize";
import contractsService from "../contracts/contracts.service.js";
import { ContractsModel } from "../contracts/contracts.model.js";
import { Op } from "sequelize";
import { ReleaseModel } from "../release/release.model.js";
import mailsService from "../mails/mails.service.js";
import tokensService from "../tokens/tokens.service.js";

class SplitsService {
    async createSplits(authorRequest, trackIds, releaseId, onlyContract) {
        const release = await releaseService.getRelease({ id: releaseId });
        if (!release) throw ApiError.badRequest("The release doesn't found");

        const tracks = await tracksService.getTracksByReleaseId(releaseId);
        const newTrackIds = [];

        for (const tracksKey in tracks) {
            for (let i = 0; i < trackIds.length; i++) {
                if (tracks[tracksKey].id === trackIds[i]) newTrackIds.push(trackIds[i]);
            }
        }
        if (trackIds.length !== newTrackIds.length) throw ApiError.badRequest("You must enter track from your release");

        const split = await this.createNewSplit(release.id, onlyContract); // splitsModel
        const tracksSplit = await tracksService.addTracksToSplit(split.id, trackIds); // trackSplitsModel
        return { split, tracksSplit };
    }

    async createSplitRefference(splitId, notUsedTrackIds, cancelledUserId) {
        return await scheme.transaction(async (t) => {
            const split = await SplitsModel.findOne({ where: { id: splitId }, transaction: t });
            if (!split) throw ApiError.badRequest("The split doesn't found");

            const splitRef = await SplitsModel.create(
                {
                    releaseId: split.releaseId,
                    refferenceId: notUsedTrackIds ? null : cancelledUserId ? null : split.id,
                    onlyContract: true,
                },
                { returning: true, transaction: t }
            );

            const contract = await ContractsModel.findOne({ where: { splitId: splitId } });
            let contract_new = null;
            if (contract) {
                const data = {
                    splitId: splitRef.id,
                    userId: contract.userId,
                    referenceContractId: cancelledUserId ? null : contract.id,
                    completed: notUsedTrackIds ? true : false,
                    isOldContract: notUsedTrackIds ? true : contract.isOldContract,
                }
                if (cancelledUserId) {
                    contract_new = await ContractsModel.create(
                        { ...data, isCancelled: cancelledUserId},
                        {
                            returning: true,
                            transaction: t,
                        }
                    );
                } else {
                    contract_new = await ContractsModel.create(
                        data,
                        {
                            returning: true,
                            transaction: t,
                        }
                    );
                }
            }

            const splitOwnerships = await SplitUsersModel.findAll({ where: { splitId: split.id, ownership: { [Op.ne]: 0 } } });
            const splitTracks = await SplitTracksModel.findAll({ where: { splitId: split.id } });

            let users = [];
            if (notUsedTrackIds) {
                users = await SplitUsersModel.bulkCreate(
                    splitOwnerships.map((item) => ({
                        splitId: splitRef.id,
                        email: item.email,
                        signature: item.signature,
                        reviewed: item.reviewed,
                        ownership: item.ownership,
                    })),
                    { transaction: t }
                );
            } else {
                await SplitUsersModel.bulkCreate(
                    splitOwnerships.map((item) => ({
                        splitId: splitRef.id,
                        email: item.email,
                        ownership: item.ownership,
                    })),
                    { transaction: t }
                );
            }

            let tracks = [];
            if (notUsedTrackIds) {
                tracks = await SplitTracksModel.bulkCreate(
                    notUsedTrackIds.map((id) => ({
                        splitId: splitRef.id,
                        trackId: id,
                        active: false,
                    })),
                    { transaction: t }
                );
            } else {
                await SplitTracksModel.bulkCreate(
                    splitTracks.map((item) => ({
                        splitId: splitRef.id,
                        trackId: item.trackId,
                        active: false,
                    })),
                    { transaction: t }
                );
            }

            return {
                split: splitRef,
                contract: contract_new,
            };
        });
    }

    async referenceToActiveSplit(splitId) {
        const split = await SplitsModel.findOne({ where: { id: splitId } });
        if (!split) throw ApiError.badRequest("The split doesn't found");

        // await scheme.transaction(async (t) => {
        await SplitTracksModel.update({ active: false }, { where: { splitId: split.refferenceId } });
        await SplitTracksModel.update({ active: true }, { where: { splitId: split.id } });
        // await SplitsModel.update({refferenceId: splitRef.id}, {where: {id: splitId}, transaction: t})
        // await SplitUsersModel.destroy({where: {splitId: splitId}, transaction: t})
        // })
    }

    async createNewSplit(releaseId, onlyContract) {
        const split = await SplitsModel.create({ releaseId, onlyContract });
        return split;
    }

    async createUserSplit(splitId, email, ownership) {
        const userSplit = await SplitUsersModel.create({
            splitId,
            email,
            ownership,
        });
        return userSplit;
    }

    // async getSplitUser(splitId, email) {
    //     const userSplit = await scheme.query(`
    //         SELECT * FROM
    //     `)
    //     const userSplit = await SplitUsersModel.findOne({where: {splitId, email}})
    //     return userSplit
    // }

    async getSplit(options) {
        const optionsMap = {
            contractId: "contracts.id",
            trackId: "split_tracks.active = 1 AND split_tracks.trackId",
            splitId: "splits.id",
            email: "split_users.email",
        };

        let where = "";
        for (const optionsKey in options) {
            if (options[optionsKey] && optionsMap[optionsKey]) {
                where += `${optionsMap[optionsKey]} = ${options[optionsKey]} AND `;
            }
        }

        where = where.substring(0, where.lastIndexOf(" AND"));

        const split = await scheme.query(
            `
            SELECT splits.id as splitId, contracts.id as contractId, split_tracks.trackId as trackId, 
                split_users.email as userEmail, contracts.completed as contractCompleted, contracts.userId as creatorBapId
            FROM splits
            LEFT JOIN split_tracks ON splits.id = split_tracks.splitId
            LEFT JOIN split_users ON splits.id = split_users.splitId
            LEFT JOIN contracts ON splits.id = contracts.splitId
            WHERE ${where}
            LIMIT 1
        `,
            {
                raw: true,
                type: QueryTypes.SELECT,
            }
        );
        return split[0];
    }

    async addWriterOwnership(splitId, ownership, user) {
        let split = await SplitsModel.findOne({ where: { id: splitId } });
        if (!split) throw ApiError.badRequest("The split doesn't found");
        if (split.contractId) throw ApiError.badRequest("You can't add writer to this split");

        const mapRefenceOwnership = {};
        if (split.refferenceId) {
            const splitOwnerships = await SplitUsersModel.findAll({
                where: { splitId: split.refferenceId, ownership: { [Op.ne]: 0 } },
            });

            for (const splitOwnership of splitOwnerships) {
                if (!ownership[splitOwnership.email]) {
                    ownership[splitOwnership.email] = 0;
                    mapRefenceOwnership[splitOwnership.email] = splitOwnership.ownership;
                }
            }
        }

        const userSplit = await this.getSplitUser(null, { splitId });

        let sum = 0;
        for (const ownershipKey in ownership) {
            sum += ownership[ownershipKey];
        }

        if (sum !== 100) throw ApiError.badRequest("The sum percent mustn't be more or less than 100");

        for (const ownershipKey in ownership) {
            if (!userSplit.some((item) => item.email === ownershipKey)) {
                await this.createUserSplit(splitId, ownershipKey, ownership[ownershipKey]);
            } else {
                // const userSplit = await this.getSplitUser(1, {splitId, ownershipKey})
                await this.updateSplitUser(
                    {
                        ownership: ownership[ownershipKey],
                    },
                    {
                        splitId,
                        email: ownershipKey,
                    }
                );
            }
        }

        const junkData = userSplit.filter((item) => !ownership[item.email] && !mapRefenceOwnership[item.email]);
        for (const junkDatum of junkData) {
            await this.removeUserSplit(junkDatum.email, splitId);
        }

        const contract = await ContractsModel.findOne({ where: { splitId: splitId } });
        if (contract) {
            await contractsService.removeAllSignaturesFromDirectory(contract.id);
            await this.updateSplitUser({ signature: null, reviewed: false }, { splitId });
        }

        console.log('split: ', split?.dataValues);
        console.log('contract: ', contract?.dataValues);
        const splitUsers = await this.getSplitUser(null, { splitId });
        const contractId = contract ? contract.dataValues.id : null
        const onlyContract = split.dataValues.onlyContract;

        if (split.onlyContract === false) {
            const release = await ReleaseModel.findOne({ where: { id: split.releaseId }, attributes: ['name']});
            const releaseName = release.dataValues.name;
            this.sendEmailstToSplitUsers(splitUsers, 4666983, onlyContract, null, user, releaseName)
        } else {
            if (contractId) {
                this.sendEmailstToSplitUsers(splitUsers, 4782085, onlyContract, contractId, user, null);
            }
        }

        return splitUsers;
    }

    async sendEmailstToSplitUsers (splitUsers, templateId, onlyContract, contractId, user, releaseName) {
        for (const userSplit of splitUsers) {
            const recipient = mailsService.initRecipientData(
                [userSplit.email],
                [
                    {
                        name: userSplit.email.split("@")[0],
                    },
                ]
            );
            let vars = {}
            if (!contractId) {
                vars.senderName = user.firstName + user.lastName;
                vars.releaseName = releaseName;
            } else {
                vars.contractId = contractId
            }
            if (contractId || (!onlyContract && user.id !== userSplit.userId)) await mailsService.sendMail(templateId, recipient, vars);

            if (userSplit?.userId) {
                const token = tokensService.generateContractToken({ userId: userSplit.userId });
                await notificationsService.createNotification(token, userSplit?.userId, 4, userSplit.email, user.id);
            }
        }
    }

    async canYouAddWriter(bapId, ownership) {
        for (const ownershipKey in ownership) {
            const user = await usersService.getUserByEmail(ownershipKey);
            if (!user) {
                const user = await notificationsService.getNotification({
                    email: ownershipKey,
                    typeNotificationId: 1,
                });
                const featureUser = await notificationsService.getNotification({
                    email: ownershipKey,
                    typeNotificationId: 3,
                });
                if (!user && !featureUser) throw ApiError.badRequest("You can't add these users");
                return true;
            }
            const isMember = await bapsService.checkOnMemberBap(user.id, bapId);
            if (!isMember) throw ApiError.badRequest("You can't add these users");
        }
    }

    async updateSplitUser(setOptions, whereOptions) {
        let set = "";
        for (const option in setOptions) {
            if (option) {
                if (typeof setOptions[option] === "string" || typeof setOptions[option] === "symbol") set += `${option} = '${setOptions[option]}', `;
                else set += `${option} = ${setOptions[option]}, `;
            }
        }

        let where = "";
        for (const whereOption in whereOptions) {
            if (whereOptions[whereOption]) where += `${whereOption} = '${whereOptions[whereOption]}' && `;
        }

        const indexWhere = where.lastIndexOf("&&");
        where = where.substring(0, indexWhere - 1);

        const indexSet = set.lastIndexOf(", ");
        set = set.substring(0, indexSet);

        const splitUser = await scheme.query(`
            UPDATE split_users SET ${set} WHERE ${where}
        `);

        return splitUser;
    }

    async getSplitUser(limit, options) {
        let where = "WHERE ";
        for (const optionsKey in options) {
            if (options[optionsKey] == null) {
                where += `split_users.${optionsKey} IS ${options[optionsKey]} AND `;
            } else {
                where += `split_users.${optionsKey} = '${options[optionsKey]}' AND `;
            }
        }
        const strLimit = limit ? `LIMIT ${limit}` : "";

        const index = where.lastIndexOf("AND");
        where = where.substring(0, index - 1);

        const userSplit = await scheme.query(
            `
            SELECT users.id as userId, split_users.email as email,  firstName, lastName, users.avatar as userAvatar, 
                ownership, splitId, signature, reviewed, users.paymentEmail as paymentEmail
            FROM split_users
            LEFT JOIN users ON split_users.email = users.email
            ${where !== "WHERE " ? where : ""}
            ${strLimit}
        `,
            {
                raw: true,
                type: QueryTypes.SELECT,
            }
        );
        return userSplit;
    }

    async getAllSplits(options) {
        const splits = await SplitsModel.findAll({ where: options });
        return splits;
    }

    async getSplitDb(options) {
        const split = await SplitsModel.findOne({ where: options });
        return split;
    }

    async getFullInfoSplit(splitId) {
        const split = await this.getSplitDb({ id: splitId });
        const tracks = await tracksService.getTracksFromSplit(splitId);
        const usersSplit = await this.getSplitUser(null, { splitId: split.id });
        split.dataValues["splitId"] = splitId;
        split.dataValues["tracksSplit"] = tracks;
        split.dataValues["splitUsers"] = usersSplit;
        return split;
    }

    async removeUserSplit(email, splitId) {
        await SplitUsersModel.destroy({ where: { email, splitId } });
    }

    async getPendingSplits(contracts, data) {
        let pendingSplits = [];

        if (data.bapId) {
            const releases = await releaseService.getReleases({ bapId: data.bapId });
            for (const release of releases) {
                const splits = await this.getAllSplits({ releaseId: release.id });
                for (const split of splits) {
                    const data = await this.getShortDataOfSplit(split.id);
                    pendingSplits = pendingSplits.concat(data);
                }
            }
        } else if (data.releaseId) {
            const splits = await this.getAllSplits({ releaseId: data.releaseId });
            const isSearchByReleaseId = true;
            for (const split of splits) {
                const splitData = await this.getShortDataOfSplit(split.id, isSearchByReleaseId);
                pendingSplits = pendingSplits.concat(splitData);
            }
        } else {
            const user = await usersService.getUserById(data.userId);
            const splitUsers = await this.getSplitUser(null, { email: user.email });
            for (const splitUser of splitUsers) {
                const splitData = await this.getShortDataOfSplit(splitUser.splitId);
                pendingSplits = pendingSplits.concat(splitData);
            }
        }
        const filteredSplits = pendingSplits.filter((splitItem) => splitItem.onlyContract === false);
        return filteredSplits;
    }

    async getShortDataOfSplit(splitId, isSearchByReleaseId) {
        const result = [];

        const split = await this.getSplitDb({ id: splitId });
        const release = await releaseService.getRelease({ id: split.releaseId });
        if (!release) return {}
        // if (!release) throw ApiError.badRequest("The release doesn't found");
        const bap = await bapsService.getBap({ id: release.bapId });
        const tracks = await tracksService.getTracksFromSplit(split.id, isSearchByReleaseId);
        const users = await this.getSplitUser(null, { splitId: split.id });

        split.dataValues["releaseName"] = release ? release.name : null;
        split.dataValues["bapName"] = bap ? bap.name : null;
        split.dataValues["bapId"] = bap ? bap.id : null;
        split.dataValues["creatorBapId"] = bap ? bap.creatorId : null;
        split.dataValues["tracks"] = tracks ? tracks : null;
        split.dataValues["users"] = users ? users : null;
        result.push(split);

        return result;
    }

    async removeSplit(splitId) {
        await SplitsModel.destroy({ where: { id: splitId } });
    }

    async getSplitTrack(options) {
        const splitTrack = await SplitTracksModel.findOne({ where: options });
        return splitTrack;
    }

    async checkAccessForAnalytics(options) {
        let where = "";

        const optionsMap = {
            userEmail: "email",
            releaseId: "`split`.`releaseId`",
            trackId: "`split->split_tracks`.`trackId`",
        };

        where = `${optionsMap.userEmail} = '${options.userEmail}' AND`;

        if (options.releaseId) where += `${optionsMap.releaseId} = ${options.releaseId}`;

        if (options.trackId) where += `${optionsMap.trackId} = ${options.trackId}`;

        const splitUser = await SplitUsersModel.findAll({
            where: Sequelize.literal(where),
            include: { model: SplitsModel, include: { model: SplitTracksModel } },
        });

        if (splitUser) return true;
    }
}

export default new SplitsService();
