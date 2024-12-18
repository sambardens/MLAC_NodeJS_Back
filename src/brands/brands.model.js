import scheme from "../../database/scheme.js";
import {DataTypes} from "sequelize";
import {BapsModel} from "../baps/baps.model.js";
import {BrandPalettesModel, BrandPaletteNamesModel} from "./brand-palettes.model.js";
import {BrandFontsModel} from "./brand-fonts.model.js";

export const BrandsModel = scheme.define('brands', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, defaultValue: 'Brand kit'},
    logo: {type: DataTypes.STRING},
    designId: {type: DataTypes.STRING},
})

BapsModel.hasOne(BrandsModel,{onDelete: 'CASCADE'})
BrandsModel.belongsTo(BapsModel)

BrandsModel.hasMany(BrandFontsModel)
BrandFontsModel.belongsTo(BrandsModel)

BrandsModel.hasMany(BrandPaletteNamesModel)
BrandPaletteNamesModel.belongsTo(BrandsModel)

BrandsModel.hasMany(BrandPalettesModel)
BrandPalettesModel.belongsTo(BrandsModel)