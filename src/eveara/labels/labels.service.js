import axios from "axios";
import usersService from "../../users/users.service.js";
import { ApiError } from "../../errors/errors.api.js";
import evearaService from "../eveara.service.js";
import { ReleaseModel } from "../../release/release.model.js";

class LabelsService {
    async getLabel(userId, labelId, uuid) {
        const userMajorLabl = await usersService.getUser({ id: userId });
        if (!userMajorLabl) throw ApiError.badRequest("The user doesn't exist");

        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.get(`https://staging.eveara.com/api/v2.0/labels/${labelId ? labelId : ""}?uuid=${uuid ? uuid : ""}`, {
                headers: {
                    Authorization: accessData.token_type + " " + accessData.access_token,
                },
            });

            return data;
        } catch (err) {
            return err.response.data;
        }
    }

    async addLabel(userId, releaseId, name) {
        const userMajorLabl = await usersService.getUser({ id: userId });
        if (!userMajorLabl) throw ApiError.badRequest("The user doesn't exist");

        const release = await ReleaseModel.findOne({ where: { id: releaseId } })
        if (!release) throw ApiError.badRequest("The release doesn't exist");

        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.post(
                "https://staging.eveara.com/api/v2.0/labels",
                {
                    uuid: userMajorLabl.uuidEveara,
                    name,
                },
                {
                    headers: {
                        Authorization: accessData.token_type + " " + accessData.access_token,
                    },
                }
            );
            release.evearaLabelId = data.label_id
            await release.save()

            return data;
        } catch (err) {
            return err.response.data;
        }
    }
}

export default new LabelsService();
