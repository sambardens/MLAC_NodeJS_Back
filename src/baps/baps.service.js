import { BapsModel } from "./baps.model.js";
import usersService from "../users/users.service.js";
import scheme from "../../database/scheme.js";
import { MembersBapsModel } from "./members-baps.model.js";
import { Op, QueryTypes, Sequelize } from "sequelize";
import { ApiError } from "../errors/errors.api.js";
import notificationsService from "../notifications/notifications.service.js";
import imagesService from "../images/images.service.js";
import tokensService from "../tokens/tokens.service.js";
import dotenv from "dotenv";
import mailsService from "../mails/mails.service.js";
import { DeletionBapsModel } from "./deletion-baps.model.js";
import { FutureCreatorBapsModel } from "./future-creator-baps.model.js";
import { getThirtyDaysAgo, getSixtyDaysAgo } from "../../utils/global.variables.js";
import { ApplyDeletionBapsModel } from "./apply-deletion-baps.model.js";
import { ReleaseModel } from "../release/release.model.js";
import { UsersModel } from "../users/users.model.js";
import { ShopsModel } from "../shops/shops.model.js";
import { LandingModel } from "../landing/landing.model.js";
import spotifyService from "../spotify/spotify.service.js";
import { NotificationsModel } from "../notifications/notifications.model.js";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

class BapsService {
    async createBap(name, role, userId) {
        const bap = await BapsModel.create({ name, role, creatorId: userId });
        return bap;
    }

    async getAllBaps(userId) {
        const baps = await scheme.query(
            `
            SELECT DISTINCT (baps.id) as bapId, baps.name as bapName, baps.avatar as bapAvatar, baps.bapStatus, baps.description as bapDescription,
            baps.artist_bio as bapArtistBio, designId, facebookPixel, spotifyId, baps.thumbnail as thumbnail, baps.napsterId as napsterId, 
            baps.deezerId as deezerId, baps.appleMusicId as appleMusicId, baps.spotifyUri as spotifyUri, baps.evearaBapId as evearaBapId,
            baps.country as country, baps.soundCloudId as soundCloudId
            FROM baps
            LEFT JOIN members_baps ON members_baps.bapId = baps.id
            WHERE baps.creatorId = ${userId} || members_baps.userId = ${userId}
            ORDER BY baps.id DESC
        `,
            {
                type: QueryTypes.SELECT,
                raw: true,
            }
        );

        return baps;
    }

    async getBapsForCheckSpotify(spotifyId) {
        const baps = await BapsModel.findOne({
            where: {
                spotifyId,
            },
            attributes: ["id", "name"],
        });

        return baps;
    }

    async getAllBapsAsAdmin() {
        const baps = await BapsModel.findAll({
            attributes: [
                "id",
                "name",
                "avatar",
                "thumbnail",
                "bapStatus",
                [Sequelize.literal("COUNT(members_baps.id) + 1"), "countMembers"],
                [Sequelize.fn("COUNT", Sequelize.col("releases.bapId")), "countReleases"],
            ],
            include: [
                { model: MembersBapsModel, attributes: [] },
                { model: ReleaseModel, attributes: [] },
            ],
            group: ["baps.id"],
        });

        return baps;
    }

    async getBap(where, options) {
        const bap = await BapsModel.findOne({ where, ...options });
        return bap;
    }

    async getBapShopByUserId(userId) {
        const bap = await BapsModel.findAll({
            where: {
                [Op.or]: [
                    { creatorId: userId },
                    {
                        "$members_baps.userId$": userId,
                    },
                ],
            },
            include: [
                {
                    model: MembersBapsModel,
                },
                {
                    model: ShopsModel,
                },
            ],
        });
        return bap;
    }

    async getBapLandingByUserId(userId) {
        const bap = await BapsModel.findAll({
            where: {
                [Op.or]: [
                    { creatorId: userId },
                    {
                        "$members_baps.userId$": userId,
                    },
                ],
            },
            include: [
                {
                    model: MembersBapsModel,
                },
                {
                    model: ReleaseModel,
                    include: { model: LandingModel },
                },
            ],
        });
        return bap;
    }

    async getMember(userId, bapId) {
        const member = await MembersBapsModel.findOne({ where: { userId, bapId } });
        return member;
    }

    async getMembersAsAdmin(bapId) {
        const members = await MembersBapsModel.findAll({
            where: { bapId },
            attributes: [
                "id",
                "role",
                "userId",
                [Sequelize.literal("`user`.`firstName`"), "firstName"],
                [Sequelize.literal("`user`.`lastName`"), "lastName"],
                [Sequelize.literal("`user`.`email`"), "email"],
                [Sequelize.literal("`user`.`accountStatus`"), "accountStatus"],
            ],
            include: {
                model: UsersModel,
                attributes: [],
            },
        });
        const creator = await BapsModel.findAll({
            attributes: [
                [Sequelize.literal("NULL"), "id"],
                [Sequelize.literal('"Creator"'), "role"],
                ["creatorId", "userId"],
                [Sequelize.literal("`user`.`firstName`"), "firstName"],
                [Sequelize.literal("`user`.`lastName`"), "lastName"],
                [Sequelize.literal("`user`.`email`"), "email"],
                [Sequelize.literal("`user`.`accountStatus`"), "accountStatus"],
            ],
            where: {
                id: bapId,
            },
            include: {
                model: UsersModel,
                attributes: [],
            },
        });
        members.push(creator[0]);

        return members;
    }

    async getReleasesAsAdmin(bapId) {
        const releases = await ReleaseModel.findAll({ where: { bapId }, attributes: ["id", "name", "type", "logo"] });
        return releases;
    }

    async editBapById(bapId, authorRequest, data) {
        if (data?.name) {
            const isExistBap = await this.getBap({
                name: data.name,
                [Op.not]: {
                    id: bapId,
                },
            });
        }

        if (data.avatar && data.urlAvatar) throw ApiError.badRequest("You must enter only file or urlAvatar");

        const bap = await this.getBap({ id: bapId });
        if (!bap) throw ApiError.badRequest("Bap with this ID don't exist");

        const isMember = await this.checkOnMemberBap(authorRequest.id, bapId);
        if (!isMember) throw ApiError.badRequest("You don't member this bap");

        const isSpotifyId = await this.checkOnSpotifyIdBap(data?.spotifyId);
        if (isSpotifyId) throw ApiError.badRequest("Another B.A.P. already synced with this Spotify");

        const sizes = {
            width: 450,
            height: 450,
        };

        data.avatar = await imagesService.saveImageDb(bap.avatar, { image: data.avatar, urlImage: data.urlAvatar, sizes });
        data.urlAvatar = null;

        if (data.avatar) {
            data.thumbnail = `thumb_${data.avatar}`;
        } else if (bap.avatar) {
            data.thumbnail = `thumb_${bap.avatar}`;
        } else {
            data.thumbnail = null;
        }

        if (data.removeAvatar === "true") {
            data.avatar = null;
            data.thumbnail = null;
        }

        console.log("\n data: ", data, "\n");
        for (const dataKey in data) {
            if (data[dataKey] === "") data[dataKey] = null;
            if (data[dataKey] === undefined) data[dataKey] = bap[dataKey];
            bap[dataKey] = data[dataKey];
        }

        await bap.save();
        return bap;
    }

    async getArtistFromSpotifyById(artistId) {
        const artist = await spotifyService.getArtistById(artistId);
        return artist;
    }

    async updateBapAsAdmin(bapId, data) {
        if (data?.avatar && data?.urlAvatar) throw ApiError.badRequest("You must enter only file or urlAvatar");

        const bap = await this.getBap({ id: bapId });
        if (!bap) throw ApiError.badRequest("Bap with this ID don't exist");

        const isSpotifyId = await this.checkOnSpotifyIdBap(data.spotifyId);
        if (isSpotifyId) throw ApiError.badRequest("Another B.A.P. already synced with this Spotify");

        const isBapStatusValid = await this.isValidBapStatus(data?.bapStatus);
        if (!isBapStatusValid) throw ApiError.badRequest(`Bap status can be ${process.env.STATUS_ACTIVE} or ${process.env.STATUS_HIDDEN}`);

        const sizes = {
            width: 450,
            height: 450,
        };

        data.avatar = await imagesService.saveImageDb(bap.avatar, { image: data.avatar, urlImage: data.urlAvatar, sizes });
        data.urlAvatar = null;

        if (data.avatar) {
            data.thumbnail = `thumb_${data.avatar}`;
        } else if (data.avatar === "" || data.avatar === undefined || data.avatar === null) {
            data.thumbnail = null;
        } else {
            data.thumbnail = `thumb_${bap.avatar}`;
        }

        for (const dataKey in data) {
            if (data[dataKey]) bap[dataKey] = data[dataKey];
        }

        await bap.save();
        return bap;
    }

    async addUserToBap(userId, bapId, role, notificationId) {
        const isMember = await this.getMember(userId, bapId);
        if (isMember) throw ApiError.badRequest("The user already member this bap");
        const member = await MembersBapsModel.create({ userId, bapId, role, notificationId });
        return member;
    }

    async removeMemberFromBap(userId, bapId) {
        const member = await MembersBapsModel.destroy({ where: { userId, bapId } });
        return member;
    }

    async joinToBap(authorRequest, token, isAccept = true) {
        const notification = await notificationsService.getNotification({
            token,
        });
        notification.userId = authorRequest.id;
        notification.email = authorRequest.email;
        await notification.save();

        const validate = await tokensService.validateToken(token, process.env.SECRET_INVITE_TOKEN);

        const isMember = await this.checkOnMemberBap(authorRequest.id, validate.bapId);
        if (isMember) throw ApiError.badRequest("You already member this bap");

        if (isAccept) await this.addUserToBap(authorRequest.id, validate.bapId, validate.role, notification.id);

        return notification;
    }

    async checkOnMemberBap(userId, bapId) {
        const isMember = await this.getMember(userId, bapId);
        const bap = await this.getBap({ id: bapId });
        if (isMember) return isMember;

        if (bap.creatorId === userId) return true;
    }

    async checkOnSpotifyIdBap(spotifyId) {
        if (!spotifyId) return false;
        const isSpotifyId = await BapsModel.findOne({
            where: {
                spotifyId,
            },
        });
        if (isSpotifyId) return true;
    }

    async setPermissionBap(authorRequestId, userId, bapId) {
        const isMemberAuthor = await this.checkOnMemberBap(authorRequestId, bapId);
        const isMemberUser = await this.checkOnMemberBap(userId, bapId);
        if (!isMemberAuthor || !isMemberUser) throw ApiError.forbidden("You or User don't members this bap");

        isMemberUser.isFullAdmin = !isMemberUser.isFullAdmin;
        isMemberUser.save();
        return isMemberUser;
    }

    async getMembers(bapId) {
        const bap = await this.getBap({ id: bapId });

        if (!bap) throw ApiError.badRequest("The bap doesn't exist");

        const members = await scheme.query(
            `
            SELECT members_baps.userId as userId, firstName, lastName, email, bapId, users.avatar as avatar, 
            isFullAdmin, members_baps.role as role, uuidEveara, users.thumbnail as thumbnail
            FROM users
            LEFT JOIN members_baps ON members_baps.userId = users.id
            LEFT JOIN baps ON members_baps.bapId = baps.id
            WHERE members_baps.bapId = ${bapId}
        `,
            {
                raw: true,
                type: QueryTypes.SELECT,
            }
        );
        const creator = await scheme.query(
            `
            SELECT users.id as userId, firstName, lastName, email, baps.id as bapId, users.avatar as avatar, role,
            uuidEveara, users.thumbnail as thumbnail
            FROM users
            LEFT JOIN baps ON baps.creatorId = users.id
            WHERE baps.id = ${bapId}
        `,
            {
                raw: true,
                type: QueryTypes.SELECT,
            }
        );
        console.log(creator);
        members.push({ ...creator[0], isCreator: true, isFullAdmin: 1 });
        return members;
    }

    async confirmDeletionBap(user, token) {
        const validation = tokensService.validateToken(token, process.env.SECRET_DELETION_BAP_TOKEN);
        const bap = await this.getBap({ id: validation.bapId });
        const members = await this.getMembers(bap.id);
        if (!bap || user.id !== bap.creatorId || validation.userId !== user.id || members.length > 1) throw ApiError.forbidden("You don't have permission to deletion of this bap");

        const deletionBap = await this.getDeletionBap({ creatorId: user.id, bapId: bap.id });
        if (deletionBap) throw ApiError.badRequest("You already confirm the deletion bap");

        const saveDataOfBapToken = tokensService.generateSaveDataOfBapToken({
            creatorId: user.id,
            bapId: bap.id,
            email: user.email,
        });

        const recipient = mailsService.initRecipientData([user.email], [{ name: user.firstName }]);
        await mailsService.sendMail(4666978, recipient, { bapName: bap.name, saveDataOfBapToken });
        const createdDeletionBap = await this.createDeletionBap({ creatorId: user.id, bapId: bap.id, saveDataOfBapToken });

        return createdDeletionBap;
    }

    async tryDeletionBap(userId, bapId, emailFutureCreator) {
        const user = await usersService.getUserById(userId);
        const bap = await this.getBap({ id: bapId });
        if (!bap || user.id !== bap.creatorId) throw ApiError.badRequest("You don't have permission to deletion of this bap");

        const isExistApplyDeletionBap = await this.getApplyDeletionBap({
            isNewUser: false,
            bapId,
            createdAt: {
                [Op.gte]: getSixtyDaysAgo() + "Z",
            },
        });
        if (isExistApplyDeletionBap) throw ApiError.badRequest("You have already applied for deletion");

        const members = await this.getMembers(bapId);
        if (members.length <= 1) {
            const recipients = mailsService.initRecipientData([user.email], [{ name: user.firstName }]);
            const confirmToken = tokensService.generateDeletionBapToken({
                userId: user.id,
                email: user.email,
                bapId,
                allUsers: false,
            });
            await mailsService.sendMail(4666925, recipients, { confirmToken });
            return confirmToken;
        }
        const futureCreator = await usersService.getUserByEmail(emailFutureCreator);
        if (!futureCreator) throw ApiError.badRequest("The user doesn't exist");

        const isMember = await this.getMember(futureCreator.id, bapId);
        if (!isMember) throw ApiError.badRequest("User doesn't member this bap");

        const tokenFutureArtist = tokensService.generateDeletionBapToken({
            futureCreatorId: futureCreator.id,
            bapId,
            authorDeletionId: userId,
            allUsers: false,
        });

        const futureRecipient = mailsService.initRecipientData(
            [emailFutureCreator],
            [
                {
                    name: futureCreator.firstName,
                    bapName: bap.name,
                    authorDelete: user.firstName,
                    token: tokenFutureArtist,
                },
            ]
        );

        // mail "BAP takeover request (the first mail) to future artist
        await mailsService.sendMail(4666943, futureRecipient);

        // 4666957 - stepping down... for author of bap
        const authorRecipient = mailsService.initRecipientData(
            [user.email],
            [
                {
                    name: user.firstName,
                    bapName: bap.name,
                },
            ]
        );
        await mailsService.sendMail(4666957, authorRecipient);

        const applyDeletionBap = await this.createApplyDeletionBap({ bapId });

        await this.createFutureCreatorBap({
            token: tokenFutureArtist,
            bapId,
            userId: futureCreator.id,
            applyDeletionBapId: applyDeletionBap.id,
        });
        return tokenFutureArtist;
    }

    async createDeletionBap(values) {
        const deletionBap = await DeletionBapsModel.create(values);
        return deletionBap;
    }

    async getDeletionBap(options) {
        const deletionBap = await DeletionBapsModel.findOne({ where: options });
        return deletionBap;
    }

    async getAllDeletionBaps(options) {
        const deletionBaps = await DeletionBapsModel.findAll({ where: options });
        return deletionBaps;
    }

    async removeBap(options) {
        const removeBap = await BapsModel.destroy({ where: options });
    }

    async sendInviteBap(authorRequest, bapId, email, role) {
        if (!role) throw ApiError.badRequest("Role is required");

        const bap = await this.getBap({ id: bapId });
        if (!bap) throw ApiError.forbidden("You don't have permission to invite members to bap");

        const isMember = await this.getMember(authorRequest.id, bapId);
        if (!isMember?.isFullAdmin && bap.creatorId !== authorRequest.id) throw ApiError.forbidden("You don't have permission to invite members to bap");

        let user = null;
        if (email) user = await usersService.getUserByEmail(email);

        const token = tokensService.generateInviteToken({
            senderId: authorRequest.id,
            recipientId: user?.id,
            bapId,
            role,
            email,
            typeNotificationId: 1,
        });

        const notification = await notificationsService.createNotification(token, user?.id, 1, email, authorRequest.id);
        if (notification && user) {
            await NotificationsModel.destroy({ where: { userId: user.id, email, typeNotificationId: 1, id: {[ Sequelize.Op.not]: notification.dataValues.id }}});
        }

        await notificationsService.createNotificationBap(email, user?.id, bapId, notification.id, role);

        if (email) {
            const recipients = mailsService.initRecipientData([email]);
            await mailsService.sendMail(4666995, recipients, {
                senderName: authorRequest.firstName,
                bapName: bap.dataValues.name,
                token,
                name: email.split("@")[0],
            });
        }

        console.log("author: ", authorRequest);
        const author = await UsersModel.findOne({ where: { id: authorRequest.id } });
        author.totalInvites += 1;
        author.save();

        return token;
    }

    async setNewCreator(newUserId, bapId) {
        const bap = await this.getBap({ id: bapId });
        bap.creatorId = newUserId;
        await bap.save();
        return bap;
    }

    async createFutureCreatorBap(values) {
        const futureCreator = await FutureCreatorBapsModel.create(values);
        return futureCreator;
    }

    async getFutureCreatorBap(options) {
        const futureCreator = await FutureCreatorBapsModel.findOne({ where: options });
        return futureCreator;
    }

    async getAllFutureCreatorsBap(options) {
        const futureCreator = await FutureCreatorBapsModel.findAll({ where: options });
        return futureCreator;
    }

    async createApplyDeletionBap(values) {
        const futureCreator = await ApplyDeletionBapsModel.create(values);
        return futureCreator;
    }

    async getApplyDeletionBap(options) {
        const futureCreator = await ApplyDeletionBapsModel.findOne({ where: options });
        return futureCreator;
    }

    async getAllApplyDeletionBaps(options) {
        const futureCreator = await ApplyDeletionBapsModel.findAll({ where: options });
        return futureCreator;
    }

    async acceptToBeFutureCreator(user, token) {
        const validation = tokensService.validateToken(token, process.env.SECRET_DELETION_BAP_TOKEN);

        const bap = await this.getBap({ id: validation.bapId });
        if (!validation.allUsers && (validation?.futureCreatorId !== user.id || !bap)) throw ApiError.badRequest("You can't accept this invite");

        const applyDeletionBap = await this.getApplyDeletionBap({
            bapId: bap.id,
            isNewUser: false,
            isTimeout: false,
            // createdAt: {
            //     [Op.gte]: getSixtyDaysAgo() + 'Z'
            // }
        });

        if (!applyDeletionBap) throw ApiError.badRequest("You cannot approved this invitation");

        const isExistFutureCreator = await this.getFutureCreatorBap({
            token,
            applyDeletionBapId: applyDeletionBap.id,
            isTimeout: false,
            userId: user.id,
        });

        if (!isExistFutureCreator)
            // throw ApiError.badRequest('You cannot approved this invitation')

            await this.createFutureCreatorBap({
                token,
                bapId: validation.bapId,
                userId: user.id,
                isApproved: true,
                applyDeletionBapId: applyDeletionBap.id,
            });

        const owner = await this.changeOwnerBap(user, validation, bap, token, applyDeletionBap);
        return owner;
    }

    async changeOwnerBap(user, validation, bap, token, applyDeletionBap) {
        const futureCreator = await this.getFutureCreatorBap({
            token,
            // bapId: validation.bapId,
            userId: user.id,
            // isApproved: true,
        });

        futureCreator.isApproved = true;
        await futureCreator.save();
        applyDeletionBap.isNewUser = true;
        applyDeletionBap.save();
        const creator = await this.setNewCreator(user.id, validation.bapId);
        await this.addUserToBap(validation.authorDeletionId, validation.bapId, bap.role, null);
        await this.removeMemberFromBap(user.id, validation.bapId);
        return creator;
    }

    async deleteBaps(bapId) {
        const bap = await BapsModel.destroy({ where: { id: bapId } });
        return bap;
    }

    async isValidBapStatus(bapStatus) {
        const allowedStatuses = [process.env.STATUS_ACTIVE, process.env.STATUS_HIDDEN];
        return allowedStatuses.includes(bapStatus);
    }
}

export default new BapsService();
