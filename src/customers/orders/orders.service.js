import {ApiError} from "../../errors/errors.api.js";
import incomesService from "../../incomes/incomes.service.js";
import usersService from "../../users/users.service.js";
import {IncomesModel} from "../../incomes/incomes.model.js";
import scheme from "../../../database/scheme.js";
import {QueryTypes} from "sequelize";
import np from "number-precision";
import { TracksModel } from "../../tracks/tracks.model.js";
import { IncomesTracksModel } from "../../incomes/incomes-tracks.model.js";
import { ReleaseModel } from "../../release/release.model.js";
import { BapsModel } from "../../baps/baps.model.js";
import { Op } from "sequelize";
import Sequelize from "sequelize";

Array.prototype.toMapArraysBy = function (prop) {
    return this.reduce(function (groups, item) {
        // console.log(prop, 'prop')
        // console.log(groups, 'prop')
        const val = item[prop]
        if (!groups[val]) groups[val] = []
        groups[val].push(item)
        return groups
    }, {})
}

class OrdersService {

    async getOrders(userId) {
        const user = await usersService.getUser({id: userId})
        if (!user)
            throw ApiError.badRequest('The user doesn\'t exist')

        const baps= await this.getIncomes({userId: user.id})
        return baps
    }

    async getIncomes(options) {
        let where = ''

        const optionsMap = {
            bapId: 'baps.id',
            releaseId: 'releases.id',
            // userId: 'baps.creatorId',
            userId: 'userId',
        };

        for (const optionsKey in options) {
            if (options[optionsKey]) {
                if (optionsMap.hasOwnProperty(optionsKey))
                    where += `${optionsMap[optionsKey]} = ${options[optionsKey]} AND `;
            }
        }

        where = where.substring(0, where.lastIndexOf(' AND'))

        const incomes = await IncomesModel.findAll({
            where: Sequelize.literal(where)
        })
        const incomesTracks = await IncomesTracksModel.findAll({
            where: {
                incomeId: {
                    [Op.in]: incomes.map(income => income.id)
                }
            }
        })
        console.log("incomesTracks: ", incomesTracks);
        const releases = await ReleaseModel.findAll({
            where: {
                id: {
                    [Op.in]: incomes.map(income => income.releaseId)
                }
            }
        })

        const tracks = await TracksModel.findAll({
            where: {
                id: {
                    [Op.in]: incomesTracks.map(income => income.trackId)
                }
            }
        })

        const baps = await BapsModel.findAll({
            where: {
                id: {
                    [Op.in]: releases.map(release => release.bapId)
                }
            }
        })

        const tracksMap = tracks.toMapArraysBy('releaseId')
        for (const release of releases) {
            if (!release.tracks) release.tracks = []
            release.dataValues.tracks = release.tracks.concat(tracksMap[release.id])
        }
        const releasesMap = releases.toMapArraysBy('bapId')
        for (const bap of baps) {
            if (!bap.releases) bap.releases = []
            bap.dataValues.releases = bap.releases.concat(releasesMap[bap.id])
        }

        return baps
    }
    // getIncomeGross(incomes) {
    //     let sum = 0
    //     for (const income of incomes) {
    //         sum = np.plus(sum, income.gross)
    //     }
    //     return sum
    // }
}

export default new OrdersService()
// new OrdersService().getIncomes({userId: 944}).then((e)=>{console.dir(JSON.parse(JSON.stringify(e)), {depth: 5})})