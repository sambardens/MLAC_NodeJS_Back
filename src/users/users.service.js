import { UsersModel } from "./users.model.js";
import tokenService from "../tokens/tokens.service.js";
import { ApiError } from "../errors/errors.api.js";
import bcrypt from "bcrypt";
import imagesService from "../images/images.service.js";
import authService from "../auth/auth.service.js";
import scheme from "../../database/scheme.js";
import { QueryTypes, Sequelize } from "sequelize";
import bapsService from "../baps/baps.service.js";
import np from "number-precision";
import { BapsModel } from "../baps/baps.model.js";
import { SplitUsersModel } from "../splits/split-users.model.js";
import { MembersBapsModel } from "../baps/members-baps.model.js";
import mailsService from "../mails/mails.service.js";
import filterService from "../filter/filter.service.js";
import { allowedSortFieldsUser, allowedSortOrders, userFilter } from "../../utils/global.variables.js";
import { TokensModel } from "../tokens/tokens.model.js";
import { IncomesModel } from "../incomes/incomes.model.js";
import incomesService from "../incomes/incomes.service.js";

class UsersService {
    async getUserById(userId) {
        const user = await UsersModel.findByPk(userId);
        return user;
    }

    async getUserByEmail(email) {
        const user = await UsersModel.findOne({ where: { email } });
        return user;
    }

    async getUserByNewEmail(newEmail) {
        const user = await UsersModel.findOne({ where: { newEmail } });
        return user;
    }

    async setNewPassword(token, newPassword, confirmPassword) {
        const validation = tokenService.validateToken(token, process.env.SECRET_RECOVERY_TOKEN);

        if (newPassword !== confirmPassword) throw ApiError.badRequest("Enter equals password");

        if (!authService.isPasswordLength(newPassword, 6, 15)) throw ApiError.badRequest("Your password is long or short");

        const user = await this.getUserByEmail(validation.email);
        const hashPassword = bcrypt.hashSync(newPassword, 10);
        user.password = hashPassword;
        user.save();
        return user;
    }

    async setNewEmail(newEmail, userId) {
        const user = await this.getUserById(userId);
        console.log(user);
        if (!user) {
            throw ApiError.badRequest("The user with this id does not exist");
        }

        const userWithNewEmail = await this.getUserByEmail(newEmail);
        if (userWithNewEmail) {
            throw ApiError.badRequest("The user already exist with this email");
        }
        user.newEmail = newEmail;
        const activateToken = tokenService.generateActivateToken({ email: newEmail, id: user.id });
        const recipients = mailsService.initRecipientData([newEmail]);

        await mailsService.sendMail(4976929, recipients, {
            name: user.firstName,
            token: activateToken,
        });
        user.save();
        return { user, activateToken };
    }

    async activateNewEmail(token) {
        const verified = tokenService.validateToken(token, process.env.SECRET_ACTIVATE_ACCOUNT_TOKEN);
        const userDb = await this.getUserByNewEmail(verified.email);
        userDb.email = verified.email;
        userDb.newEmail = null;
        userDb.save();
    }

    async editSettings(userId, data) {
        const user = await this.getUserById(userId);

        if (data.email) {
            const existUser = await this.getUser({ email: data.email });
            if (existUser) throw ApiError.badRequest("The user already exist with this email");

            if (!authService.isValidEmail(data.email)) throw ApiError.badRequest("The email don't correct");
        }

        const sizes = {
            width: 120,
            height: 120,
        };

        data.avatar = await imagesService.saveImageDb(user.avatar, { image: data.avatar, sizes });

        if (data.avatar) {
            data.thumbnail = `thumb_${data.avatar}`;
        } else if (!data.avatar && !user.avatar) {
            data.thumbnail = null;
        } else {
            data.thumbnail = `thumb_${user.avatar}`;
        }

        for (const dataKey in data) {
            if (data[dataKey] || data[dataKey] === "" || data[dataKey] === false) {
                if (
                    (dataKey === "paymentEmail" && data[dataKey] === "") ||
                    (dataKey === "streetAddressOne" && data[dataKey] === "") ||
                    (dataKey === "streetAddressTwo" && data[dataKey] === "") ||
                    (dataKey === "city" && data[dataKey] === "") ||
                    (dataKey === "regionState" && data[dataKey] === "") ||
                    (dataKey === "postCodeZipCode" && data[dataKey] === "") ||
                    (dataKey === "country" && data[dataKey] === "")
                ) {
                    user[dataKey] = null;
                } else {
                    user[dataKey] = data[dataKey];
                }
            }
        }

        await scheme.transaction(async (t) => {
            if (data.email) {
                await SplitUsersModel.update(
                    {
                        email: data.email,
                    },
                    {
                        where: { email: user.email },
                        transaction: t,
                    }
                );
            }
            await user.save({ transaction: t });
        });

        return user;
    }

    async getUser(options) {
        const user = await UsersModel.findOne({
            where: options,
            attributes: {
                exclude: ["password"],
            },
        });
        return user;
    }

    async uniqueFields() {
        const uniqueFields = await filterService.generateUniqueFields(userFilter);
        return uniqueFields;
    }

    async getUsersAsAdmin(data, sortField = "id", sortOrder = "ASC") {
        const whereClause = filterService.generateFilterForSQL(data);

        if (sortField && !allowedSortFieldsUser.includes(sortField)) {
            throw new Error("Invalid sort field");
        }

        if (sortOrder && !allowedSortOrders.includes(sortOrder)) {
            throw new Error("Invalid sort order");
        }

        if (sortField != "id" && sortField != "signIn") {
            sortOrder = "DESC";
        }

        let order = sortField && sortOrder ? [[sortField, sortOrder]] : undefined;
        let user;

        if (sortField == "signIn") {
            user = await UsersModel.findAll({
                where: whereClause,
                attributes: {
                    exclude: ["password"],
                },
                include: [
                    {
                        model: BapsModel,
                        attributes: [["id", "bapId"], ["name", "bapName"], "avatar", [Sequelize.literal("`baps->members_baps`.`role`"), "role"]],
                        include: { model: MembersBapsModel, attributes: [] },
                    },
                    {
                        model: TokensModel,
                        attributes: [["updatedAt", "lastSignIn"]],
                        required: true,
                    },
                ],
                order: [[TokensModel, "updatedAt", sortOrder]],
            });
        } else {
            console.log(whereClause);
            user = await UsersModel.findAll({
                where: whereClause,
                attributes: {
                    exclude: ["password"],
                },
                include: [
                    {
                        model: BapsModel,
                        attributes: [["id", "bapId"], ["name", "bapName"], "avatar", [Sequelize.literal("`baps->members_baps`.`role`"), "role"]],
                        include: { model: MembersBapsModel, attributes: [] },
                    },
                    {
                        model: TokensModel,
                        attributes: [["updatedAt", "lastSignIn"]],
                        required: true,
                    },
                ],
                order,
            });
        }

        return user;
    }

    async getUserByIdAsAdmin(options) {
        const user = await UsersModel.findOne({
            where: options,
            include: [
                {
                    model: BapsModel,
                    attributes: ["id", "name", "avatar", [Sequelize.literal("`baps->members_baps`.`role`"), "role"]],
                    include: { model: MembersBapsModel, attributes: [] },
                },
                {
                    model: TokensModel,
                    attributes: [["updatedAt", "lastSignIn"]],
                    required: true,
                },
                {
                    model: IncomesModel,
                    attributes: [[Sequelize.literal("`incomes`.`price` * (0.1 + 0.034 + (0.2 / `incomes`.`price`))"), "fees"]],
                },
            ],
            attributes: {
                exclude: ["password", "balance", "provider", "isEmailConfirmed", "uuidEveara"],
            },
        });
        let sum = 0;
        for (const income of user.dataValues.incomes) {
            sum = np.plus(sum, income.dataValues.fees);
        }
        user.dataValues.incomeFees = sum;
        delete user.dataValues.incomes;

        return user;
    }

    async getUsersByQuery(search, type) {
        if (!search || !type) throw ApiError.badRequest("'Search' and 'Type' in query params are required");
        if (type && type !== "email" && type !== "firstName" && type !== "lastName" && type !== "name")
            throw ApiError.badRequest("Type in query params must be an 'email', 'firstName', 'lastName' or 'name'");

        const query = type === "name" ? `firstName LIKE '%${search}%' OR lastName LIKE '%${search}%'` : `${type} LIKE '%${search}%'`;
        const users = await scheme.query(
            `
            SELECT *
            FROM users
            WHERE ${query}
        `,
            {
                raw: true,
                type: QueryTypes.SELECT,
            }
        );

        return users;
    }

    async getUsersInfo(userIds) {
        if (!userIds || !userIds.length) throw ApiError.badRequest("userIds is require");

        const users = await UsersModel.findAll({ where: { id: userIds } });

        return users;
    }

    async dropUser(id) {
        const user = await UsersModel.destroy({ where: { id } });
        return user;
    }

    async removeAccount(id, userRole) {
        const user = await this.getUserById(id);
        const bap = await bapsService.getBap({ creatorId: id });
        if (!user || (bap && userRole)) throw ApiError.badRequest("You cannot delete account which are the owner of the BAP");
        if (!user || bap) throw ApiError.badRequest("You cannot delete your account as you are the owner of the BAP");
        const droppedUser = await this.dropUser(id);
        return droppedUser;
    }

    async giveBalance(balance, options) {
        const user = await this.getUser(options);
        if (!user) throw ApiError.badRequest("The user doesn't exist");

        user.balance = np.plus(user.balance, balance);
        await user.save();
        return user;
    }

    async removeAvatar(userId) {
        const user = await this.getUser({ id: userId });
        if (!user.avatar) throw ApiError.badRequest("You don't have avatar");

        user.avatar = null;
        user.thumbnail = null;
        user.save();
    }

    async changeUserAccountStatus(userId, accountStatus) {
        const user = await this.getUser({ id: userId });

        user.accountStatus = accountStatus;
        console.log(user);
        user.save();
    }
}

export default new UsersService();
