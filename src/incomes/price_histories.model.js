import scheme from '../../database/scheme.js'
import { DataTypes } from "sequelize";
import { IncomesModel } from './incomes.model.js';
import { TracksModel } from '../tracks/tracks.model.js';

export const PriceHistoryModel = await scheme.define('price_histories', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    trackId: {type: DataTypes.INTEGER, allowNull: false},
    releasePrice: {type: DataTypes.INTEGER, allowNull: false},
    trackPrice: {type: DataTypes.DECIMAL(10, 3), allowNull: false},
    incomeId: {type: DataTypes.INTEGER, allowNull: false},
})

IncomesModel.hasMany(PriceHistoryModel)
PriceHistoryModel.belongsTo(IncomesModel)

TracksModel.hasMany(PriceHistoryModel)
PriceHistoryModel.belongsTo(TracksModel)