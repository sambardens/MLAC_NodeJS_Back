import usersService from "./users.service.js";

class UsersController {
    async setNewPassword(req, res, next) {
        try {
            const { newPassword, confirmPassword } = req.body;
            const { token } = req.query;
            const user = await usersService.setNewPassword(token, newPassword, confirmPassword);
            return res.json({ success: true, user });
        } catch (e) {
            return next(e);
        }
    }

    async setNewEmail(req, res, next) {
        try {
            const { newEmail } = req.body;
            const userId = req.user.id;
            const user = await usersService.setNewEmail(newEmail, userId);
            return res.json({ success: true, user });
        } catch (e) {
            return next(e);
        }
    }

    async activateNewEmail(req, res, next) {
        try {
            const { token } = req.query;
            await usersService.activateNewEmail(token);
            return res.json({ success: true });
        } catch (e) {
            return next(e);
        }
    }

    async editSettings(req, res, next) {
        try {
            const { firstName, lastName, email, address, phone, paymentEmail, number, streetAddressOne, streetAddressTwo, city, regionState, postCodeZipCode, country, uuidEveara, isNew } = req.body;
            const { user } = req;
            const avatar = req?.files?.avatar;
            const settings = await usersService.editSettings(user.id, {
                firstName,
                lastName,
                email,
                avatar,
                address,
                phone,
                paymentEmail,
                number,
                streetAddressOne,
                streetAddressTwo,
                city,
                regionState,
                postCodeZipCode,
                country,
                uuidEveara,
                isNew
            });
            return res.json({ success: true, settings });
        } catch (e) {
            next(e);
        }
    }

    async removeAvatar(req, res, next) {
        try {
            const { user } = req;
            await usersService.removeAvatar(user.id);
            return res.json({ success: true });
        } catch (e) {
            next(e);
        }
    }

    async getUsers(req, res, next) {
        try {
            const { search, type } = req.query;
            const users = await usersService.getUsersByQuery(search, type);
            return res.json({ success: true, users });
        } catch (e) {
            next(e);
        }
    }

    async getUsersInfo(req, res, next) {
        try {
            const { userIds } = req.body;
            const users = await usersService.getUsersInfo(userIds);
            return res.json({ success: true, users });
        } catch (e) {
            next(e);
        }
    }

    async removeAccount(req, res, next) {
        try {
            const { user } = req;
            await usersService.removeAccount(user.id);
            return res.json({ status: true });
        } catch (e) {
            next(e);
        }
    }

    async getMyInfo(req, res, next) {
        try {
            const { user } = req;
            const userFromDb = await usersService.getUser({ id: user.id });
            return res.json({ user: userFromDb });
        } catch (e) {
            next(e);
        }
    }

    async uniqueFields(req, res, next) {
        try {
            const userFromDb = await usersService.uniqueFields();
            return res.json({ success: true, user: userFromDb });
        } catch (e) {
            next(e);
        }
    }

    async getUsersAsAdmin(req, res, next) {
        try {
            const { orderBy, sortOrder, role, performers } = req.query;
            const userFromDb = await usersService.getUsersAsAdmin({ roleTwoIncludes: role, performers }, orderBy, sortOrder);
            return res.json({ user: userFromDb });
        } catch (e) {
            next(e);
        }
    }

    async getUserByIdAsAdmin(req, res, next) {
        try {
            const { userId } = req.params;
            const userFromDb = await usersService.getUserByIdAsAdmin({ id: userId });
            return res.json({ success: true, user: userFromDb });
        } catch (e) {
            next(e);
        }
    }

    async banUser(req, res, next) {
        try {
            const { userId } = req.params;
            const userFromDb = await usersService.changeUserAccountStatus(userId, process.env.STATUS_BANNED);
            return res.json({ success: true });
        } catch (e) {
            next(e);
        }
    }

    async unbanUser(req, res, next) {
        try {
            const { userId } = req.params;
            const userFromDb = await usersService.changeUserAccountStatus(userId, process.env.STATUS_ACTIVE);
            return res.json({ success: true });
        } catch (e) {
            next(e);
        }
    }
    async deleteUser(req, res, next) {
        try {
            const { userId } = req.params;
            const userFromDb = await usersService.removeAccount(userId, "ADMIN");
            return res.json({ success: true });
        } catch (e) {
            next(e);
        }
    }
}

export default new UsersController();
