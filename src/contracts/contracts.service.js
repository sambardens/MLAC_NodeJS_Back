import splitsService from "../splits/splits.service.js";
import { ApiError } from "../errors/errors.api.js";
import { ContractsModel } from "./contracts.model.js";
import bapsService from "../baps/baps.service.js";
import releaseService from "../release/release.service.js";
import notificationsService from "../notifications/notifications.service.js";
import { SplitsModel } from "../splits/splits.model.js";
import fs from "fs";
import path from "path";
import scheme from "../../database/scheme.js";
import { QueryTypes } from "sequelize";
import tracksService from "../tracks/tracks.service.js";
import tokensService from "../tokens/tokens.service.js";
import usersService from "../users/users.service.js";
import mailsService from "../mails/mails.service.js";
import { SplitTracksModel } from "../splits/split-tracks.model.js";
import { SplitUsersModel } from "../splits/split-users.model.js";
import { UsersModel } from "../users/users.model.js";
import { ReleaseModel } from "../release/release.model.js";
import { TracksModel } from "../tracks/tracks.model.js";

class ContractsBigBollOfMud {
    optionsMap = {
        bapId: "baps.id",
        releaseId: "releases.id",
        splitId: "splits.id",
    };

    async getContract(user, contractId) {
        if (!contractId) throw ApiError.badRequest("Contract ID is required");

        const contract = await this.getContractDb({ id: contractId });

        if (!contract) throw ApiError.badRequest("Contract with this ID is not exist");

        const userSplit = await splitsService.getSplitUser(1, {
            splitId: contract.splitId,
            email: user.email,
        });
        if (!contract || (!userSplit && contract.userId !== user.id)) throw ApiError.forbidden("You don't view this contract");

        const fullInfoSplit = await splitsService.getFullInfoSplit(contract.splitId);
        fullInfoSplit.dataValues.id = contract.id;
        fullInfoSplit.dataValues.referenceContractId = contract.referenceContractId;
        fullInfoSplit.dataValues.completed = contract.completed;
        return fullInfoSplit;
    }

    async createContract(user, splitId) {
        const userSplits = await splitsService.getSplitUser(null, { splitId });
        if (!userSplits.length) throw ApiError.badRequest("The split doesn't exist");

        let contract = await this.getContractDb({ splitId });
        // if (contract) throw ApiError.badRequest("The contract exist with this split");

        const split = await splitsService.getSplitDb({ id: splitId });
        const release = await releaseService.getRelease(split.releaseId);
        const isCreator = await bapsService.getBap({ id: release.bapId, creatorId: user.id });
        // if (!isCreator) throw ApiError.forbidden("You aren't creator");

        contract = await this.addNewContractDb({ splitId, userId: user.id });
        const fullInfoSplit = await splitsService.getFullInfoSplit(splitId);
        fullInfoSplit.dataValues.id = contract.id;
        const contractId = contract.id;

        for (const userSplit of userSplits) {
            const recipient = mailsService.initRecipientData(
                [userSplit.email],
                [
                    {
                        name: userSplit.email.split("@")[0],
                    },
                ]
            );
            console.log("\n recipient: ", recipient, "\n");
            await mailsService.sendMail(4782085, recipient, { contractId });

            if (userSplit?.userId) {
                const token = tokensService.generateContractToken({ userId: userSplit.userId });
                await notificationsService.createNotification(token, userSplit?.userId, 4, userSplit.email, user.id);
            }
        }

        return fullInfoSplit;
    }

    async addNewContractDb(values) {
        const contract = await ContractsModel.create(values);
        return contract;
    }

    async signatureContract(user, isAccept, signature, content, contractId) {
        const contract = await this.getContractDb({ id: contractId });
        if (!contract) throw ApiError.badRequest("The contract doesn't exist");

        const isExistSplitUser = await splitsService.getSplitUser(1, {
            splitId: contract.splitId,
            email: user.email,
        });
        if (!isExistSplitUser.length) throw ApiError.forbidden("You don't member of contract");

        const splitUser = (
            await splitsService.getSplitUser(1, {
                splitId: contract.splitId,
                email: user.email,
            })
        )[0];
        let newCancelled = {}

        if (!isAccept) {
            if (content) {
                contract.isCancelled = user.id;
                const splitUsers = await SplitUsersModel.findAll({ where: { splitId: contract.splitId } });
                for (const splitUser of splitUsers) {
                    splitUser.signature = null;
                    splitUser.save();
                    if (user.email !== splitUser.email) {
                        const userForSendEmail = await UsersModel.findOne({ where: { email: splitUser.email } });
                        const recipient = mailsService.initRecipientData([splitUser.email], [{ name: userForSendEmail.firstName + " " + userForSendEmail.lastName }]);
                        const contractId = contract.id;
                        await mailsService.sendMail(5233278, recipient, { contractId });
                    }
                }
                await contract.save();
                this.removeAllSignaturesFromDirectory(contract.id);
                const split = await SplitsModel.findOne({ where: { id: contract.splitId }})
                if (split.dataValues.onlyContract === false) {
                    const newSplit = await splitsService.createSplitRefference(contract.splitId, null, user.id);
                    newCancelled.splitId = split.dataValues.id
                    newCancelled.contractId = newSplit.contract.dataValues.id
                    await this.removeContract(contract.id)
                }
            }

            const userSplits = await splitsService.getSplitUser(null, { splitId: contract.splitId });

            await splitsService.updateSplitUser(
                {
                    signature: null,
                    reviewed: true,
                },
                {
                    splitId: contract.splitId,
                    email: user.email,
                }
            );
            splitUser.signature = null;

            for (const userSplit1 of userSplits) {
                if (userSplit1?.userId && userSplit1.userId !== user.id) {
                    const token = tokensService.generateContractToken({ userId: userSplit1.userId });
                    await notificationsService.createNotification(token, userSplit1.userId, 4, userSplit1.email, user.id, content);
                }
            }
            const data = !isAccept && content ? { ...splitUser, newCancelled } : splitUser
            return data;
        }

        const pathToSignature = await this.saveSignatureInDirectory(signature, contractId, user.id);
        await splitsService.updateSplitUser(
            {
                signature: pathToSignature,
                reviewed: true,
            },
            {
                splitId: contract.splitId,
                email: user.email,
            }
        );

        const refOldContract = await this.liveContract(contract);

        if (refOldContract) {
            const refContractId = refOldContract.contract.dataValues.id;
            const contracts = await scheme.query(
                `
                SELECT contracts.id as contractId, baps.name as bapName, contracts.createdAt as createdAt, 
                    contracts.referenceContractId as referenceContractId, contracts.completed as completed,
                    splits.id as splitId, releases.name as releaseName, releases.id as releaseId, baps.id as bapId,
                    baps.creatorId as creatorBapId, contracts.isOldContract as isOldContract
                FROM contracts
                LEFT JOIN splits ON contracts.splitId = splits.id
                LEFT JOIN releases ON splits.releaseId = releases.id
                LEFT JOIN baps ON releases.bapId = baps.id
                LEFT JOIN users ON users.id = baps.creatorId
                LEFT JOIN split_users ON splits.id = split_users.splitId
                WHERE contracts.id = :contractId
                `,
                {
                    replacements: { contractId: refContractId },
                    raw: true,
                    type: QueryTypes.SELECT,
                }
            );

            const formatedContract = contracts[0];

            const tracks = await tracksService.getTracksFromSplit(formatedContract.splitId, true);
            formatedContract.tracks = tracks;
            const splitUsers = await splitsService.getSplitUser(null, { splitId: formatedContract.splitId });
            formatedContract.users = splitUsers;
            splitUser.signature = pathToSignature;
            return { splitUser, oldContract: formatedContract };
        } else {
            splitUser.signature = pathToSignature;
            return splitUser;
        }
    }

    async getContractDb(options) {
        const contract = await ContractsModel.findOne({ where: options });
        return contract;
    }

    async getContractsDb(options) {
        const contracts = await ContractsModel.findAll({ where: options });
        return contracts;
    }

    async saveSignatureInDirectory(signature, contractId, userId) {
        if (!fs.existsSync(path.resolve("signatures"))) fs.mkdirSync(path.resolve("signatures"));

        if (!fs.existsSync(path.resolve("signatures", `contract_${contractId}`))) fs.mkdirSync(path.resolve("signatures", `contract_${contractId}`));

        const pathToSignature = path.resolve("signatures", `contract_${contractId}`, `userId_${userId}.jpg`);
        if (fs.existsSync(pathToSignature)) throw ApiError.badRequest("You have already signature");

        await signature.mv(pathToSignature);
        return path.join("signature", `${contractId}`, `${userId}`).replaceAll("\\", "/");
    }

    removeAllSignaturesFromDirectory(contractId) {
        const pathToDirectory = path.resolve("signatures", `contract_${contractId}`);
        if (!fs.existsSync(pathToDirectory)) return;

        const files = fs.readdirSync(pathToDirectory);
        for (const file of files) {
            const filePath = path.join(pathToDirectory, file);
            if (fs.statSync(filePath).isDirectory()) {
                this.removeAllSignaturesFromDirectory(filePath);
            } else {
                fs.unlinkSync(filePath);
            }
        }

        fs.rmdirSync(pathToDirectory);
    }

    async getContracts(data) {
        if ((data.bapId && (data.releaseId || data.userId)) || (data.releaseId && data.userId)) throw ApiError.badRequest("You should only specify one parameter");

        let whereString = "WHERE ";
        // if (completed) whereString += 'contracts.completed = true AND '
        // if (data.bapId)
        //     whereString = `baps.id = ${data.bapId}`
        // else if (data.releaseId)
        //     whereString = `releases.id = ${data.releaseId}`
        // else {
        //     const user = await usersService.getUserById(data.userId)
        //     whereString = `split_users.email = '${user.email}'`
        // }

        for (const dataKey in data) {
            if (data[dataKey] && this.optionsMap[dataKey]) {
                whereString += `${this.optionsMap[dataKey]} = ${data[dataKey]} AND `;
            } else if (dataKey === "userId") {
                const user = await usersService.getUserById(data.userId);
                whereString += `split_users.email = '${user.email}' AND `;
            }
        }
        whereString = whereString.substring(0, whereString.lastIndexOf(" AND"));

        const contracts = await scheme.query(
            `
            SELECT DISTINCT(contracts.id) as contractId, baps.name as bapName, contracts.createdAt as createdAt, 
                contracts.referenceContractId as referenceContractId, contracts.completed as completed,
                splits.id as splitId, releases.name as releaseName, releases.id as releaseId, baps.id as bapId,
                baps.creatorId as creatorBapId, contracts.isOldContract as isOldContract, contracts.isCancelled as isCancelled
            FROM contracts
            LEFT JOIN splits ON contracts.splitId = splits.id
            LEFT JOIN releases ON splits.releaseId = releases.id
            LEFT JOIN baps ON releases.bapId = baps.id
            LEFT JOIN users ON users.id = baps.creatorId
            LEFT JOIN split_users ON splits.id = split_users.splitId
            ${whereString !== "WHERE " ? whereString : ""}
        `,
            {
                raw: true,
                type: QueryTypes.SELECT,
            }
        );

        for (let i = 0; i < contracts.length; i++) {
            let tracks = [];
            if (data.releaseId) {
                const isSearchByReleaseId = true;
                tracks = await tracksService.getTracksFromSplit(contracts[i].splitId, isSearchByReleaseId);
            } else {
                tracks = await tracksService.getTracksFromSplit(contracts[i].splitId);
            }
            contracts[i]["tracks"] = tracks;
            const splitUsers = await splitsService.getSplitUser(null, { splitId: contracts[i].splitId });
            contracts[i]["users"] = splitUsers;
        }

        return contracts;
    }

    async liveContract(contract) {
        const isAllSignatures = await this.isAllSignatures(contract.splitId);
        if (isAllSignatures) {
            let refOldContract = null;
            if (contract.referenceContractId) {
                const oldContract = await ContractsModel.findOne({
                    where: { id: contract.referenceContractId },
                    include: { model: SplitsModel, include: { model: SplitTracksModel } },
                });
                oldContract.completed = false;
                await oldContract.save();
                await splitsService.referenceToActiveSplit(contract.splitId);
                const newContract = await ContractsModel.findOne({ where: { id: contract.id }, include: { model: SplitsModel, include: { model: SplitTracksModel } } });
                const oldTrackIds = oldContract.dataValues.split.split_tracks.map((track) => track.trackId);
                const newTrackIds = newContract.dataValues.split.split_tracks.map((track) => track.trackId);
                const notUsedTrackIds = oldTrackIds.filter((trackId) => !newTrackIds.includes(trackId));

                if (notUsedTrackIds.length > 0) {
                    refOldContract = await splitsService.createSplitRefference(oldContract.splitId, notUsedTrackIds);
                }
            }
            await SplitsModel.update({ contractId: contract.id }, { where: { id: contract.splitId } });
            await ContractsModel.update({ completed: true }, { where: { id: contract.id } });
            await this.sendNotificationAboutAllSignContract(contract.id);
            return refOldContract;
        }
    }

    async isAllSignatures(splitId) {
        const splitUsers = await splitsService.getSplitUser(null, { splitId: splitId });

        for (const splitUser1 of splitUsers) {
            if (!splitUser1.signature) return false;
        }
        return true;
    }

    async sendRemindParticipantsContract(contractId) {
        const contract = await this.getContractDb({ id: contractId });
        const usersSplit = await splitsService.getSplitUser(null, {
            splitId: contract.splitId,
            signature: null,
        });
        console.log(usersSplit);
        for (const usersSplitElement of usersSplit) {
            const user = await usersService.getUserByEmail(usersSplitElement.email);

            const recipient = mailsService.initRecipientData(
                [usersSplitElement.email],
                [
                    {
                        name: usersSplitElement.email.split("@")[0],
                    },
                ]
            );
            await mailsService.sendMail(4782085, recipient, { contractId });

            if (!user?.id) continue;

            const token = tokensService.generateContractToken({ userId: user.id, email: usersSplitElement.email });
            await notificationsService.createNotification(token, user.id, 4, user.email);
        }
    }

    async sendNotificationAboutAllSignContract(contractId) {
        const contract = await this.getContractDb({ id: contractId });
        const usersSplit = await splitsService.getSplitUser(null, {
            splitId: contract.splitId,
        });
        for (const usersSplitElement of usersSplit) {
            console.log(usersSplitElement);
            const user = await usersService.getUserByEmail(usersSplitElement.email);

            const token = tokensService.generateContractToken({ userId: usersSplitElement.userId });
            await notificationsService.createNotification(token, usersSplitElement.userId, 5, usersSplitElement.email, user.id, null);

            const recipient = mailsService.initRecipientData(
                [usersSplitElement.email],
                [
                    {
                        name: usersSplitElement.email.split("@")[0],
                    },
                ]
            );
            await mailsService.sendMail(5003323, recipient, { contractId });
        }
    }

    async getContractsNoCompletedSplits(userId, bapId, releaseId) {
        if (!bapId && !releaseId && !userId) throw ApiError.badRequest("Must be at least one parameter");

        const user = await usersService.getUserById(userId);
        if (userId && !user) throw ApiError.badRequest("The user not found");

        if (bapId && releaseId) throw ApiError.badRequest("You should only specify one parameter");

        let contracts;
        let splits;
        if (bapId) {
            contracts = await this.getContracts({ bapId });
            splits = await splitsService.getPendingSplits(contracts, { bapId });
        } else if (releaseId) {
            contracts = await this.getContracts({ releaseId });
            splits = await splitsService.getPendingSplits(contracts, { releaseId });
        } else {
            contracts = await this.getContracts({ userId: user.id });
            contracts = contracts.filter(contract => (contract.bapId, contract.releaseId));
            splits = await splitsService.getPendingSplits(contracts, { userId: user.id });
        }

        return { contracts, splits };
    }

    async removeContract(id) {
        await ContractsModel.destroy({ where: { id } });
    }
}

export default new ContractsBigBollOfMud();
