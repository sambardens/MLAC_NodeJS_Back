import axios from "axios";
import usersService from "../../users/users.service.js";
import { ApiError } from "../../errors/errors.api.js";
import evearaService from "../eveara.service.js";

class ReportsService {
    async getPayoutBalance(userId, uuidEveara) {
        const userMajorLabl = await usersService.getUser({ id: userId });
        if (!userMajorLabl) throw ApiError.badRequest("The user doesn't exist");

        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.get(`https://staging.eveara.com/api/v2.0/payout/${uuidEveara}/balance`, {
                headers: {
                    Authorization: accessData.token_type + " " + accessData.access_token,
                },
            });

            return data;
        } catch (err) {
            return err.response.data;
        }
    }

    async getPayoutHistory(userId, uuidEveara) {
        const userMajorLabl = await usersService.getUser({ id: userId });
        if (!userMajorLabl) throw ApiError.badRequest("The user doesn't exist");

        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.get(`https://staging.eveara.com/api/v2.0/payout/${uuidEveara}/history`, {
                headers: {
                    Authorization: accessData.token_type + " " + accessData.access_token,
                },
            });

            return data;
        } catch (err) {
            return err.response.data;
        }
    }

    async payout(userId, uuidEveara, participant_id) {
        const userMajorLabl = await usersService.getUser({ id: userId });
        if (!userMajorLabl) throw ApiError.badRequest("The user doesn't exist");

        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.post(
                `https://staging.eveara.com/api/v2.0/payout/${uuidEveara}`,
                { participant_id },
                {
                    headers: {
                        Authorization: accessData.token_type + " " + accessData.access_token,
                    },
                }
            );

            return data;
        } catch (err) {
            return err.response.data;
        }
    }
}

export default new ReportsService();
