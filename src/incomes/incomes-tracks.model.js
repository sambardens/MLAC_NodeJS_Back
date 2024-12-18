import scheme from '../../database/scheme.js'
import {DataTypes} from "sequelize";
import {TracksModel} from "../tracks/tracks.model.js";
import {IncomesModel} from './incomes.model.js';

export const IncomesTracksModel = scheme.define('incomes_tracks', {
    incomeId: {type: DataTypes.INTEGER, allowNull: false},
    trackId: {type: DataTypes.INTEGER, allowNull: false},
})


TracksModel.belongsToMany(IncomesModel, {through: IncomesTracksModel, onDelete: 'CASCADE', onUpdate: 'CASCADE'})

IncomesModel.belongsToMany(TracksModel, {through: IncomesTracksModel, onDelete: 'CASCADE', onUpdate: 'CASCADE'})