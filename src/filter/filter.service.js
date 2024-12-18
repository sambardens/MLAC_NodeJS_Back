import { Op } from "sequelize";
import { UsersModel } from "../users/users.model.js";
import { ReleaseModel } from "../release/release.model.js";
import { BapsModel } from "../baps/baps.model.js";
import { GenresMainModel, GenresSubModel } from "../genres/genres.model.js";
import { IncomesModel } from "../incomes/incomes.model.js";
import { MembersBapsModel } from "../baps/members-baps.model.js";

class FilterService {
    generateFilterForSQL(data) {
        const whereClause = {};

        if (data && data.date) {
            const currentDate = new Date();
            const pastDate = new Date(currentDate);
            
            pastDate.setDate(pastDate.getDate() - data.date);

            whereClause.createdAt = {
                [Op.gt]: pastDate,
                [Op.lt]: currentDate, 
            };
        }

        if (data && data.type) {
            whereClause.type = {
                [Op.like]: data.type,
            };
        }

        if (data && data.performer) {
            whereClause['$bap.name$'] = {
                [Op.like]: data.performers,
            };
        }

        if (data && data.performers) {
            whereClause['$baps.name$'] = {
                [Op.like]: data.performers,
            };
        }
        
        if (data && data.performersTwoInclude) {
            whereClause['$release->bap.name$'] = {
                [Op.like]: data.performersTwoInclude,
            };
        }

        if (data && data.buyer) {
            whereClause.paymentEmail = {
                [Op.like]: data.buyer,
            };
        }

        if (data && data.releaseType) {
            whereClause['$release.type$'] = {
                [Op.like]: data.releaseType,
            };
        }

        if (data && data.roleTwoIncludes) {
            whereClause['$baps->members_baps.role$'] = {
                [Op.like]: data.roleTwoIncludes,
            };
        }
        
        return whereClause
    }

    async generateUniqueFields(data) {
        const uniqueValues = {};

        if (data.email) {
            const uniqueEmails = await UsersModel.findAll({
                attributes: ['email'],
                group: ['email'],
                raw: true,
            });

            uniqueValues.emails = [];
            for (let index = 0; index < uniqueEmails.length; index++) {
                uniqueValues.emails[index] = uniqueEmails[index].email;
            }
        }

        if (data.paymentEmail) {
            const uniquePaymentEmail = await IncomesModel.findAll({
                attributes: ['paymentEmail'],
                group: ['paymentEmail'],
                raw: true,
            });

            uniqueValues.paymentEmail = [];
            for (let index = 0; index < uniquePaymentEmail.length; index++) {
                uniqueValues.paymentEmail[index] = uniquePaymentEmail[index].paymentEmail;
            }
        }

        if (data.releaseTypes) {
            const uniqueTypes = await ReleaseModel.findAll({
                attributes: ['type'],
                group: ['type'],
                raw: true,
            });

            uniqueValues.releaseTypes = [];
            for (let index = 0; index < uniqueTypes.length; index++) {
                uniqueValues.releaseTypes[index] = uniqueTypes[index].type;
            }
        }

        if (data.performers) {
            const uniquePerformers = await BapsModel.findAll({
                attributes: ['name'],
                group: ['name'],
                raw: true,
            });

            uniqueValues.performers = [];
            for (let index = 0; index < uniquePerformers.length; index++) {
                uniqueValues.performers[index] = uniquePerformers[index].name;
            }
        }

        if (data.genres) {
            const uniqueGenres = await GenresMainModel.findAll({
                attributes: ['name'],
                group: ['name'],
                raw: true,
            });

            uniqueValues.genres = [];
            for (let index = 0; index < uniqueGenres.length; index++) {
                uniqueValues.genres[index] = uniqueGenres[index].name;
            }
        }

        if (data.subGenres) {
            const uniqueSubGenres = await GenresSubModel.findAll({
                attributes: ['name'],
                group: ['name'],
                raw: true,
            });

            uniqueValues.subGenres = [];
            for (let index = 0; index < uniqueSubGenres.length; index++) {
                uniqueValues.subGenres[index] = uniqueSubGenres[index].name;
            }
        }

        if (data.role) {
            const uniqueRoles = await MembersBapsModel.findAll({
                attributes: ['role'],
                group: ['role'],
                raw: true,
            });

            uniqueValues.roles = [];
            for (let index = 0; index < uniqueRoles.length; index++) {
                uniqueValues.roles[index] = uniqueRoles[index].role;
            }
        }

        return uniqueValues
    }
} 

export default new FilterService()