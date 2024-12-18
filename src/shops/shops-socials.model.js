import scheme from '../../database/scheme.js'
import {DataTypes} from "sequelize";
import { ShopsModel } from './shops.model.js';

export const ShopsLinksModel = scheme.define('shops-links', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false},
    link: {type: DataTypes.STRING, allowNull: false},
    position: {type: DataTypes.INTEGER, defaultValue: 0}
})

ShopsModel.hasMany(ShopsLinksModel, {foreignKey: 'shopId'})
ShopsLinksModel.belongsTo(ShopsModel, {foreignKey: 'shopId'})