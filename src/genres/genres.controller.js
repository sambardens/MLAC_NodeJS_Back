import genresService from "./genres.service.js";

class GenresController {

    async getMainGenres(req, res, next) {
        try {
            const mainGenres = await genresService.getMainGenres()
            return res.json({success: true, mainGenres})
        } catch(e) {
            next(e)
        }
    }

    async getSubGenres(req, res, next) {
        try {
            const {firstGenreId, secondGenreId} = req.query
            const mainGenreId = []
            firstGenreId ? mainGenreId.push(firstGenreId) : ''
            secondGenreId ? mainGenreId.push(secondGenreId) : ''
            const subGenres = await genresService.getSubGenres({mainGenreId})
            return res.json({success: true, subGenres})
        } catch(e) {
            next(e)
        }
    }

    async saveGenres(req, res, next) {
        try {
            const {bapId} = req.params
            const secondaryGenereId = req?.body?.secondaryGenereId
            const mainGenereId = req?.body?.mainGenereId
            const subGenereIds = req?.body?.sub_generes_ids
            const {user} = req
            // const genreBap =
            await genresService.saveGenres(user, bapId, {
                mainGenereId,
                secondaryGenereId,
                subGenereIds, 
            })
            return res.json({success: true})
        } catch(e) {
            next(e)
        }
    }

    async getGenresBap(req, res, next) {
        try {
            const {bapId} = req.params
            const genresBap = await genresService.getGenresBap({bapId})
            return res.json({success: true, genresBap})
        } catch(e) {
            next(e)
        }
    }

    async removeGenreBap(req, res, next) {
        try {
            const {bapId} = req.params
            const {subGenreId} = req.query
            const {user} = req
            await genresService.removeGenreFromBap(user, bapId, subGenreId)
            return res.json({success: true})
        } catch(e) {
            next(e)
        }
    }
}

export default new GenresController()