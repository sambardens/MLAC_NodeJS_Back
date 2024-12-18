import participantsService from "./participants.service.js";

class ParticipantsController {
    async addParticipant(req, res, next) {
        try {
            const { user } = req;
            const { userId, name } = req.body;
            const participant = await participantsService.addParticipant(user.id, userId, name);
            return res.json({ success: true, participant });
        } catch (e) {
            next(e);
        }
    }

    async getParticipantsById(req, res, next) {
        try {
            const { user } = req;
            const { creatorId, userId } = req.query;
            const participants = await participantsService.getParticipantsById(user, creatorId, userId);
            return res.json({ success: true, participants });
        } catch (e) {
            next(e);
        }
    }

    async getParticipant(req, res, next) {
        try {
            const { user } = req;
            const { participantId, uuidEveara } = req.query;
            const data = await participantsService.getParticipant(user.id, participantId, uuidEveara);
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }

    async getParticipantPaypal(req, res, next) {
        try {
            const { user } = req;
            const { participantId } = req.params;
            const { uuidEveara } = req.query;
            const data = await participantsService.getParticipantPaypal(user.id, uuidEveara, participantId);
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }

    async addParticipantPaypal(req, res, next) {
        try {
            const { user } = req;
            const { participantId } = req.params;
            const { uuid, paypalEmailId } = req.body;
            const data = await participantsService.addParticipantPaypal(user.id, uuid, participantId, paypalEmailId);
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }
}

export default new ParticipantsController();
