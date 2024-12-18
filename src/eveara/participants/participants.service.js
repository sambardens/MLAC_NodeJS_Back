import axios from "axios";
import usersService from "../../users/users.service.js";
import { ApiError } from "../../errors/errors.api.js";
import evearaService from "../eveara.service.js";
import { ParticipantsModel } from "./participants.model.js";

class ParticipantsService {
    async addParticipant(userMajorLablId, userId, name) {
        const userMajorLabl = await usersService.getUser({ id: userMajorLablId });
        if (!userMajorLabl) throw ApiError.badRequest("The user doesn't exist");

        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.post(
                "https://staging.eveara.com/api/v2.0/participants",
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

            if (data) {
                const participant = await ParticipantsModel.create({
                    creatorId: userMajorLablId,
                    uuidEveara: userMajorLabl.uuidEveara,
                    userId,
                    participantId: +data.participant_id,
                });
                return participant;
            }
        } catch (err) {
            return err.response.data;
        }
    }

    async getParticipantsById(user, creatorId, userId) {
        if (creatorId && userId) throw ApiError.badRequest("must be only one query param");
        if (!creatorId && !userId) throw ApiError.badRequest("specify the query params");
        const userMajorLabl = await usersService.getUser({ id: user.id });
        if (!userMajorLabl) throw ApiError.badRequest("The user doesn't exist");

        const where = creatorId ? { where: { creatorId } } : { where: { userId } }
        try {
            const participants = ParticipantsModel.findAll(where);

            return participants;
        } catch (err) {
            return err;
        }
    }

    async getParticipant(userId, participantId, uuid) {
        const userMajorLabl = await usersService.getUser({ id: userId });
        if (!userMajorLabl) throw ApiError.badRequest("The user doesn't exist");

        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.get(`https://staging.eveara.com/api/v2.0/participants/${participantId ? participantId : ""}?uuid=${uuid}`, {
                headers: {
                    Authorization: accessData.token_type + " " + accessData.access_token,
                },
            });

            return data;
        } catch (err) {
            return err.response.data;
        }
    }

    async getParticipantPaypal(userId, uuidEveara, participantId) {
        const userMajorLabl = await usersService.getUser({ id: userId });
        if (!userMajorLabl) throw ApiError.badRequest("The user doesn't exist");

        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.get(`https://staging.eveara.com/api/v2.0/participants/paypal/${participantId}?uuid=${uuidEveara}`, {
                headers: {
                    Authorization: accessData.token_type + " " + accessData.access_token,
                },
            });

            return data;
        } catch (err) {
            return err.response.data;
        }
    }

    async addParticipantPaypal(userId, uuid, participantId, paypal_email_id) {
        const userMajorLabl = await usersService.getUser({ id: userId });
        if (!userMajorLabl) throw ApiError.badRequest("The user doesn't exist");

        console.log(userId, uuid, participantId, paypal_email_id);
        const accessData = await evearaService.getAccessToken();
        try {
            const { data } = await axios.post(
                `https://staging.eveara.com/api/v2.0/participants/paypal/${participantId}`,
                {
                    uuid,
                    paypal_email_id,
                },
                {
                    headers: {
                        Authorization: accessData.token_type + " " + accessData.access_token,
                    },
                }
            );

            if (data) {
                const participant = await ParticipantsModel.findOne({ where: { participantId } });
                participant.paypalEmailId = paypal_email_id;
                await participant.save();
            }

            return data;
        } catch (err) {
            return err.response?.data;
        }
    }
}

export default new ParticipantsService();
