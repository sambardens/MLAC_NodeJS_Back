import axios from "axios";
import usersService from "../../users/users.service.js";
import { ApiError } from "../../errors/errors.api.js";
import evearaService from "../eveara.service.js";
import { ReleaseModel } from "../../release/release.model.js";

class AlbumsService {
    async addAlbum(userMajorLablId, body) {
        if (!body.releaseId) throw ApiError.badRequest("releaseId from MajorLabl is required");
        const userMajorLabl = await usersService.getUser({ id: userMajorLablId });
        if (!userMajorLabl) throw ApiError.badRequest("The user doesn't exist");

        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.post(
                "https://staging.eveara.com/api/v2.0/albums",
                {
                    uuid: userMajorLabl.uuidEveara,
                    ...body,
                },
                {
                    headers: {
                        Authorization: accessData.token_type + " " + accessData.access_token,
                    },
                }
            );

            const release = await ReleaseModel.findOne({ where: { id: body.releaseId } });
            release.evearaReleaseId = data.release_id;
            release.save();

            return data;
        } catch (err) {
            return err.response.data;
        }
    }

    async updateAlbum(userMajorLablId, releaseId, body) {
        if (!releaseId) throw ApiError.badRequest("releaseId from MajorLabl is required");
        const userMajorLabl = await usersService.getUser({ id: userMajorLablId });
        if (!userMajorLabl) throw ApiError.badRequest("The user doesn't exist");

        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.put(
                `https://staging.eveara.com/api/v2.0/albums/${releaseId}`,
                {
                    uuid: userMajorLabl.uuidEveara,
                    ...body,
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

    async validateAlbum(releaseId, uuidEveara) {
        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.get(`https://staging.eveara.com/api/v2.0/albums/${releaseId}/validate?uuid=${uuidEveara}`, {
                headers: {
                    Authorization: accessData.token_type + " " + accessData.access_token,
                },
            });

            return data;
        } catch (err) {
            return err.response.data;
        }
    }

    async getAlbum(userMajorLablId, uuid) {
        const userMajorLabl = await usersService.getUser({ id: userMajorLablId });
        if (!userMajorLabl) throw ApiError.badRequest("The user doesn't exist");

        console.log(uuid);
        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.get(`https://staging.eveara.com/api/v2.0/albums?uuid=${uuid}`, {
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

export default new AlbumsService();
