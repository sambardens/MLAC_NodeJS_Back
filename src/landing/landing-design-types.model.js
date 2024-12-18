import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";

export const LandingDesignTypesModel = scheme.define('landing_design_types', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false}
}, {
    timestamps: false
})