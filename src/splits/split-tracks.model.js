import scheme from '../../database/scheme.js'
import {DataTypes} from "sequelize";
import {TracksModel} from "../tracks/tracks.model.js";
import {SplitsModel} from "./splits.model.js";

export const SplitTracksModel = scheme.define('split_tracks', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    splitId: {type: DataTypes.INTEGER, allowNull: false},
    active: {type: DataTypes.BOOLEAN, defaultValue: true},
    trackId: {type: DataTypes.INTEGER, allowNull: false},
},{
    timestamps: true,
    indexes: [{ unique: true, fields: ['trackId'] }]
})

TracksModel.hasMany(SplitTracksModel)
SplitTracksModel.belongsTo(TracksModel)

SplitsModel.hasMany(SplitTracksModel, {onDelete: 'CASCADE'})
SplitTracksModel.belongsTo(SplitsModel)