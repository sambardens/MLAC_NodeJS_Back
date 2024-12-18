import { UsersModel } from "../users/users.model.js";
import { ApiError } from "../errors/errors.api.js";
import bcrypt from "bcrypt";
import tokenService from "../tokens/tokens.service.js";
import { UsersDto } from "../users/users.dto.js";
import { TokensModel } from "../tokens/tokens.model.js";
import dotenv from "dotenv";
import mailsService from "../mails/mails.service.js";
import usersService from "../users/users.service.js";
import imagesService from "../images/images.service.js";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

class AuthService {
    async signUp(firstName, lastName, email, password, token, provider = "email") {
        const isExistUser = await UsersModel.findOne({ where: { email } });
        if (isExistUser) {
            throw ApiError.badRequest("The user with this email exists");
        }
        if (!this.isValidEmail(email)) throw ApiError.badRequest("The email don't correct");

        if (!this.isPasswordLength(password, 6, 15)) throw ApiError.badRequest("Your password is long or short");

        const hashPassword = bcrypt.hashSync(password, 10);
        const user = await this.createAccount({
            firstName,
            lastName,
            email,
            password: hashPassword,
            provider,
        });
        const userDto = new UsersDto(user);

        const { accessToken, refreshToken } = tokenService.generateJwtTokens({ ...userDto });
        await tokenService.saveToken(user.id, refreshToken);
        // await mailsService.sendMail(email, 4665171, {name: user.firstName})
        const activateToken = tokenService.generateActivateToken({ email: user.email, id: user.id });
        const recipients = mailsService.initRecipientData([email]);

        await mailsService.sendMail(4673609, recipients, {
            name: firstName,
            token: activateToken,
        });
        if (token) await mailsService.joinByLink(user, token);
        return { accessToken, refreshToken, user, activateToken };
    }

    async signIn(email, password, token) {
        const user = await UsersModel.findOne({ where: { email } });
        if (!user) {
            throw ApiError.badRequest("The user isn't exist with this email");
        }
        const isEqualPassword = bcrypt.compareSync(password, user.password);
        if (!isEqualPassword) {
            throw ApiError.badRequest("Incorrect password. Please try again.");
        }
        const userDto = new UsersDto(user);
        this.checkAccountStatus(userDto);
        const { accessToken, refreshToken } = tokenService.generateJwtTokens({ ...userDto });
        await tokenService.saveToken(user.id, refreshToken);
        if (token) await mailsService.joinByLink(user, token);
        return { accessToken, refreshToken, user };
    }

    async signInAsAdmin(email, password, token) {
        const { accessToken, refreshToken, user } = await this.signIn(email, password, token);
        if (!user.email.includes("admin.major") && user.provider != "admin") {
            throw ApiError.forbidden("You don`t have permission for this");
        } else {
            return { accessToken, refreshToken, user };
        }
    }

    async createAccount(values) {
        const user = await UsersModel.create(values);
        return user;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.unAuthorized("You must be logged in!");
        }
        const validToken = tokenService.validateToken(refreshToken, process.env.SECRET_REFRESH_TOKEN);
        const schemaToken = await TokensModel.findOne({ where: { refreshToken } });

        if (!validToken || !schemaToken) {
            throw ApiError.unAuthorized("You must be logged in!");
        }
        const user = await UsersModel.findByPk(validToken.id);
        const userDto = new UsersDto(user);
        this.checkAccountStatus(userDto);
        const tokens = tokenService.generateJwtTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return tokens;
    }

    async logout(refreshToken) {
        // const user = await UsersModel.findOne({where: {email}})
        const token = await TokensModel.findOne({ where: { refreshToken } });
        if (!token) {
            throw ApiError.unAuthorized("You already logged out.");
        }
        token.refreshToken = null;
        await token.save();
    }

    isValidEmail(email) {
        const validRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return email.match(validRegex);
    }

    isPasswordLength(password, min, max) {
        return password.length >= min && password.length <= max;
    }

    async activateAccount(token) {
        const verified = tokenService.validateToken(token, process.env.SECRET_ACTIVATE_ACCOUNT_TOKEN);
        const userDb = await usersService.getUserByEmail(verified.email);
        if (userDb.isEmailConfirmed) throw ApiError.badRequest("You have already confirmed your email");
        userDb.isEmailConfirmed = true;
        userDb.save();
    }

    async signSocial(email, firstName, lastName, urlAvatar, authToken, token) {
        const verified = tokenService.validateToken(authToken, process.env.SECRET_SOCIAL_AUTH_TOKEN);
        if (verified.email !== email) throw ApiError.forbidden("Don't correct password");

        urlAvatar = await imagesService.saveImageDb(null, { urlImage: urlAvatar });
        let user = await usersService.getUserByEmail(email);
        if (!user) {
            const randomPassword = this.generateRandomPassword(30);
            const hashPassword = await bcrypt.hashSync(randomPassword, 10);

            user = await this.createAccount({
                firstName,
                lastName,
                email,
                avatar: urlAvatar,
                password: hashPassword,
                isEmailConfirmed: true,
            });
        }
        const userDto = new UsersDto(user);
        const { accessToken, refreshToken } = tokenService.generateJwtTokens({ ...userDto });
        await tokenService.saveToken(user.id, refreshToken);
        if (token) await mailsService.joinByLink(user, token);
        return { accessToken, refreshToken, user };
    }

    generateRandomPassword(length) {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let password = "";
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }

    checkAccountStatus(user) {
        if (user.accountStatus == process.env.STATUS_BANNED) {
            throw ApiError.forbidden("Access is denied, your account is banned!");
        }
    }
}

export default new AuthService();
