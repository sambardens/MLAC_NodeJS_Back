import {GenresBapsModel, GenresMainModel, GenresSubModel} from "./genres.model.js";
import bapsService from "../baps/baps.service.js";
import {ApiError} from "../errors/errors.api.js";
import scheme from "../../database/scheme.js";
import {QueryTypes, Op} from "sequelize";

class GenresService {

    async getMainGenres() {
        const genres = await GenresMainModel.findAll()
        return genres
    }

    async getSubGenres(options) {
        const genres = await GenresSubModel.findAll({where: options})
        return genres
    }

    async getSubGenre(options) {
        const genre = await GenresSubModel.findOne({where: options})
        return genre
    }

    async saveGenres(user, bapId, { 
        mainGenereId,
        secondaryGenereId,
        subGenereIds
    }) {
        const bap = await bapsService.getBap({id: bapId})
        if (!bap)
            throw ApiError.badRequest('Bap doesn\'t exist')

        // if (subGenreId && subGenreName || !subGenreId && !subGenreName)
        //     throw ApiError.badRequest('You must enter subGenreId or subGenreName')
        // let subGenres
        // if (subGenereIds) subGenres = await this.getSubGenres({id: subGenereIds})
        // else
        //     subGenre = await this.getSubGenre({name: subGenreName})
        // if (subGenres.length === 0)
        //     throw ApiError.badRequest('This subgenre doesn\'t exist')
        // const isExistGenreBap = await this.getGenreBap({bapId, subGenreId: subGenre.id})
        // if (isExistGenreBap)
        //     throw ApiError.badRequest('The genre already exist on the bap')
        if (mainGenereId || mainGenereId === null) 
            bap.mainGenereId = mainGenereId
        if (secondaryGenereId || secondaryGenereId === null)
            bap.secondGenereId = secondaryGenereId
        if (subGenereIds) 
            await this.uploadGenresToBap(subGenereIds, bapId)
  
        await bap.save()

        return {}
    }

    async uploadGenresToBap(subGenresIds, bapId) {
        const subGenereBaps = subGenresIds.map(id => ({ subGenreId: id, bapId }));
        const genreBaps = await GenresBapsModel.bulkCreate(subGenereBaps,{
            updateOnDuplicate: ['subGenreId', 'bapId'],
        })

        const where = { bapId }
        if (subGenresIds.length > 0) where.subGenreId = { [Op.notIn]: subGenresIds}
        await GenresBapsModel.destroy({ where })
        return genreBaps
    }

    async getGenresBap(options) {

        const bap = await bapsService.getBap({id: options.bapId},{
            attributes: [],
            include: [ 'mainGenere', 'secondGeneres', GenresSubModel ]
        })

        return bap
    }

    async getGenreBap(options) {
        const genresBaps = await GenresBapsModel.findOne({where: options})
        return genresBaps
    }

    async removeGenreFromBap(user, bapId, subGenreId) {
        const bap = await bapsService.getBap({id: bapId})
        if (!bap)
            throw ApiError.badRequest('Bap doesn\'t exist')

        const subGenre = await this.getSubGenre({id: subGenreId})
        if (subGenre.length === 0)
            throw ApiError.badRequest('This subgenre doesn\'t exist')

        const isExistGenreBap = await this.getGenreBap({bapId, subGenreId})
        if (!isExistGenreBap)
            throw ApiError.badRequest('The genre doesn\'t exist on the bap')

        await GenresBapsModel.destroy({where: {subGenreId, bapId}})
    }
}

export default new GenresService()