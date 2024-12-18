import { DataTypes } from "sequelize";
import { UsersModel } from "../../users/users.model.js";
import scheme from "../../../database/scheme.js";

export const ParticipantsModel = scheme.define("participants", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    creatorId: { type: DataTypes.INTEGER },
    uuidEveara: { type: DataTypes.STRING },
    userId: { type: DataTypes.INTEGER },
    participantId: { type: DataTypes.INTEGER },
    paypalEmailId: { type: DataTypes.STRING },
});

// UsersModel.hasMany(ParticipantsModel, { foreignKey: "userId" });
// ParticipantsModel.belongsTo(UsersModel, { foreignKey: "userId" });
