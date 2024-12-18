import axios from "axios";
import usersService from "../../users/users.service.js";
import evearaService from "../eveara.service.js";
import { ApiError } from "../../errors/errors.api.js";

class SimulateService {
    async simulateDistribute(userMajorLablId, uuid, release_id) {
        const userMajorLabl = await usersService.getUser({ id: userMajorLablId });
        if (!userMajorLabl) throw ApiError.badRequest("The user doesn't exist");

        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.put(`https://staging.eveara.com/api/v2.0//simulate/distribute`, {
                uuid, release_id
            }, {
                headers: {
                    Authorization: accessData.token_type + " " + accessData.access_token,
                },
            });

            return data;
        } catch (err) {
            return err.response.data;
        }
    }

    async simulateTakedown(userMajorLablId, uuid, release_id) {
        const userMajorLabl = await usersService.getUser({ id: userMajorLablId });
        if (!userMajorLabl) throw ApiError.badRequest("The user doesn't exist");

        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.put(`https://staging.eveara.com/api/v2.0//simulate/takedown`, {
                uuid, release_id
            }, {
                headers: {
                    Authorization: accessData.token_type + " " + accessData.access_token,
                },
            });

            return data;
        } catch (err) {
            return err.response.data;
        }
    }
}

export default new SimulateService();
