import axios from "axios";
import usersService from "../../users/users.service.js";
import { ApiError } from "../../errors/errors.api.js";
import evearaService from "../eveara.service.js";
import bapsService from "../../baps/baps.service.js";
import { BapsModel } from "../../baps/baps.model.js";

class ArtistsService {
    async getArtist(uuidEveara, artistId) {
        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.get(
                `https://staging.eveara.com/api/v2.0/artists/${artistId ? artistId : ""}?uuid=${uuidEveara ? uuidEveara : ""}&limit=20&offset=0`,
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

    async updateArtist(userId, bapId, body) {
        const userMajorLabl = await usersService.getUser({ id: userId });
        if (!userMajorLabl) throw ApiError.badRequest("The user doesn't exist");

        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.put(
                "https://staging.eveara.com/api/v2.0/artists",
                {
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

    async addArtist(userId, body) {
        const userMajorLabl = await usersService.getUser({ id: userId });
        if (!userMajorLabl) throw ApiError.badRequest("The user doesn't exist");


        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.post(
                "https://staging.eveara.com/api/v2.0/artists",
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
            if (body.bapId) {
                const bap = await bapsService.getBap({ id: body.bapId });
                bap.evearaBapId = data.artist_id;
                await bap.save();
            }

            return data;
        } catch (err) {
            return err.response.data;
        }
    }
}

export default new ArtistsService();
