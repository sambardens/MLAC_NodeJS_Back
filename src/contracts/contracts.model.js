import scheme from "../../database/scheme.js";
import { DataTypes } from "sequelize";
import { SplitsModel } from "../splits/splits.model.js";
import { UsersModel } from "../users/users.model.js";

export const ContractsModel = scheme.define("contracts", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    completed: { type: DataTypes.BOOLEAN, defaultValue: false },
    splitId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: true },
    referenceContractId: { type: DataTypes.INTEGER, allowNull: true },
    isOldContract: { type: DataTypes.BOOLEAN, defaultValue: false },
    isCancelled: { type: DataTypes.INTEGER, defaultValue: null },
});

SplitsModel.hasMany(ContractsModel, { onDelete: "CASCADE" });
ContractsModel.belongsTo(SplitsModel);

UsersModel.hasMany(ContractsModel);
ContractsModel.belongsTo(UsersModel);
