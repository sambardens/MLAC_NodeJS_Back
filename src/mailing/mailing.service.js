import { UsersModel } from "../users/users.model.js";
import dotenv from "dotenv";
import { MailingModel } from "./mailing.model.js";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

class MailingService {
  async subscribe(userId, bapId) {
    const isExistUser = await MailingModel.findOne({
      where: { userId, bapId },
    });
    if (isExistUser) {
      await MailingModel.destroy({
        where: { userId, bapId },
      });
      return { message: "The user unsubscribed" };
    }
    const existUser = await UsersModel.findOne({
      where: { id: userId },
    });
    const subscriber = await this.createMailing({
      userId,
      bapId,
      firstName: existUser.dataValues.firstName,
      lastName: existUser.dataValues.lastName,
      email: existUser.dataValues.email,
    });

    return subscriber;
  }

  async createMailing(values) {
    const subscriber = await MailingModel.create(values);

    return subscriber.dataValues;
  }

  async getMailingList(bapId) {
    const mailingList = await MailingModel.findAll({
      where: { bapId },
    });

    return mailingList;
  }

  async getUserSubscribes(userId) {
    const userSubscribes = await MailingModel.findAll({
      where: { userId },
    });
    const bapIds = userSubscribes.map((bap) => bap.bapId)

    return bapIds;
  }

  async deleteUsersFromMailList(userIds, bapId) {
    const res = await MailingModel.destroy({
      where: { bapId, userId: userIds },
    });
    if (res === 0) {
      return "bap or users not found";
    }

    return "these users deleted";
  }
}

export default new MailingService();
