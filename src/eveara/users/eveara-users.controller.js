import evearaUsersService from "./eveara-users.service.js";

class EvearaUsersController {
    async getUser(req, res, next) {
        try {
            const { email, uuidEveara } = req.query;
            const data = await evearaUsersService.getUser({ email, uuidEveara });
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }

    async createUser(req, res, next) {
        try {
            const { email, firstName, lastName, isMailSubscribed, address, country, state } = req.body;
            const data = await evearaUsersService.createUser(email, firstName, lastName, isMailSubscribed, address, country, state);
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }

    async updateUser(req, res, next) {
        try {
            const { email, uuidEveara, firstName, lastName, isMailSubscribed, address, country, state } = req.body;
            const data = await evearaUsersService.updateUser(email, uuidEveara, firstName, lastName, isMailSubscribed, address, country, state);
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }
}

export default new EvearaUsersController();
