import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";

export const BrandFontsModel = scheme.define('brand_fonts', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    font: {type: DataTypes.STRING, allowNull: false},
    size: {type: DataTypes.INTEGER, allowNull: false},
    italic: {type: DataTypes.INTEGER},
    weight: {type: DataTypes.INTEGER},
})