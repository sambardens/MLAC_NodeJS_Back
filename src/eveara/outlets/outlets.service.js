import axios from "axios";
import usersService from "../../users/users.service.js";
import evearaService from "../eveara.service.js";
import { ApiError } from "../../errors/errors.api.js";
import { ReleaseModel } from "../../release/release.model.js";

class OutletsService {
    async getOutlets(userMajorLablId, uuidEveara) {
        const userMajorLabl = await usersService.getUser({ id: userMajorLablId });
        if (!userMajorLabl) throw ApiError.badRequest("The user doesn't exist");

        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.get(`https://staging.eveara.com/api/v2.0/outlets?uuid=${uuidEveara}`, {
                headers: {
                    Authorization: accessData.token_type + " " + accessData.access_token,
                },
            });

            return data;
        } catch (err) {
            return err.response.data;
        }
    }

    async getOutletsDetailsByAlbum(userMajorLablId, releaseId, uuidEveara) {
        const userMajorLabl = await usersService.getUser({ id: userMajorLablId });
        if (!userMajorLabl) throw ApiError.badRequest("The user doesn't exist");

        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.get(`https://staging.eveara.com/api/v2.0/outlets/${releaseId}?uuid=${uuidEveara}`, {
                headers: {
                    Authorization: accessData.token_type + " " + accessData.access_token,
                },
            });

            return data;
        } catch (err) {
            return err.response.data;
        }
    }

    async distribute(userMajorLablId, releaseId, body) {
        const userMajorLabl = await usersService.getUser({ id: userMajorLablId });
        if (!userMajorLabl) throw ApiError.badRequest("The user doesn't exist");

        const bodyForEveara = { uuid: body.uuid, outlets_details: body.outlets_details };
        const bodyForMajor = { ...body.evearaPriceId };

        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.patch(`https://staging.eveara.com/api/v2.0/outlets/${releaseId}/distribute`, bodyForEveara, {
                headers: {
                    Authorization: accessData.token_type + " " + accessData.access_token,
                },
            });

            if (data) {
                const release = await ReleaseModel.findOne({ where: { evearaReleaseId: releaseId } });
                release.appleMusicReleasePriceId = bodyForMajor.appleMusicReleasePriceId;
                release.appleMusicTrackPriceId = bodyForMajor.appleMusicTrackPriceId;
                release.amazonReleasePriceId = bodyForMajor.amazonReleasePriceId;
                release.amazonTrackPriceId = bodyForMajor.amazonTrackPriceId;
                await release.save();
            }

            return data;
        } catch (err) {
            return err.response.data;
        }
    }
}

export default new OutletsService();
