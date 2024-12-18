import axios from "axios";
import usersService from "../../users/users.service.js";
import { ApiError } from "../../errors/errors.api.js";
import evearaService from "../eveara.service.js";

class EvearaUsersService {
    async getUser(paramData) {
        let params = "";
        if (paramData.email) params += `search_term=${paramData.email}&`;
        if (paramData.uuidEveara) params += `uuid=${paramData.uuidEveara}&`;

        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.get(`https://staging.eveara.com/api/v2.0/users?${params}limit=10&offset=0`, {
                headers: {
                    Authorization: accessData.token_type + " " + accessData.access_token,
                },
            });

            return data;
        } catch (err) {
            return err.response.data;
        }
    }

    async createUser(email, first_name, sur_name, is_mail_subscribed, address, country, state) {
        if (is_mail_subscribed && is_mail_subscribed != 0 && is_mail_subscribed != 1) throw ApiError.badRequest("isMailSubscribed must be a 1 or 0");
        const userMajorLabl = await usersService.getUser({ email });
        if (!userMajorLabl) throw ApiError.badRequest("The user doesn't exist");

        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.post(
                "https://staging.eveara.com/api/v2.0/users",
                {
                    email,
                    first_name,
                    sur_name,
                    is_mail_subscribed,
                    address,
                    country,
                    state,
                },
                {
                    headers: {
                        Authorization: accessData.token_type + " " + accessData.access_token,
                    },
                }
            );
            userMajorLabl.uuidEveara = data.uuid;
            userMajorLabl.save();

            return data;
        } catch (err) {
            return err.response.data;
        }
    }

    async updateUser(email, uuid, first_name, sur_name, is_mail_subscribed, address, country, state) {
        if (is_mail_subscribed && is_mail_subscribed != 0 && is_mail_subscribed != 1) throw ApiError.badRequest("isMailSubscribed must be a 1 or 0");

          const userData = await usersService.getUser({ uuidEveara: uuid });
          const userMajorLabl = userData.dataValues
          let isEqualAccount = false;
          
          if (userMajorLabl.firstName === first_name && userMajorLabl.lastName === sur_name && userMajorLabl.isEmailConfirmed === is_mail_subscribed &&
            userMajorLabl.city === address.city && userMajorLabl.postCodeZipCode === address.zip && userMajorLabl.number === objectKeys.mobile &&
            userMajorLabl.country === country && userMajorLabl.regionState === state && userMajorLabl.uuidEveara === uuid) isEqualAccount = true;
          
        if (isEqualAccount) return "Accounts are equal";

        try {
            const accessData = await evearaService.getAccessToken();
            const { data } = await axios.put(
                "https://staging.eveara.com/api/v2.0/users",
                {
                    first_name,
                    sur_name,
                    email,
                    uuid,
                    is_mail_subscribed,
                    address,
                    country,
                    state,
                },
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

export default new EvearaUsersService();
