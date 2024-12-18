import scheme from "../../database/scheme.js";
import { DataTypes } from "sequelize";
import { ReleaseModel } from "../release/release.model.js";

export const SplitsModel = scheme.define("splits", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    releaseId: { type: DataTypes.INTEGER, allowNull: false },
    contractId: { type: DataTypes.INTEGER, allowNull: true },
    refferenceId: { type: DataTypes.INTEGER, allowNull: true },
    onlyContract: { type: DataTypes.BOOLEAN, defaultValue: false },
});

ReleaseModel.hasMany(SplitsModel);
SplitsModel.belongsTo(ReleaseModel);
