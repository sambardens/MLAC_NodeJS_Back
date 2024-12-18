import {ApiError} from "../errors/errors.api.js";
import usersService from "../users/users.service.js";
import {SocialsModel} from "./socials.model.js";
import bapsService from "../baps/baps.service.js";

class SocialsService {


    async getSocialLink(options) {
        const bapSocial = await SocialsModel.findOne({where: options})
        return bapSocial
    }

    async getSocialLinks(options) {
        const bapSocial = await SocialsModel.findAll(options)
        return bapSocial
    }

    async getSocialLinksByBapId(user, bapId) {
        const isMemberBap = await bapsService.checkOnMemberBap(user.id, bapId)
        if (!isMemberBap)
            throw ApiError.forbidden('You don\'t member this bap')

        const socialLinks = await this.getSocialLinks({where: {bapId}})
        return socialLinks
    }

    async editSocialLinks(user, bapId, socialData) {
        // const isMemberBap = await bapsService.checkOnMemberBap(user.id, bapId)
        // if (!isMemberBap)
        //     throw ApiError.forbidden('You don\'t member this bap')

        const socialsDb = await this.getSocialLinks({
            where: {bapId},
            order: [
                ['position', 'ASC'],
                ['id', 'DESC'],
            ]
        })

        if (!socialsDb)
            throw ApiError.badRequest('This social doesn\'t exist')

        const socialForRemove = await socialsDb.filter(socialDbItem => socialData.every(socialDataItem =>
            socialDbItem.social !== socialDataItem.social ||
            socialDbItem.position !== socialDataItem.position
        ))

        const socialForAdd = await socialData.filter(socialDataItem => socialsDb.every(socialDbItem =>
            socialDataItem.social !== socialDbItem.social ||
            socialDataItem.position !== socialDbItem.position
        ))

        for (const socialForAddElement of socialForAdd) {
            await this.createSocialLink({
                social: socialForAddElement.social,
                position: socialForAddElement.position,
                bapId
            })
        }

        for (const socialForAddElement of socialForRemove) {
            await this.dropSocialLink({
                where: {id: socialForAddElement.id}
            })
        }

        const resultSocial = await this.getSocialLinks({where: {bapId}})
        return resultSocial
    }

    async createSocialLink(values) {
        const social = await SocialsModel.create(values)
        return social
    }

    async dropSocialLink(options) {
        const social = await SocialsModel.destroy(options)
        return social
    }
}

export default new SocialsService()