import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";
import {UsersModel} from "../users/users.model.js";

export const WithdrawalsModel = scheme.define('withdrawals', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false},
    amount: {type: DataTypes.DECIMAL(10, 3), allowNull: false},
    isReviewed: {type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false},
    isApproved: {type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false},
    paymentEmail: {type: DataTypes.STRING, allowNull: false},
})

UsersModel.hasMany(WithdrawalsModel)
WithdrawalsModel.belongsTo(UsersModel)