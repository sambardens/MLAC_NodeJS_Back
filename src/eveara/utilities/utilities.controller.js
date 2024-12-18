import utilitiesService from "./utilities.service.js";

class UtilitiesController {
    async getGenres(req, res, next) {
        try {
            const data = await utilitiesService.getGenres();
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }

    async getLanguages(req, res, next) {
        try {
            const data = await utilitiesService.getLanguages();
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }

    async getAvailabilities(req, res, next) {
        try {
            const data = await utilitiesService.getAvailabilities();
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }

    async getCountries(req, res, next) {
        try {
            const data = await utilitiesService.getCountries();
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }

    async getRoles(req, res, next) {
        try {
            const data = await utilitiesService.getRoles();
            return res.json({ ...data });
        } catch (e) {
            next(e);
        }
    }
}

export default new UtilitiesController();
