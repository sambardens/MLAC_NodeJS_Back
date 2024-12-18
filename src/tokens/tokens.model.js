import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";

export const TokensModel = scheme.define('tokens', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    refreshToken: {
        type: DataTypes.STRING(535)
    },
})
