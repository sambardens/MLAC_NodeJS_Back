import contractsService from "./contracts.service.js";
import path from "path";
import splitsService from "../splits/splits.service.js";
import releaseService from "../release/release.service.js";

class ContractsController {
    async getContract(req, res, next) {
        try {
            const { contractId } = req.params;
            const { user } = req;
            const contract = await contractsService.getContract(user, contractId);
            return res.json({ success: true, contract });
        } catch (e) {
            next(e);
        }
    }

    async createContracts(req, res, next) {
        try {
            const { splitId } = req.params;
            const { user } = req;
            const contracts = await contractsService.createContract(user, splitId);
            return res.json({ success: true, contracts });
        } catch (e) {
            next(e);
        }
    }

    async signatureContract(req, res, next) {
        try {
            const { contractId } = req.params;
            const isAccept = req.body?.isAccept;
            const content = req.body?.content;
            const signature = req?.files?.signature;
            const { user } = req;
            const contractUser = await contractsService.signatureContract(user, String(isAccept) === "true", signature, content, contractId);
            if (contractUser.oldContract) {
                return res.json({ success: true, contractUser: contractUser.splitUser, oldContract: contractUser.oldContract });
            } else {
                return res.json({ success: true, contractUser });
            }
        } catch (e) {
            next(e);
        }
    }

    async getSignatureImage(req, res, next) {
        try {
            const { contractId, userId } = req.params;
            const pathToSignature = path.resolve("signatures", `contract_${contractId}`, `userId_${userId}`);
            return res.sendFile(pathToSignature + ".jpg");
        } catch (e) {
            next(e);
        }
    }

    async getContractsNoCompletedSplits(req, res, next) {
        try {
            const { userId, bapId, releaseId } = req.query;
            const result = await contractsService.getContractsNoCompletedSplits(userId, bapId, releaseId);
            return res.json({ success: true, ...result });
        } catch (e) {
            next(e);
        }
    }

    async sendRemindParticipantsContract(req, res, next) {
        try {
            const { contractId } = req.params;
            await contractsService.sendRemindParticipantsContract(contractId);
            return res.json({ success: true });
        } catch (e) {
            next(e);
        }
    }

    async removeContract(req, res, next) {
        try {
            const { contractId } = req.params;
            await contractsService.removeContract(contractId);
            return res.json({ success: true });
        } catch (e) {
            next(e);
        }
    }
}

export default new ContractsController();
