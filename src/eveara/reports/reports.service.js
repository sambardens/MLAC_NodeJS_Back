import axios from "axios";
import usersService from "../../users/users.service.js";
import { ApiError } from "../../errors/errors.api.js";
import evearaService from "../eveara.service.js";

class ReportsService {
    async streamReport(userId, uuidEveara, reportType) {
        const userMajorLabl = await usersService.getUser({ id: userId });
        if (!userMajorLabl) throw ApiError.badRequest("The user doesn't exist");

        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.get(`https://staging.eveara.com/api/v2.0/reports/stream?uuid=${uuidEveara}&report_type=${reportType}`, {
                headers: {
                    Authorization: accessData.token_type + " " + accessData.access_token,
                },
            });

            return data;
        } catch (err) {
            return err.response.data;
        }
    }

    async salesReport(userId, uuidEveara, reportType) {
        const userMajorLabl = await usersService.getUser({ id: userId });
        if (!userMajorLabl) throw ApiError.badRequest("The user doesn't exist");

        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.get(`https://staging.eveara.com/api/v2.0/reports/sales?uuid=${uuidEveara}&report_type=${reportType}`, {
                headers: {
                    Authorization: accessData.token_type + " " + accessData.access_token,
                },
            });

            return data;
        } catch (err) {
            return err.response.data;
        }
    }

    async downloadReport(userId, uuidEveara, reportType) {
        const userMajorLabl = await usersService.getUser({ id: userId });
        if (!userMajorLabl) throw ApiError.badRequest("The user doesn't exist");

        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.get(`https://staging.eveara.com/api/v2.0/reports/download?uuid=${uuidEveara}&report_type=${reportType}`, {
                headers: {
                    Authorization: accessData.token_type + " " + accessData.access_token,
                },
            });

            return data;
        } catch (err) {
            return err.response.data;
        }
    }

    async getSummary(userId, uuidEveara) {
        const userMajorLabl = await usersService.getUser({ id: userId });
        if (!userMajorLabl) throw ApiError.badRequest("The user doesn't exist");

        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.get(`https://staging.eveara.com/api/v2.0/summary/total/stream/${uuidEveara}`, {
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

export default new ReportsService();
