import { CreditsModel } from "./credits.model.js";
import { CreditTypesModel } from "./credit-types.model.js";
import scheme from "../../database/scheme.js";
import { QueryTypes } from "sequelize";
import { ApiError } from "../errors/errors.api.js";
import { TracksModel } from "../tracks/tracks.model.js";

class CreditsService {
    async addCredits(trackId, creditIds, userId, name) {
        if (userId && name) throw ApiError.badRequest("Must be something one: userId or name");
        if (!trackId || !creditIds || (!userId && !name)) throw ApiError.badRequest("Enter all required fields please");
        const track = await TracksModel.findOne({ where: { id: trackId } });
        if (!track) throw ApiError.badRequest("Track doesn't exist");
        creditIds = JSON.stringify(creditIds);
        let existCreditUser;
        if (userId) {
            existCreditUser = await CreditsModel.findOne({ where: { trackId, userId } });
            let credit;
            if (existCreditUser && creditIds.length === 2) {
                await CreditsModel.destroy({ where: { trackId, userId } });
                return "removed successfully";
            } else if (existCreditUser) {
                credit = await existCreditUser.update({ trackId, creditIds, userId, name });
            } else if (!existCreditUser && creditIds.length === 2) {
                return "nothing to create, update or remove";
            } else {
                credit = await CreditsModel.create({ trackId, creditIds, userId, name });
            }
            credit.creditIds = JSON.parse(credit.creditIds);

            return credit;
        } else if (name) {
            existCreditUser = await CreditsModel.findOne({ where: { trackId, name } });
            let credit;
            if (existCreditUser && creditIds.length === 2) {
                await CreditsModel.destroy({ where: { trackId, name } });
                return "removed successfully";
            } else if (existCreditUser) {
                credit = await existCreditUser.update({ trackId, creditIds, userId, name });
            } else if (!existCreditUser && creditIds.length === 2) {
                return "nothing to create, update or remove";
            } else {
                credit = await CreditsModel.create({ trackId, creditIds, userId, name });
            }
            credit.creditIds = JSON.parse(credit.creditIds);

            return credit;
        }
    }

    async getCreditTypes() {
        const creditTypes = await CreditTypesModel.findAll();
        return creditTypes;
    }

    async getCredits(trackId) {
        const credits = await CreditsModel.findAll({ where: { trackId } });
        return credits;
    }

    async removeCredits(options) {
        await CreditsModel.destroy({ where: options });
    }
}

export default new CreditsService();
