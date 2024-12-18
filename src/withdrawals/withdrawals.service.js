import usersService from "../users/users.service.js";
import { ApiError } from "../errors/errors.api.js";
import { WithdrawalsModel } from "./withdrawals.model.js";
import np from "number-precision";
import mailsService from "../mails/mails.service.js";
import scheme from "../../database/scheme.js";
import { UsersModel } from "../users/users.model.js";
import { Sequelize } from "sequelize";
const transaction = scheme.transaction;

class WithdrawalsService {
  async createWithdraw(userId, amount) {
    if (amount < 100) throw ApiError.badRequest("Amount must be more than 100");

    const user = await usersService.getUserById(userId);
    
    if (user.balance < amount || !amount)
      throw ApiError.badRequest(
        "You don't have enough balance or you haven't specified the withdrawal amount."
      );

    if (!user.paymentEmail)
      throw ApiError.badRequest("You don't have payment email.");

    const existWithdraw = await this.getWithdraw({
      userId: user.id,
      isReviewed: false,
    });
    if (existWithdraw)
      throw ApiError.badRequest(
        "You cannot create a new withdrawal request " +
          "until your previous requests have been approved."
      );
      
      const t = await scheme.transaction();

      try {
        await user.decrement("balance", { by: amount, transaction: t });
  
        const withdraw = await WithdrawalsModel.create({
          userId,
          amount,
          paymentEmail: user.paymentEmail,
        }, { transaction: t });
  
        await t.commit();
  
        const recipients = mailsService.initRecipientData(
          [user.paymentEmail],
          [{ name: "admin", email: user.paymentEmail, id: withdraw.id, amount: withdraw.amount }]
        );
  
        await mailsService.sendMail('4960009', recipients);
  
        return withdraw;
      } catch (error) {
        await t.rollback();
        throw error;
      }
  }

  async getWithdrawals(user) {
    const withdraw = await WithdrawalsModel.findAll({
      where: { userId: user.id },
      include: {model: UsersModel}
    });
    return withdraw;
  }

  async getAllWithdrawsAsAdmin() {
    const withdraw = await WithdrawalsModel.findAll({
      attributes: [
        'id', 
        'amount', 
        'isReviewed', 
        'isApproved', 
        'paymentEmail', 
        'createdAt', 
        'updatedAt', 
        'userId',
        [Sequelize.literal('`user`.`firstName`'), 'firstName'],
        [Sequelize.literal('`user`.`lastName`'), 'lastName'],
      ],
      include: {model: UsersModel, attributes: []}
    });
    return withdraw;
  }

  async getWithdraw(options) {
    const withdraw = await WithdrawalsModel.findOne({ where: options });
    return withdraw;
  }

  async updateWithdrawal(id, isReviewed, isApproved) {
    const withdraw = await this.getWithdraw(id);

    if (typeof(isReviewed) == 'boolean') {
      withdraw.isReviewed = isReviewed
    }
    if (typeof(isApproved) == 'boolean') {
      withdraw.isApproved = isApproved
    }
    
    withdraw.save()
  }
}

export default new WithdrawalsService();
