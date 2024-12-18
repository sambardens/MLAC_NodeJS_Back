import axios from "axios";
import usersService from "../../users/users.service.js";
import evearaService from "../eveara.service.js";
import { ApiError } from "../../errors/errors.api.js";
import { UsersModel } from "../../users/users.model.js";

class SubscriptionsService {
    async getPartnerSubscriptions(userMajorLablId, subscriptionsId) {
        const userMajorLabl = await usersService.getUser({ id: userMajorLablId });
        if (!userMajorLabl) throw ApiError.badRequest("The user doesn't exist");

        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.get(`https://staging.eveara.com/api/v2.0/subscriptions/partner/${subscriptionsId ? subscriptionsId : ""}`, {
                headers: {
                    Authorization: accessData.token_type + " " + accessData.access_token,
                },
            });

            return data;
        } catch (err) {
            return err.response.data;
        }
    }

    async getUserSubscriptions(userMajorLablId, subscriptionsId, uuid) {
        const userMajorLabl = await usersService.getUser({ id: userMajorLablId });
        if (!userMajorLabl) throw ApiError.badRequest("The user doesn't exist");

        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.get(`https://staging.eveara.com/api/v2.0/subscriptions/${subscriptionsId ? subscriptionsId : ""}?uuid=${uuid}`, {
                headers: {
                    Authorization: accessData.token_type + " " + accessData.access_token,
                },
            });

            return data;
        } catch (err) {
            return err.response.data;
        }
    }

    async addUserSubscription(userMajorLablId, subscriptions) {
        const userMajorLabl = await usersService.getUser({ id: userMajorLablId });
        if (!userMajorLabl) throw ApiError.badRequest("The user doesn't exist");

        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.post(
                `https://staging.eveara.com/api/v2.0/subscriptions/`,
                { uuid: userMajorLabl.uuidEveara, subscriptions },
                {
                    headers: {
                        Authorization: accessData.token_type + " " + accessData.access_token,
                    },
                }
            );

            const user = await UsersModel.findOne({ where: { id: userMajorLablId } })
            user.evearaSubscriptionId = data.data[0].my_subscription_id
            user.save()

            return data;
        } catch (err) {
            return err.response?.data;
        }
    }
}

export default new SubscriptionsService();
