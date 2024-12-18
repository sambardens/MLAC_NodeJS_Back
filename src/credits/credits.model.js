import scheme from "../../database/scheme.js";
import { DataTypes } from "sequelize";
import { UsersModel } from "../users/users.model.js";
import { TracksModel } from "../tracks/tracks.model.js";

export const CreditsModel = scheme.define("credits", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    creditIds: { type: DataTypes.STRING },
});

UsersModel.hasMany(CreditsModel, { onDelete: "CADCADE" });
CreditsModel.belongsTo(UsersModel);

TracksModel.hasMany(CreditsModel, { foreignKey: "trackId", onDelete: "CADCADE" });
CreditsModel.belongsTo(TracksModel);
