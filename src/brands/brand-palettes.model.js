import {DataTypes} from "sequelize";
import scheme from '../../database/scheme.js'

export const BrandPalettesModel = scheme.define('brand_palettes', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    hex: {type: DataTypes.STRING, allowNull: false}
})

export const BrandPaletteNamesModel = scheme.define('brand_palette_name', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, defaultValue: 'Palette Name'}
})

BrandPaletteNamesModel.hasMany(BrandPalettesModel, {onDelete: 'CASCADE'})
BrandPalettesModel.belongsTo(BrandPaletteNamesModel, {onDelete: 'CASCADE'})