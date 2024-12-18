import scheme from '../../database/scheme.js'
import {DataTypes} from "sequelize";
import {TracksModel} from "../tracks/tracks.model.js";
import {ContractsModel} from "../contracts/contracts.model.js";
import {PurchaseLocationTypesModel} from "./purchase-location-types.model.js";
import {ReleaseModel} from "../release/release.model.js";
import {UsersModel} from "../users/users.model.js";
import { BapsModel } from '../baps/baps.model.js';

export const IncomesModel = await scheme.define('incomes', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    price: {type: DataTypes.DECIMAL(10, 3), allowNull: false},
    paymentEmail: {type: DataTypes.STRING, allowNull: false},
    purchaseLocationId: {type: DataTypes.INTEGER, allowNull: false},
    invoiceId: {type: DataTypes.STRING, allowNull: true},
    tips: {type: DataTypes.INTEGER, defaultValue: 0},
})

ContractsModel.hasMany(IncomesModel)
IncomesModel.belongsTo(ContractsModel)

UsersModel.hasMany(IncomesModel)
IncomesModel.belongsTo(UsersModel)

PurchaseLocationTypesModel.hasMany(IncomesModel)
IncomesModel.belongsTo(PurchaseLocationTypesModel)

ReleaseModel.hasMany(IncomesModel)
IncomesModel.belongsTo(ReleaseModel)

BapsModel.hasMany(IncomesModel, {foreignKey: 'bapId', onDelete: "CASCADE", onUpdate: "CASCADE"})
IncomesModel.belongsTo(BapsModel)